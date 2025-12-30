export interface SceneProps {
  isActive: boolean;
  onComplete?: () => void;
}

export interface SceneConfig {
  id: string;
  duration: number; // ms
  component: React.ComponentType<SceneProps>;
  title: string;
  subtitle: string;
}
