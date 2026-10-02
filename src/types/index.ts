export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  industry: string;
  status: 'completed' | 'in-progress' | 'planned';
  url: string;
  featured: boolean;
  displayOrder: number;
}

export interface Director {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio: string;
  displayOrder: number;
  active: boolean;
}

export interface CompanyInfo {
  name: string;
  description: string;
  about: string;
  mission: string;
  vision: string;
  tagline: string;
  foundedYear: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  registration: string;
}

export interface CompanyAddress {
  line1: string;
  line2: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  mapsUrl: string;
}

export interface Branding {
  mainLogo: string;
  footerLogo: string;
  favicon: string;
  darkLogo: string;
  lightLogo: string;
}

export interface SocialMedia {
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  youtube: string;
  github: string;
  other: string;
  enabled: {
    linkedin: boolean;
    facebook: boolean;
    instagram: boolean;
    youtube: boolean;
    github: boolean;
    other: boolean;
  };
}

export interface WebsiteSettings {
  title: string;
  metaDescription: string;
  footerCopyright: string;
}

export type CareerStatus = 'Draft' | 'Published' | 'Closed';
export type ApplicationMethod = 'email' | 'form' | 'url';

export interface Career {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  shortDescription: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  preferredSkills: string[];
  benefits: string[];
  salary: string;
  applicationMethod: ApplicationMethod;
  applicationEmail: string;
  applicationUrl: string;
  applicationInstructions: string;
  postedDate: string;
  applicationDeadline: string;
  status: CareerStatus;
  featured: boolean;
}

export interface AppData {
  projects: Project[];
  directors: Director[];
  careers: Career[];
  company: CompanyInfo;
  address: CompanyAddress;
  branding: Branding;
  social: SocialMedia;
  settings: WebsiteSettings;
}

export interface AdminUser {
  username: string;
  loggedIn: boolean;
}
