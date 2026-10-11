import React from 'react';

export default function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span className="section-label__num">{number}</span>
      <span className="section-label__line" aria-hidden="true" />
      <span className="section-label__text">{children}</span>
    </div>
  );
}
