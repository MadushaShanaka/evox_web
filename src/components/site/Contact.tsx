import { useState, type FormEvent } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Contact() {
  const { data } = useContent();
  const [sent, setSent] = useState(false);
  const [attempted, setAttempted] = useState(false);

  if (!data) return null;

  const { company, address, social } = data;

  const fullAddress = [address.line1, address.line2, address.city, address.province, address.country]
    .filter(Boolean)
    .join(', ');

  const cards = [
    {
      label: 'Email',
      value: social.email || company.email,
      href: `mailto:${social.email || company.email}`,
      icon: Mail,
    },
    {
      label: 'Phone',
      value: social.phone || company.phone,
      href: `tel:${social.phone || company.phone}`,
      icon: Phone,
    },
    {
      label: 'WhatsApp',
      value: social.whatsapp || company.whatsapp,
      href: `https://wa.me/${(social.whatsapp || company.whatsapp).replace(/[^0-9]/g, '')}`,
      icon: MessageCircle,
      external: true,
    },
  ];

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setAttempted(true);
    if (!form.checkValidity()) {
      form.querySelectorAll<HTMLElement>(':invalid').forEach((field) => field.classList.add('input-error'));
      return;
    }
    alert('This is a demo form. Connect a backend to receive messages.');
    setSent(true);
    form.reset();
    setAttempted(false);
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-canvas py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Let's Build Something Great"
          description="Reach out to discuss your next project or partnership"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.label}>
                  <a
                    href={card.href}
                    {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="panel flex items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{card.label}</p>
                      <p className="break-words text-sm text-muted">{card.value}</p>
                    </div>
                  </a>
                </Reveal>
              );
            })}

            <Reveal>
              <div className="panel flex items-start gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Address</p>
                  <p className="text-sm text-muted">{fullAddress}</p>
                  {address.postalCode && <p className="text-sm text-faint">{address.postalCode}</p>}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="panel p-6 lg:p-8">
              <h3 className="mb-4 text-lg font-semibold text-ink">Send a Message</h3>
              {sent && (
                <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                  Message noted in this demo. Connect a backend to receive messages.
                </div>
              )}
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-ink-soft">Your Name</span>
                    <input name="name" type="text" required className="input" onInput={(e) => e.currentTarget.classList.remove('input-error')} />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-ink-soft">Your Email</span>
                    <input name="email" type="email" required className="input" onInput={(e) => e.currentTarget.classList.remove('input-error')} />
                  </label>
                </div>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink-soft">Subject</span>
                  <input name="subject" type="text" required className="input" onInput={(e) => e.currentTarget.classList.remove('input-error')} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink-soft">Your Message</span>
                  <textarea name="message" required rows={5} className="input resize-y" onInput={(e) => e.currentTarget.classList.remove('input-error')} />
                </label>
                {attempted && <p className="text-xs text-red-600 dark:text-red-300">Please complete the required fields.</p>}
                <button type="submit" className="btn-primary w-full">
                  Send Message <Send size={16} />
                </button>
              </form>
            </div>
          </Reveal>
        </div>

        {address.mapsUrl && (
          <div className="panel mt-8 overflow-hidden">
            <iframe
              src={address.mapsUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              title="Company Location"
            />
          </div>
        )}
      </div>
    </section>
  );
}
