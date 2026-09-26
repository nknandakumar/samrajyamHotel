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
export const CINEMATIC_SCROLL_HEIGHT = "500vh";

/**
 * Lerp factor for smooth frame interpolation (0 < factor <= 1).
 * Lower = smoother / more lag; Higher = snappier / less lag.
 * 0.12 gives buttery motion while still feeling scroll-connected.
 */
export const LERP_FACTOR = 0.12;

/**
 * Cap the device pixel ratio to avoid unnecessarily huge canvas buffers
 * on high-DPI devices while still rendering sharply.
 */
export const MAX_DPR = 2;

/**
 * Enable debug overlay (FRAME / PROGRESS) during development.
 * Set to false before production deployment.
 */
export const DEBUG_MODE = false;

/**
 * Number of frames to prioritize loading before the cinematic section
 * is first shown to the visitor. The rest are loaded progressively.
 */
export const PRIORITY_PRELOAD_COUNT = 10;
