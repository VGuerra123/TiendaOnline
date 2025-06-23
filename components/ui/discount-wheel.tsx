'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DiscountWheelProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: (discount: number, code: string) => void;
}

export function DiscountWheel({ isOpen, onClose, onWin }: DiscountWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const segments = [
    { discount: 5, color: '#ff6b6b', code: 'SPIN5' },
    { discount: 10, color: '#4ecdc4', code: 'SPIN10' },
    { discount: 15, color: '#45b7d1', code: 'SPIN15' },
    { discount: 20, color: '#96ceb4', code: 'SPIN20' },
    { discount: 25, color: '#feca57', code: 'SPIN25' },
    { discount: 30, color: '#ff9ff3', code: 'SPIN30' },
  ];

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    
    // Random rotation between 1440 and 2160 degrees (4-6 full rotations)
    const randomRotation = Math.random() * 720 + 1440;
    
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${randomRotation}deg)`;
    }

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      
      // Calculate which segment won based on final rotation
      const normalizedRotation = randomRotation % 360;
      const segmentAngle = 360 / segments.length;
      const winningIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % segments.length;
      const winningSegment = segments[winningIndex];
      
      setTimeout(() => {
        onWin(winningSegment.discount, winningSegment.code);
      }, 1000);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  ¡Gira y Gana!
                </h2>
                <p className="text-gray-600">
                  Gira la ruleta y obtén un descuento exclusivo
                </p>
              </div>

              {/* Wheel */}
              <div className="relative w-64 h-64 mx-auto mb-6">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
                </div>

                {/* Wheel */}
                <div
                  ref={wheelRef}
                  className="w-full h-full rounded-full border-8 border-white shadow-2xl transition-transform duration-3000 ease-out"
                  style={{
                    background: `conic-gradient(${segments.map((segment, index) => 
                      `${segment.color} ${index * 60}deg ${(index + 1) * 60}deg`
                    ).join(', ')})`
                  }}
                >
                  {segments.map((segment, index) => (
                    <div
                      key={index}
                      className="absolute w-full h-full flex items-center justify-center text-white font-bold text-lg"
                      style={{
                        transform: `rotate(${index * 60 + 30}deg)`,
                        transformOrigin: 'center'
                      }}
                    >
                      <span 
                        className="transform -rotate-90"
                        style={{ marginTop: '-80px' }}
                      >
                        {segment.discount}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spin Button */}
              <Button
                onClick={spinWheel}
                disabled={isSpinning || hasSpun}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 disabled:opacity-50"
              >
                {isSpinning ? (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Girando...
                  </div>
                ) : hasSpun ? (
                  '¡Ya giraste!'
                ) : (
                  <div className="flex items-center justify-center">
                    <Gift className="w-5 h-5 mr-2" />
                    ¡Girar Ruleta!
                  </div>
                )}
              </Button>

              {hasSpun && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-gray-600"
                >
                  ¡Felicidades! Tu descuento se aplicará automáticamente
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}