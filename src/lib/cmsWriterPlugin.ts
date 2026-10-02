import fs from 'node:fs';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

const SECTIONS = ['projects', 'directors', 'careers', 'company', 'address', 'branding', 'social', 'settings'] as const;
const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'] as const;
const MAX_BODY_BYTES = 32 * 1024 * 1024;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

const BRANDING_FILES: Record<string, string> = {
  mainLogo: 'main-logo',
  footerLogo: 'footer-logo',
  favicon: 'favicon',
  darkLogo: 'dark-logo',
  lightLogo: 'light-logo',
};

const MIME_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readBody(req: IncomingMessage, limit: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('Upload is too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function extensionForDataUrl(dataUrl: string): string {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,/.exec(dataUrl);
  const ext = match ? MIME_EXT[match[1].toLowerCase()] : undefined;
  if (!ext) throw new Error('Unsupported image. Use a PNG, JPG, GIF, WEBP, or SVG file.');
  return ext;
}

function assertInside(root: string, target: string) {
  const relative = path.relative(root, target);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('Invalid image path');
  }
}

function writeImage(publicDir: string, folder: 'projects' | 'directors' | 'company', name: string, dataUrl: string): string {
  if (!/^[A-Za-z0-9_-]+$/.test(name)) throw new Error('Invalid image name');
  const ext = extensionForDataUrl(dataUrl);
  const encoded = dataUrl.slice(dataUrl.indexOf(',') + 1);
  const buffer = Buffer.from(encoded, 'base64');
  if (buffer.length === 0 || buffer.length > MAX_IMAGE_BYTES) {
    throw new Error('Image must be under 2MB');
  }

  const imagesRoot = path.resolve(publicDir, 'images');
  const dir = path.resolve(imagesRoot, folder);
  const target = path.resolve(dir, `${name}.${ext}`);
  assertInside(imagesRoot, target);

  fs.mkdirSync(dir, { recursive: true });
  for (const other of IMAGE_EXTS) {
    if (other === ext) continue;
    const stale = path.resolve(dir, `${name}.${other}`);
    if (fs.existsSync(stale)) fs.unlinkSync(stale);
  }
  fs.writeFileSync(target, buffer);
  return `/images/${folder}/${name}.${ext}?v=${Date.now()}`;
}

function materializeImageField(publicDir: string, record: Record<string, unknown>, folder: 'projects' | 'directors') {
  const image = record.image;
  if (typeof image !== 'string' || !image.startsWith('data:')) return record;
  if (!image.startsWith('data:image/')) throw new Error('Unsupported image');
  if (typeof record.id !== 'string') throw new Error('Invalid image name');
  return { ...record, image: writeImage(publicDir, folder, record.id, image) };
}

function writeSection(publicDir: string, name: string, value: unknown) {
  const dir = path.resolve(publicDir, 'data');
  const target = path.resolve(dir, `${name}.json`);
  assertInside(dir, target);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
}

type SectionName = (typeof SECTIONS)[number];

function isSection(value: string): value is SectionName {
  return (SECTIONS as readonly string[]).includes(value);
}

function assertNoDataUrls(value: unknown): void {
  if (typeof value === 'string') {
    if (value.startsWith('data:')) throw new Error('Images must be saved as files');
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) assertNoDataUrls(item);
    return;
  }
  if (isRecord(value)) {
    for (const item of Object.values(value)) assertNoDataUrls(item);
  }
}

function materializeBranding(publicDir: string, branding: Record<string, unknown>) {
  const next = { ...branding };
  for (const [key, filename] of Object.entries(BRANDING_FILES)) {
    const value = next[key];
    if (typeof value !== 'string' || !value.startsWith('data:')) continue;
    if (!value.startsWith('data:image/')) throw new Error('Unsupported image');
    next[key] = writeImage(publicDir, 'company', filename, value);
  }
  return next;
}

function prepareSection(publicDir: string, section: SectionName, data: unknown): unknown {
  let next: unknown = data;
  if (section === 'projects' || section === 'directors') {
    if (!Array.isArray(data)) throw new Error('Invalid site data');
    next = data.map((item) => {
      if (!isRecord(item)) throw new Error('Invalid site data');
      return materializeImageField(publicDir, item, section);
    });
  } else if (section === 'careers') {
    if (!Array.isArray(data)) throw new Error('Invalid site data');
  } else if (section === 'branding') {
    if (!isRecord(data)) throw new Error('Invalid site data');
    next = materializeBranding(publicDir, data);
  } else if (!isRecord(data)) {
    throw new Error('Invalid site data');
  }
  assertNoDataUrls(next);
  return next;
}

export function publishCmsSection(publicDir: string, section: string, data: unknown): unknown {
  if (!isSection(section)) throw new Error('Invalid section');
  const next = prepareSection(publicDir, section, data);
  writeSection(publicDir, section, next);
  return next;
}

export function publishPresentSections(publicDir: string, parsed: unknown): Record<string, unknown> {
  if (!isRecord(parsed)) throw new Error('Invalid site data');
  const prepared: Record<string, unknown> = {};
  for (const section of SECTIONS) {
    if (!(section in parsed) || parsed[section] == null) continue;
    prepared[section] = prepareSection(publicDir, section, parsed[section]);
  }
  if (Object.keys(prepared).length === 0) throw new Error('Invalid site data');
  for (const [section, value] of Object.entries(prepared)) writeSection(publicDir, section, value);
  return prepared;
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export function cmsWriterPlugin(): Plugin {
  return {
    name: 'cms-writer',
    apply: 'serve',
    configureServer(server) {
      const publicDir = path.resolve(server.config.root, 'public');
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/__cms/save' && url !== '/__cms/migrate') {
          next();
          return;
        }
        if (req.method !== 'POST') {
          sendJson(res, 405, { error: 'Method not allowed' });
          return;
        }

        readBody(req, MAX_BODY_BYTES)
          .then((raw) => {
            const body = JSON.parse(raw) as unknown;
            if (url === '/__cms/migrate') {
              sendJson(res, 200, publishPresentSections(publicDir, body));
              return;
            }
            if (!isRecord(body) || typeof body.section !== 'string' || !('data' in body)) {
              throw new Error('Invalid site data');
            }
            sendJson(res, 200, publishCmsSection(publicDir, body.section, body.data));
          })
          .catch((error: unknown) => {
            const message = error instanceof Error ? error.message : 'Invalid site data';
            sendJson(res, 400, { error: message });
          });
      });
    },
  };
}
