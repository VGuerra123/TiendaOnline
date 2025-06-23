'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProductShowcaseProps {
  image: string;
  title: string;
  className?: string;
}

export function ProductShowcase({ image, title, className = '' }: ProductShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative cursor-pointer ${className}`}
    >
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden"
        style={{
          transform: isHovered ? "translateZ(80px)" : "translateZ(0px)",
        }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Enhanced holographic overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent via-secondary/20 to-coral-accent/30 opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            boxShadow: isHovered 
              ? "0 0 60px rgba(59, 130, 246, 0.6), 0 0 120px rgba(6, 182, 212, 0.4), 0 0 180px rgba(255, 107, 107, 0.3)"
              : "0 0 0px rgba(59, 130, 246, 0)",
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Shimmer effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          />
        )}
      </motion.div>
      
      {/* Enhanced floating particles */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{
                x: "50%",
                y: "50%",
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 300}%`,
                y: `${50 + (Math.random() - 0.5) * 300}%`,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
      
      {/* 3D depth layers */}
      {isHovered && (
        <>
          <motion.div
            className="absolute inset-2 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm"
            style={{ transform: "translateZ(-20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-4 rounded-xl bg-gradient-to-br from-secondary/10 to-coral-accent/10 backdrop-blur-sm"
            style={{ transform: "translateZ(-40px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
        </>
      )}
    </motion.div>
  );
}