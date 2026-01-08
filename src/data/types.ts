export interface NavLink {
  href: string;
  label: string;
}

// Main Landing Page Types
export interface MainContent {
  site: {
    name: string;
    tagline: string;
    copyright: string;
  };
  nav: {
    links: NavLink[];
    communityLink: NavLink;
    appLink: NavLink;
    businessLink: NavLink;
    cta: string;
  };
  hero: {
    badge: string;
    title: {
      line1: string;
      highlight: string;
    };
    subtitle: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
    stats: Stat[];
  };
  painPoints: {
    title: {
      line1: string;
      line2: string;
    };
    items: FeatureItem[];
  };
  hwSpecs: {
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    specs: HWSpec[];
  };
  exerciseTypes: string[];
  exerciseShowcase: ExerciseShowcase;
  weightModes: {
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    subtitle: string;
    modes: WeightMode[];
  };
  safety: {
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    description: string;
    features: FeatureItem[];
  };
  appEnhancement: {
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    subtitle: string;
    features: FeatureItem[];
    cta: {
      text: string;
      href: string;
    };
  };
  lifestyle: {
    title: {
      line1: string;
      line2: string;
    };
    subtitle: string;
    description: string;
    highlights: string[];
  };
  socialProof: {
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    achievements: Stat[];
    testimonials: Testimonial[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttons: {
      primary: { text: string; href: string };
      secondary: { text: string; href: string };
    };
  };
  footer: {
    company: {
      name: string;
      ceo: string;
      address: string;
      businessNumber: string;
      salesNumber: string;
    };
    links: NavLink[];
    social: {
      instagram: string;
    };
  };
}

export interface HWSpec {
  value: string;
  label: string;
  title: string;
  description: string;
  note: string;
  image: string;
}

export interface ExerciseItem {
  name: string;
  gif: string;
}

export interface ExerciseShowcase {
  badge: string;
  title: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  exercises: ExerciseItem[];
}

export interface WeightMode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gif: string;
}

export interface Testimonial {
  quote: string;
  source: string;
}

// App Landing Page Types (SiteContent)

export interface Stat {
  value: string;
  label: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  color?: "primary" | "secondary";
}

export interface Mode {
  title: string;
  description: string;
}

export interface GestureItem {
  icon: string;
  title: string;
  description: string;
}

export interface StoreLink {
  label: string;
  store: string;
  url: string;
}

export interface SiteContent {
  site: {
    name: string;
    copyright: string;
  };
  nav: {
    links: NavLink[];
    businessLink: NavLink;
    cta: string;
  };
  hero: {
    badge: string;
    title: {
      line1: string;
      line2: string;
      line3: string;
    };
    subtitle: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
    stats: Stat[];
  };
  features: {
    title: string;
    titleSuffix: string;
    subtitle: string;
    items: FeatureItem[];
  };
  vbtAnalysis: {
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    subtitle: string;
    description: string;
    floatingCards: {
      speed: { label: string; value: string };
      power: { label: string; value: string };
    };
    features: FeatureItem[];
  };
  trainingModes: {
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    subtitle: string;
    description: string;
    modes: Mode[];
  };
  handsfreeControl: {
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    subtitle: string;
    description: string;
    commands: string[];
    gestures: GestureItem[];
  };
  dataInsights: {
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    subtitle: string;
    items: FeatureItem[];
  };
  connectivity: {
    badge: string;
    title: {
      line1: string;
      line2: string;
    };
    subtitle: string;
    description: string;
    status: string;
  };
  downloadCTA: {
    title: string;
    description: string;
    appStore: StoreLink;
    playStore: StoreLink;
  };
  footer: {
    links: NavLink[];
  };
}

export interface Screenshot {
  src: string;
  alt: string;
}

// FAQ Types
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: number;
  name: string;
  items: FAQItem[];
}

export interface FAQContent {
  source: string;
  crawledAt: string;
  categories: FAQCategory[];
  totalItems: number;
}

export interface SiteImages {
  logo: string;
  device: string;
  screenshots: {
    workoutProgress: Screenshot;
    dropChart: Screenshot;
    dropSetting: Screenshot;
    lastSet: Screenshot;
    remoteWorkout: Screenshot;
    voiceWeightOn: Screenshot;
    weightTypeSetting: Screenshot;
    workoutSetup: Screenshot;
  };
  sections: {
    hero: {
      main: keyof SiteImages["screenshots"];
      secondary: keyof SiteImages["screenshots"];
    };
    vbtAnalysis: {
      main: keyof SiteImages["screenshots"];
    };
    trainingModes: {
      grid: (keyof SiteImages["screenshots"])[];
    };
    voiceControl: {
      main: keyof SiteImages["screenshots"];
    };
    dataInsights: {
      main: keyof SiteImages["screenshots"];
    };
  };
}
