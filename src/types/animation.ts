export interface TwinkleLight {
  id: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export interface Building {
  id: string;
  x: number;
  width: number;
  height: number;
  windows: TwinkleLight[];
}

export interface GradientStop {
  color: string;
  position: number;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  infinite: boolean;
}
