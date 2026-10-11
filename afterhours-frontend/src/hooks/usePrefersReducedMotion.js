import { useReducedMotion } from 'framer-motion';

/** Thin wrapper so non-motion code can share the same preference signal. */
export default function usePrefersReducedMotion() {
  return Boolean(useReducedMotion());
}
