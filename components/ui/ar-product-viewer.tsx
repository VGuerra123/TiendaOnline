'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut, Smartphone, Laptop, Share2, Download, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface ARProductViewerProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    images: string[];
    model3d?: string;
    brand: string;
    category: string;
  };
}

export function ARProductViewer({ isOpen, onClose, product }: ARProductViewerProps) {
  const [currentView, setCurrentView] = useState<'3d' | '360' | 'ar'>('3d');
  const [currentAngle, setCurrentAngle] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);

  // Simular imágenes 360
  const images360 = Array.from({ length: 36 }, (_, i) => product.images[0]);

  useEffect(() => {
    let rotationInterval: NodeJS.Timeout | null = null;
    
    if (isRotating) {
      rotationInterval = setInterval(() => {
        setCurrentAngle(prev => (prev + 10) % 360);
      }, 100);
    }
    
    return () => {
      if (rotationInterval) clearInterval(rotationInterval);
    };
  }, [isRotating]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (currentView !== '360') return;
    
    startXRef.current = e.clientX;
    startAngleRef.current = currentAngle;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - startXRef.current;
    const newAngle = (startAngleRef.current + deltaX * 0.5) % 360;
    setCurrentAngle(newAngle < 0 ? newAngle + 360 : newAngle);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleARView = () => {
    // En un caso real, aquí se iniciaría la experiencia AR
    alert('Experiencia AR iniciada - Apunta tu cámara a una superficie plana');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-6xl h-[90vh] bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
              <div>
                <h2 className="text-2xl font-black text-white">{product.name}</h2>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-white/20 text-white">
                    {product.brand}
                  </Badge>
                  <Badge className="bg-white/20 text-white">
                    {product.category}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20 rounded-xl p-3"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-xl p-3"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Viewer */}
            <div 
              ref={viewerRef}
              className="w-full h-full flex items-center justify-center"
              onMouseDown={handleMouseDown}
            >
              <motion.div
                style={{ 
                  scale: zoom,
                  rotateY: currentView === '360' ? currentAngle : 0
                }}
                className="relative"
              >
                {currentView === '3d' && (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                )}
                
                {currentView === '360' && (
                  <img 
                    src={images360[Math.floor(currentAngle / 10) % images360.length]} 
                    alt={product.name}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                )}
                
                {currentView === 'ar' && (
                  <div className="flex flex-col items-center justify-center text-white space-y-6">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                      <Smartphone className="w-12 h-12" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">Experiencia AR</h3>
                      <p className="text-white/70 max-w-md">
                        Apunta tu cámara a una superficie plana para visualizar el producto en tu espacio
                      </p>
                    </div>
                    <Button
                      onClick={handleARView}
                      className="bg-gradient-to-r from-turquesa to-deep-blue text-white font-bold px-8 py-3 rounded-xl"
                    >
                      Iniciar Experiencia AR
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  {/* View Selector */}
                  <div className="flex bg-white/10 rounded-xl p-1">
                    <button
                      onClick={() => setCurrentView('3d')}
                      className={`px-4 py-2 rounded-lg font-bold text-sm ${
                        currentView === '3d' 
                          ? 'bg-gradient-to-r from-turquesa to-deep-blue text-white' 
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      3D
                    </button>
                    <button
                      onClick={() => setCurrentView('360')}
                      className={`px-4 py-2 rounded-lg font-bold text-sm ${
                        currentView === '360' 
                          ? 'bg-gradient-to-r from-turquesa to-deep-blue text-white' 
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      360°
                    </button>
                    <button
                      onClick={() => setCurrentView('ar')}
                      className={`px-4 py-2 rounded-lg font-bold text-sm ${
                        currentView === 'ar' 
                          ? 'bg-gradient-to-r from-turquesa to-deep-blue text-white' 
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      AR
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 rounded-xl p-3"
                      onClick={() => setIsRotating(!isRotating)}
                    >
                      <RotateCcw className={`w-5 h-5 ${isRotating ? 'text-turquesa' : 'text-white'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 rounded-xl p-3"
                      onClick={() => setZoom(Math.min(zoom + 0.1, 2))}
                    >
                      <ZoomIn className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 rounded-xl p-3"
                      onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
                    >
                      <ZoomOut className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 rounded-xl p-3"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {currentView === '360' && (
                  <div className="flex items-center space-x-4">
                    <span className="text-white/70 text-sm">0°</span>
                    <Slider
                      value={[currentAngle]}
                      onValueChange={(value) => setCurrentAngle(value[0])}
                      max={360}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-white/70 text-sm">360°</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-6 right-6 text-white hover:bg-white/20 rounded-xl p-3 z-30"
            >
              <Info className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}