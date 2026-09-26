import { Food3DModel } from "./types";

/**
 * Registry of future 3D food models for Version 2 3D Builder.
 * Pre-configured with scale, rotation, and vessel configurations.
 */
export const FOOD_3D_REGISTRY: Food3DModel[] = [
  {
    id: "3d-seeraga-biryani",
    name: "Seeraga Samba Biryani Handi",
    category: "biryani",
    modelPath: "/models/food/seeraga_biryani.glb",
    thumbnail: "/images/food/seeraga-biryani.webp",
    scale: { x: 1, y: 1, z: 1 },
    defaultPosition: { x: 0, y: 0.1, z: 0 },
    defaultRotation: { x: 0, y: 0, z: 0 },
    portionSize: "family",
    vesselType: "brass-uruli",
    description: "Handi-cooked Seeraga Samba Biryani with boiled eggs & raita.",
  },
  {
    id: "3d-banana-leaf-feast",
    name: "Full Tamil Banana Leaf Feast",
    category: "meals",
    modelPath: "/models/food/banana_leaf_feast.glb",
    thumbnail: "/images/food/meals.webp",
    scale: { x: 1.2, y: 1, z: 1.2 },
    defaultPosition: { x: 0, y: 0, z: 0 },
    defaultRotation: { x: 0, y: 0, z: 0 },
    portionSize: "single",
    vesselType: "banana-leaf",
    description: "Authentic banana leaf spread with 12 items and curries.",
  },
  {
    id: "3d-parotta-salna",
    name: "Flaky Parotta Stack with Salna Bowl",
    category: "parotta",
    modelPath: "/models/food/parotta_salna.glb",
    thumbnail: "/images/food/parotta.webp",
    scale: { x: 1, y: 1, z: 1 },
    defaultPosition: { x: 0, y: 0, z: 0 },
    defaultRotation: { x: 0, y: 45, z: 0 },
    portionSize: "single",
    vesselType: "steel-plate",
    description: "Layered crispy bun parottas with spicy salna.",
  },
];
