'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy MercartIA, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    '¿Cuáles son las ofertas del día?',
    'Quiero armar una PC gaming',
    '¿Tienen iPhone 15 Pro?',
    'Información de envíos',
    'Soporte técnico'
  ];

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('oferta') || message.includes('descuento')) {
      return '🔥 ¡Tenemos ofertas increíbles! iPhone 15 Pro con 25% OFF, RTX 4090 con descuento especial y MacBook Pro M3 en promoción. ¿Te interesa alguno en particular?';
    }
    
    if (message.includes('pc') || message.includes('gaming') || message.includes('armar')) {
      return '🎮 ¡Perfecto! Nuestro configurador de PC te ayudará a armar la PC gaming ideal. Tenemos builds desde $800.000 hasta $5.000.000. ¿Cuál es tu presupuesto?';
    }
    
    if (message.includes('iphone') || message.includes('smartphone')) {
      return '📱 ¡Sí! Tenemos el iPhone 15 Pro Max en stock con 25% OFF. También Samsung Galaxy S24 Ultra y Google Pixel 8 Pro. ¿Cuál te interesa más?';
    }
    
    if (message.includes('envío') || message.includes('delivery')) {
      return '🚚 Envío gratis a todo Chile en compras sobre $150.000. Envío express 24h disponible en Santiago. ¿Necesitas más información sobre envíos?';
    }
    
    if (message.includes('soporte') || message.includes('ayuda') || message.includes('problema')) {
      return '🛠️ Nuestro equipo de soporte está disponible 24/7. Ofrecemos instalación gratuita, setup profesional y garantía extendida. ¿En qué específicamente necesitas ayuda?';
    }
    
    if (message.includes('precio') || message.includes('costo')) {
      return '💰 Tenemos los mejores precios de Chile con financiamiento hasta 24 cuotas sin interés. ¿Qué producto te interesa para cotizar?';
    }
    
    return '¡Gracias por tu mensaje! Nuestro equipo especializado te ayudará con cualquier consulta. También puedes explorar nuestras categorías: Gaming, Smartphones, Computación y Smart Home. ¿Hay algo específico que buscas?';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white shadow-2xl z-50 hover:scale-110 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <MessageCircle className="w-8 h-8" />
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white text-xs font-bold">!</span>
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-24 left-6 w-96 h-[500px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">MercartIA</h3>
                  <p className="text-white/80 text-sm">Asistente Virtual</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {message.isBot ? (
                        <Bot className="w-5 h-5 text-blue-600" />
                      ) : (
                        <User className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className={`rounded-2xl p-3 ${message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Preguntas frecuentes:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.slice(0, 3).map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 rounded-full"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-blue-600 to-cyan-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}