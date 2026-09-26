/**
 * Version 2: 3D Food & Catering Builder Types
 * Designed for future Three.js / React Three Fiber / Drei integration
 */

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Food3DModel {
  id: string;
  name: string;
  category: "biryani" | "starters" | "meals" | "parotta" | "dessert";
  modelPath: string; // e.g. "/models/food/seeraga-biryani.glb"
  thumbnail: string;
  scale: Vector3D;
  defaultPosition: Vector3D;
  defaultRotation: Vector3D;
  portionSize: "single" | "family" | "catering-bulk";
  vesselType: "banana-leaf" | "brass-uruli" | "clay-pot" | "steel-plate";
  price?: number;
  description: string;
}

export interface CateringTableSpread {
  tableDimensions: { width: number; length: number };
  theme: "traditional-chettinad" | "royal-brass" | "modern-verandah";
  placedDishes: Array<{
    dishId: string;
    position: Vector3D;
    rotation: Vector3D;
    guestCount: number;
  }>;
}

export interface SceneLightingConfig {
  ambientIntensity: number;
  warmSpotColor: string;
  shadows: boolean;
}
