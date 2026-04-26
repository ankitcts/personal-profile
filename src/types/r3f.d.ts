// Augment JSX with @react-three/fiber's intrinsic elements (mesh, group,
// boxGeometry, etc.). Without this, TypeScript under React 19 doesn't see
// any of the three.js JSX shorthand inside a <Canvas>.
import { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
