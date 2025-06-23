'use client';

import Link from 'next/link';
import { ArrowRight, Gamepad2, Monitor, Smartphone, Headphones, Home, Zap, Cpu, HardDrive, MemoryStick, Clapperboard as Motherboard, PowerIcon, Fan, Webcam, Mic, Speaker, Router, Wifi, Cable, Printer, Keyboard, Mouse, Tablet, Watch, Camera, Tv, Car, Lightbulb, Lock, Thermometer, Shield, Gift, TrendingUp, Star, Crown, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface MegaMenuProps {
  category: string;
  categoryHref: string;
}

export function MegaMenu({ category, categoryHref }: MegaMenuProps) {
  const menuData = {
    'Gaming y Streaming': {
      sections: [
        {
          title: 'Gaming Hardware',
          icon: Gamepad2,
          items: [
            { name: 'Tarjetas Gráficas RTX', href: '/categoria/gaming/gpu', hot: true },
            { name: 'Procesadores Gaming', href: '/categoria/gaming/cpu', hot: true },
            { name: 'Memorias RAM Gaming', href: '/categoria/gaming/ram' },
            { name: 'SSDs Gaming', href: '/categoria/gaming/storage' },
            { name: 'Fuentes Gaming', href: '/categoria/gaming/psu' },
            { name: 'Refrigeración Líquida', href: '/categoria/gaming/cooling', hot: true },
          ],
        },
        {
          title: 'Periféricos Gaming',
          icon: Keyboard,
          items: [
            { name: 'Teclados Mecánicos', href: '/categoria/gaming/keyboards', hot: true },
            { name: 'Ratones Gaming', href: '/categoria/gaming/mice' },
            { name: 'Audífonos Gaming', href: '/categoria/gaming/headsets' },
            { name: 'Monitores Gaming', href: '/categoria/gaming/monitors', hot: true },
            { name: 'Sillas Gaming', href: '/categoria/gaming/chairs' },
            { name: 'Mousepads RGB', href: '/categoria/gaming/mousepads' },
          ],
        },
        {
          title: 'Streaming Equipment',
          icon: Webcam,
          items: [
            { name: 'Cámaras Web 4K', href: '/categoria/streaming/cameras', hot: true },
            { name: 'Micrófonos USB', href: '/categoria/streaming/microphones' },
            { name: 'Stream Decks', href: '/categoria/streaming/streamdecks' },
            { name: 'Luces LED', href: '/categoria/streaming/lighting' },
            { name: 'Green Screens', href: '/categoria/streaming/greenscreens' },
            { name: 'Capturadoras', href: '/categoria/streaming/capture' },
          ],
        },
        {
          title: 'Consolas y Juegos',
          icon: Gamepad2,
          items: [
            { name: 'PlayStation 5', href: '/categoria/consolas/ps5', hot: true },
            { name: 'Xbox Series X/S', href: '/categoria/consolas/xbox' },
            { name: 'Nintendo Switch', href: '/categoria/consolas/nintendo' },
            { name: 'Steam Deck', href: '/categoria/consolas/steamdeck', hot: true },
            { name: 'Juegos Digitales', href: '/categoria/juegos/digital' },
            { name: 'Accesorios Consola', href: '/categoria/consolas/accessories' },
          ],
        },
      ],
      featured: {
        title: 'RTX 4090 Gaming Beast',
        description: 'La experiencia gaming definitiva en 4K con Ray Tracing',
        image: 'https://images.pexels.com/photos/7947661/pexels-photo-7947661.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: '$2.899.000',
        originalPrice: '$3.299.000',
        badge: 'Más Vendido',
      },
    },
    'Computación': {
      sections: [
        {
          title: 'Laptops',
          icon: Monitor,
          items: [
            { name: 'Gaming Laptops', href: '/categoria/laptops/gaming', hot: true },
            { name: 'Ultrabooks', href: '/categoria/laptops/ultrabooks' },
            { name: 'Workstations', href: '/categoria/laptops/workstations' },
            { name: 'Convertibles 2-en-1', href: '/categoria/laptops/convertibles' },
            { name: 'Chromebooks', href: '/categoria/laptops/chromebooks' },
            { name: 'MacBooks', href: '/categoria/laptops/macbooks', hot: true },
          ],
        },
        {
          title: 'Desktops',
          icon: Cpu,
          items: [
            { name: 'PCs Gaming', href: '/categoria/desktops/gaming', hot: true },
            { name: 'PCs Oficina', href: '/categoria/desktops/office' },
            { name: 'All-in-One', href: '/categoria/desktops/aio' },
            { name: 'Mini PCs', href: '/categoria/desktops/mini' },
            { name: 'Workstations', href: '/categoria/desktops/workstations' },
            { name: 'iMacs', href: '/categoria/desktops/imacs' },
          ],
        },
        {
          title: 'Componentes',
          icon: Motherboard,
          items: [
            { name: 'Procesadores Intel', href: '/categoria/componentes/intel', hot: true },
            { name: 'Procesadores AMD', href: '/categoria/componentes/amd', hot: true },
            { name: 'Tarjetas Madre', href: '/categoria/componentes/motherboards' },
            { name: 'Memorias RAM', href: '/categoria/componentes/ram' },
            { name: 'Almacenamiento', href: '/categoria/componentes/storage' },
            { name: 'Fuentes de Poder', href: '/categoria/componentes/psu' },
          ],
        },
        {
          title: 'Periféricos',
          icon: Printer,
          items: [
            { name: 'Monitores 4K', href: '/categoria/perifericos/monitors', hot: true },
            { name: 'Teclados', href: '/categoria/perifericos/keyboards' },
            { name: 'Ratones', href: '/categoria/perifericos/mice' },
            { name: 'Impresoras', href: '/categoria/perifericos/printers' },
            { name: 'Webcams', href: '/categoria/perifericos/webcams' },
            { name: 'Speakers', href: '/categoria/perifericos/speakers' },
          ],
        },
      ],
      featured: {
        title: 'MacBook Pro M3 Max',
        description: 'Potencia profesional para creativos y desarrolladores',
        image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: '$5.999.000',
        originalPrice: '$6.499.000',
        badge: 'Nuevo',
      },
    },
    'Smartphones': {
      sections: [
        {
          title: 'Flagship Premium',
          icon: Smartphone,
          items: [
            { name: 'iPhone 15 Pro Max', href: '/categoria/smartphones/iphone-15-pro', hot: true },
            { name: 'Samsung Galaxy S24 Ultra', href: '/categoria/smartphones/galaxy-s24', hot: true },
            { name: 'Google Pixel 8 Pro', href: '/categoria/smartphones/pixel-8' },
            { name: 'OnePlus 12', href: '/categoria/smartphones/oneplus-12' },
            { name: 'Xiaomi 14 Ultra', href: '/categoria/smartphones/xiaomi-14' },
            { name: 'Nothing Phone (2)', href: '/categoria/smartphones/nothing-2' },
          ],
        },
        {
          title: 'Gama Media',
          icon: Smartphone,
          items: [
            { name: 'iPhone 15', href: '/categoria/smartphones/iphone-15' },
            { name: 'Samsung Galaxy A55', href: '/categoria/smartphones/galaxy-a55' },
            { name: 'Google Pixel 8a', href: '/categoria/smartphones/pixel-8a' },
            { name: 'OnePlus Nord 4', href: '/categoria/smartphones/oneplus-nord' },
            { name: 'Xiaomi Redmi Note 13', href: '/categoria/smartphones/redmi-note' },
            { name: 'Motorola Edge 50', href: '/categoria/smartphones/moto-edge' },
          ],
        },
        {
          title: 'Accesorios',
          icon: Cable,
          items: [
            { name: 'Fundas y Cases', href: '/categoria/smartphones/cases' },
            { name: 'Protectores Pantalla', href: '/categoria/smartphones/screen-protectors' },
            { name: 'Cargadores Inalámbricos', href: '/categoria/smartphones/wireless-chargers', hot: true },
            { name: 'Power Banks', href: '/categoria/smartphones/powerbanks' },
            { name: 'Cables USB-C', href: '/categoria/smartphones/cables' },
            { name: 'Soportes y Grips', href: '/categoria/smartphones/stands' },
          ],
        },
        {
          title: 'Wearables',
          icon: Watch,
          items: [
            { name: 'Apple Watch Series 9', href: '/categoria/wearables/apple-watch', hot: true },
            { name: 'Samsung Galaxy Watch', href: '/categoria/wearables/galaxy-watch' },
            { name: 'Google Pixel Watch', href: '/categoria/wearables/pixel-watch' },
            { name: 'Fitbit', href: '/categoria/wearables/fitbit' },
            { name: 'Garmin', href: '/categoria/wearables/garmin' },
            { name: 'AirPods Pro', href: '/categoria/wearables/airpods', hot: true },
          ],
        },
      ],
      featured: {
        title: 'iPhone 15 Pro Max Titanio',
        description: 'El smartphone más avanzado con chip A17 Pro',
        image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: '$4.999.000',
        originalPrice: '$5.499.000',
        badge: 'Lanzamiento',
      },
    },
    'Audio y Video': {
      sections: [
        {
          title: 'Audio Premium',
          icon: Headphones,
          items: [
            { name: 'Audífonos Hi-Fi', href: '/categoria/audio/hifi', hot: true },
            { name: 'Audífonos Inalámbricos', href: '/categoria/audio/wireless' },
            { name: 'Speakers Bluetooth', href: '/categoria/audio/bluetooth-speakers' },
            { name: 'Soundbars', href: '/categoria/audio/soundbars' },
            { name: 'Sistemas de Audio', href: '/categoria/audio/systems' },
            { name: 'Micrófonos Pro', href: '/categoria/audio/microphones', hot: true },
          ],
        },
        {
          title: 'Video y TV',
          icon: Tv,
          items: [
            { name: 'Smart TVs 4K', href: '/categoria/video/smart-tvs', hot: true },
            { name: 'TVs OLED', href: '/categoria/video/oled-tvs', hot: true },
            { name: 'Proyectores 4K', href: '/categoria/video/projectors' },
            { name: 'Streaming Devices', href: '/categoria/video/streaming' },
            { name: 'Reproductores Blu-ray', href: '/categoria/video/bluray' },
            { name: 'Antenas y Cables', href: '/categoria/video/cables' },
          ],
        },
        {
          title: 'Fotografía',
          icon: Camera,
          items: [
            { name: 'Cámaras DSLR', href: '/categoria/foto/dslr' },
            { name: 'Cámaras Mirrorless', href: '/categoria/foto/mirrorless', hot: true },
            { name: 'Lentes y Objetivos', href: '/categoria/foto/lenses' },
            { name: 'Trípodes', href: '/categoria/foto/tripods' },
            { name: 'Iluminación', href: '/categoria/foto/lighting' },
            { name: 'Accesorios Foto', href: '/categoria/foto/accessories' },
          ],
        },
        {
          title: 'Audio Profesional',
          icon: Mic,
          items: [
            { name: 'Interfaces de Audio', href: '/categoria/audio-pro/interfaces' },
            { name: 'Monitores de Estudio', href: '/categoria/audio-pro/monitors' },
            { name: 'Mezcladores', href: '/categoria/audio-pro/mixers' },
            { name: 'Micrófonos Estudio', href: '/categoria/audio-pro/studio-mics' },
            { name: 'Controladores MIDI', href: '/categoria/audio-pro/midi' },
            { name: 'Software DAW', href: '/categoria/audio-pro/software' },
          ],
        },
      ],
      featured: {
        title: 'Sony WH-1000XM5',
        description: 'Audífonos premium con cancelación de ruido líder',
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: '$899.000',
        originalPrice: '$1.299.000',
        badge: 'Oferta',
      },
    },
    'Domótica': {
      sections: [
        {
          title: 'Smart Home Hub',
          icon: Home,
          items: [
            { name: 'Amazon Echo', href: '/categoria/domotica/echo', hot: true },
            { name: 'Google Nest Hub', href: '/categoria/domotica/nest' },
            { name: 'Apple HomePod', href: '/categoria/domotica/homepod' },
            { name: 'Samsung SmartThings', href: '/categoria/domotica/smartthings' },
            { name: 'Philips Hue Bridge', href: '/categoria/domotica/hue' },
            { name: 'Zigbee Hubs', href: '/categoria/domotica/zigbee' },
          ],
        },
        {
          title: 'Iluminación Smart',
          icon: Lightbulb,
          items: [
            { name: 'Bombillas Inteligentes', href: '/categoria/domotica/smart-bulbs', hot: true },
            { name: 'Tiras LED RGB', href: '/categoria/domotica/led-strips' },
            { name: 'Interruptores Smart', href: '/categoria/domotica/smart-switches' },
            { name: 'Sensores Movimiento', href: '/categoria/domotica/motion-sensors' },
            { name: 'Dimmers Inteligentes', href: '/categoria/domotica/dimmers' },
            { name: 'Lámparas Smart', href: '/categoria/domotica/smart-lamps' },
          ],
        },
        {
          title: 'Seguridad Smart',
          icon: Shield,
          items: [
            { name: 'Cámaras Seguridad', href: '/categoria/domotica/security-cameras', hot: true },
            { name: 'Video Porteros', href: '/categoria/domotica/doorbells' },
            { name: 'Cerraduras Smart', href: '/categoria/domotica/smart-locks', hot: true },
            { name: 'Sensores Puerta/Ventana', href: '/categoria/domotica/door-sensors' },
            { name: 'Alarmas Inteligentes', href: '/categoria/domotica/alarms' },
            { name: 'Detectores Humo', href: '/categoria/domotica/smoke-detectors' },
          ],
        },
        {
          title: 'Climatización',
          icon: Thermometer,
          items: [
            { name: 'Termostatos Smart', href: '/categoria/domotica/thermostats', hot: true },
            { name: 'Sensores Temperatura', href: '/categoria/domotica/temp-sensors' },
            { name: 'Humidificadores Smart', href: '/categoria/domotica/humidifiers' },
            { name: 'Purificadores Aire', href: '/categoria/domotica/air-purifiers' },
            { name: 'Ventiladores Smart', href: '/categoria/domotica/smart-fans' },
            { name: 'Calefactores Smart', href: '/categoria/domotica/smart-heaters' },
          ],
        },
      ],
      featured: {
        title: 'Kit Domótica Completo',
        description: 'Transforma tu hogar en una casa inteligente',
        image: 'https://images.pexels.com/photos/8293712/pexels-photo-8293712.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: '$1.299.000',
        originalPrice: '$1.799.000',
        badge: 'Kit Completo',
      },
    },
    'Accesorios': {
      sections: [
        {
          title: 'Carga y Energía',
          icon: PowerIcon,
          items: [
            { name: 'Cargadores Rápidos', href: '/categoria/accesorios/fast-chargers', hot: true },
            { name: 'Power Banks', href: '/categoria/accesorios/powerbanks' },
            { name: 'Cargadores Inalámbricos', href: '/categoria/accesorios/wireless-chargers' },
            { name: 'Cables USB-C', href: '/categoria/accesorios/usb-c-cables' },
            { name: 'Adaptadores', href: '/categoria/accesorios/adapters' },
            { name: 'UPS', href: '/categoria/accesorios/ups' },
          ],
        },
        {
          title: 'Almacenamiento',
          icon: HardDrive,
          items: [
            { name: 'Discos Externos', href: '/categoria/accesorios/external-drives' },
            { name: 'SSDs Portátiles', href: '/categoria/accesorios/portable-ssds', hot: true },
            { name: 'Memorias USB', href: '/categoria/accesorios/usb-drives' },
            { name: 'Tarjetas SD', href: '/categoria/accesorios/sd-cards' },
            { name: 'NAS', href: '/categoria/accesorios/nas' },
            { name: 'Enclosures', href: '/categoria/accesorios/enclosures' },
          ],
        },
        {
          title: 'Conectividad',
          icon: Wifi,
          items: [
            { name: 'Adaptadores WiFi', href: '/categoria/accesorios/wifi-adapters' },
            { name: 'Hubs USB', href: '/categoria/accesorios/usb-hubs' },
            { name: 'Docks y Estaciones', href: '/categoria/accesorios/docks', hot: true },
            { name: 'Cables HDMI', href: '/categoria/accesorios/hdmi-cables' },
            { name: 'Convertidores', href: '/categoria/accesorios/converters' },
            { name: 'Extensores WiFi', href: '/categoria/accesorios/wifi-extenders' },
          ],
        },
        {
          title: 'Protección',
          icon: Shield,
          items: [
            { name: 'Fundas Laptop', href: '/categoria/accesorios/laptop-cases' },
            { name: 'Protectores Pantalla', href: '/categoria/accesorios/screen-protectors' },
            { name: 'Mochilas Tech', href: '/categoria/accesorios/tech-backpacks' },
            { name: 'Soportes Dispositivos', href: '/categoria/accesorios/device-stands' },
            { name: 'Limpieza Tech', href: '/categoria/accesorios/cleaning' },
            { name: 'Organizadores Cables', href: '/categoria/accesorios/cable-management' },
          ],
        },
      ],
      featured: {
        title: 'Kit Accesorios Premium',
        description: 'Todo lo que necesitas para tus dispositivos',
        image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: '$299.000',
        originalPrice: '$399.000',
        badge: 'Bundle',
      },
    },
    'Ofertas': {
      sections: [
        {
          title: 'Ofertas Flash',
          icon: Zap,
          items: [
            { name: 'Gaming Deals', href: '/ofertas/gaming', hot: true },
            { name: 'Laptop Deals', href: '/ofertas/laptops', hot: true },
            { name: 'Smartphone Deals', href: '/ofertas/smartphones' },
            { name: 'Audio Deals', href: '/ofertas/audio' },
            { name: 'Smart Home Deals', href: '/ofertas/smart-home' },
            { name: 'Accesorios Deals', href: '/ofertas/accesorios' },
          ],
        },
        {
          title: 'Liquidación',
          icon: Gift,
          items: [
            { name: 'Última Generación', href: '/ofertas/clearance/last-gen' },
            { name: 'Productos Descontinuados', href: '/ofertas/clearance/discontinued' },
            { name: 'Devoluciones', href: '/ofertas/clearance/returns' },
            { name: 'Exhibición', href: '/ofertas/clearance/display' },
            { name: 'Reacondicionados', href: '/ofertas/clearance/refurbished' },
            { name: 'Outlet', href: '/ofertas/clearance/outlet' },
          ],
        },
        {
          title: 'Ofertas Especiales',
          icon: Crown,
          items: [
            { name: 'Black Friday', href: '/ofertas/black-friday', hot: true },
            { name: 'Cyber Monday', href: '/ofertas/cyber-monday' },
            { name: 'Día del Gamer', href: '/ofertas/gamer-day' },
            { name: 'Back to School', href: '/ofertas/back-to-school' },
            { name: 'Navidad Tech', href: '/ofertas/christmas' },
            { name: 'Año Nuevo', href: '/ofertas/new-year' },
          ],
        },
        {
          title: 'Bundles y Combos',
          icon: Star,
          items: [
            { name: 'Gaming Bundles', href: '/ofertas/bundles/gaming', hot: true },
            { name: 'Office Bundles', href: '/ofertas/bundles/office' },
            { name: 'Smart Home Kits', href: '/ofertas/bundles/smart-home' },
            { name: 'Streaming Kits', href: '/ofertas/bundles/streaming' },
            { name: 'Student Bundles', href: '/ofertas/bundles/student' },
            { name: 'Creator Bundles', href: '/ofertas/bundles/creator' },
          ],
        },
      ],
      featured: {
        title: 'Mega Oferta Gaming',
        description: 'Setup gaming completo con descuentos increíbles',
        image: 'https://images.pexels.com/photos/7947858/pexels-photo-7947858.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: '$3.999.000',
        originalPrice: '$5.999.000',
        badge: 'Hasta 50% OFF',
      },
    },
  };

  const currentMenu = menuData[category as keyof typeof menuData];
  
  if (!currentMenu) return null;

  return (
    <div className="absolute top-full left-0 w-screen bg-white/95 backdrop-blur-3xl border-t border-gray-200/50 shadow-premium-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Menu Sections */}
          <div className="col-span-8 grid grid-cols-4 gap-6">
            {currentMenu.sections.map((section, index) => (
              <motion.div 
                key={index} 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <section.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-primary text-lg border-b border-neutral/20 pb-2">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                    >
                      <Link
                        href={item.href}
                        className="text-slate-accent hover:text-primary transition-colors duration-200 flex items-center group/item relative"
                      >
                        <span className="group-hover/item:translate-x-2 transition-transform duration-200 flex items-center">
                          {item.name}
                          {item.hot && (
                            <Badge className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              <Flame className="w-3 h-3 mr-1" />
                              HOT
                            </Badge>
                          )}
                        </span>
                        <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover/item:opacity-100 transition-all duration-200" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Featured Product */}
          <motion.div 
            className="col-span-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-coral-accent/5 rounded-3xl p-6 h-full card-3d">
              <div className="flex flex-col h-full">
                <div className="aspect-video bg-white rounded-2xl mb-6 overflow-hidden relative">
                  <img
                    src={currentMenu.featured.image}
                    alt={currentMenu.featured.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="premium-badge-primary font-bold">
                      {currentMenu.featured.badge}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  <h4 className="text-2xl font-bold text-primary neon-glow">
                    {currentMenu.featured.title}
                  </h4>
                  <p className="text-slate-accent leading-relaxed">
                    {currentMenu.featured.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-primary">
                        {currentMenu.featured.price}
                      </span>
                      {currentMenu.featured.originalPrice && (
                        <span className="text-lg text-slate-accent line-through">
                          {currentMenu.featured.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-slate-accent font-semibold">(4.9) • 1.2K reviews</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full gradient-primary mt-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
                  Ver Producto
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div 
          className="mt-8 pt-6 border-t border-gray-200/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-accent" />
                <span className="font-semibold text-slate-accent">Más Vendidos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-accent-yellow" />
                <span className="font-semibold text-slate-accent">Ofertas Flash</span>
              </div>
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-violet-accent" />
                <span className="font-semibold text-slate-accent">Premium</span>
              </div>
            </div>
            <Link href={categoryHref}>
              <Button variant="outline" className="btn-secondary font-semibold">
                Ver Toda la Categoría
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}