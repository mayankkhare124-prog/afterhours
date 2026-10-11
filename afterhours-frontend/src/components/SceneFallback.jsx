import React from 'react';

/**
 * Editorial architectural fallback for the AFTERHOURS Core
 * Used when WebGL is unavailable or prefers-reduced-motion is active.
 */
export default function SceneFallback({ rich = false }) {
  return (
    <div className={`scene-fallback ${rich ? 'scene-fallback--rich' : ''}`} aria-hidden="true">
      <div className="scene-fallback__glow" />
      <div className="scene-fallback__monolith-frame">
        <div className="scene-fallback__monolith-ring" />
        <div className="scene-fallback__monolith-ring-inner" />
        <div className="scene-fallback__monolith-core" />
        <div className="scene-fallback__monolith-shard scene-fallback__monolith-shard--1" />
        <div className="scene-fallback__monolith-shard scene-fallback__monolith-shard--2" />
      </div>
      <div className="scene-fallback__grid-floor" />
    </div>
  );
}
