/**
 * Samrajyam Image Sequence Configuration
 *
 * Discovered sequence details:
 *   - Total frames    : 50
 *   - Folder          : /public/sequence/
 *   - Filename pattern: ezgif-frame-NNN.jpg  (3-digit zero-padded, 001–050)
 *   - Format          : JPEG
 *
 * Adjust CINEMATIC_SCROLL_HEIGHT if the journey feels too fast or too slow.
 * A good rule of thumb: ~100vh per 10–15 frames.
 */

// ─── Frame Sequence ────────────────────────────────────────────────────────────

/** Total number of JPG frames in /public/sequence/ */
export const FRAME_COUNT = 50;

/**
 * Returns the public URL for a 1-indexed frame number.
 * Example: getFrameUrl(1) → "/sequence/ezgif-frame-001.jpg"
 */
export function getFrameUrl(frameIndex: number): string {
  const padded = String(frameIndex).padStart(3, "0");
  return `/sequence/ezgif-frame-${padded}.jpg`;
}

// ─── Scroll Experience ─────────────────────────────────────────────────────────

/**
 * Total scroll height for the cinematic sticky section.
 * Increase if the journey feels too fast; decrease if too slow.
 * ~100vh per ~10 frames is a comfortable pacing.
 */
export const CINEMATIC_SCROLL_HEIGHT = "280vh";

/**
 * Lerp factor for smooth frame interpolation (0 < factor <= 1).
 * When Lenis smooth scroll is active, scroll is already eased, so an adaptive
 * factor is used to track smoothly without rubber-banding lag.
 */
export const LERP_FACTOR = 0.25;

/**
 * Cap the device pixel ratio to 1.5 to prevent massive multi-megapixel buffers
 * on high-DPI/Retina screens (1280x720 source frames resample cleanly at DPR 1.5).
 */
export const MAX_DPR = 1.5;

/**
 * Enable debug overlay (FRAME / PROGRESS) during development.
 * Set to false before production deployment.
 */
export const DEBUG_MODE = false;

/**
 * Preload all 50 frames upfront (total size is only ~1.89 MB).
 * Preloading all frames before entry guarantees zero dropped frames and zero
 * mid-scroll network/decode pauses.
 */
export const PRIORITY_PRELOAD_COUNT = 50;
