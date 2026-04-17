import React from "react";

interface CardProps {
  visual: React.ReactNode;
  content: React.ReactNode;
}

interface DualMarqueeCarouselProps {
  items: CardProps[];
}

export default function DualMarqueeCarousel({ items = [] }: DualMarqueeCarouselProps) {
  // Duplicate the array to allow for a seamless 50% translation loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="marquee-wrapper">
      {/* Row 1: Scrolling Left */}
      <ul className="cards marquee-track scroll-left">
        {duplicatedItems.map((item, idx) => (
          <li className="card marquee-card" key={`row1-${idx}`}>
            <div className="visual">{item.visual}</div>
            <div className="content">{item.content}</div>
          </li>
        ))}
      </ul>

      {/* Row 2: Scrolling Right */}
      <ul className="cards marquee-track scroll-right">
        {duplicatedItems.map((item, idx) => (
          <li className="card marquee-card" key={`row2-${idx}`}>
            <div className="visual">{item.visual}</div>
            <div className="content">{item.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
