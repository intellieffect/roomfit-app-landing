export interface NavLink {
  href: string;
  label: string;
}

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
