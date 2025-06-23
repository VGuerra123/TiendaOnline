'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Instagram, Share2 } from 'lucide-react';

export function FloatingSocialButtons() {
  const [isOpen, setIsOpen] = useState(false);

  const socialButtons = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/56228000000',
      color: 'bg-[#25D366] hover:bg-[#128C7E]',
      delay: 0.1
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/mercartchile',
      color: 'bg-gradient-to-r from-[#E4405F] via-[#F56040] to-[#FFDC80] hover:scale-110',
      delay: 0.2
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
      <div className="flex flex-col items-end space-y-3">
        <AnimatePresence>
          {isOpen && socialButtons.map((button, index) => (
            <motion.a
              key={button.name}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ delay: button.delay, type: "spring", stiffness: 200 }}
              className={`w-12 h-12 rounded-full ${button.color} flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:shadow-xl`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
        >
          <Share2 className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}