'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export function FloatingElements({ count = 40, className = '' }: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.6 + 0.1,
    rotationSpeed: Math.random() * 360 + 180,
    type: Math.random() > 0.5 ? 'circle' : 'square',
  }));

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute backdrop-blur-sm ${
            element.type === 'circle' 
              ? 'rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-purple-500/20' 
              : 'rounded-sm bg-gradient-to-r from-purple-500/15 via-pink-400/15 to-blue-500/15 rotate-45'
          }`}
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
            opacity: element.opacity,
          }}
          animate={{
            y: [0, -60, -120, -60, 0],
            x: [0, 30, -30, 20, 0],
            scale: [1, 1.5, 0.8, 1.3, 1],
            rotate: [0, element.rotationSpeed, element.rotationSpeed * 2],
            opacity: [element.opacity, element.opacity * 1.8, element.opacity * 0.3, element.opacity * 1.5, element.opacity],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Additional geometric shapes */}
      {Array.from({ length: Math.floor(count / 4) }, (_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute w-1 h-8 bg-gradient-to-t from-cyan-400/30 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}