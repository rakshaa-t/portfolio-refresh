"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { sendToAI, getFallbackResponse, type ChatMessage } from "../../lib/ai-chat";
import { AI_CONFIG } from "../../lib/config";
import { PortfolioMobile } from "./PortfolioMobile";

export interface RakshaPortfolioProps {}

// Helper function to format text with links, line breaks, and bullet points
const formatMessageText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s<>()]+)/g;
  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => {
    // Split line by URLs
    const parts = line.split(urlRegex);
    
    const formattedLine = parts.map((part, partIndex) => {
      if (part.match(urlRegex)) {
        // Remove trailing punctuation that's not part of the URL
        const cleanUrl = part.replace(/[.,;:!?)]+$/, '');
        const trailingPunct = part.slice(cleanUrl.length);
        
        return (
          <React.Fragment key={`${lineIndex}-${partIndex}`}>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#283FE4] underline hover:text-[#4F5CFF] transition-colors"
            >
              {cleanUrl}
            </a>
            {trailingPunct}
          </React.Fragment>
        );
      }
      return part;
    });
    
    // Add line break after each line except the last
    return (
      <React.Fragment key={lineIndex}>
        {formattedLine}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

// Chunky text reveal component - reveals text in word chunks
const ChunkyText = ({ content }: { content: string }) => {
  const [visibleLength, setVisibleLength] = React.useState(0);
  const chunkSize = 15; // Show ~15 characters at a time (roughly 2-3 words)
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth <= 768;

  React.useEffect(() => {
    // On mobile, show text instantly to avoid performance issues
    if (isMobileDevice) {
      setVisibleLength(content.length);
      return;
    }
    
    if (visibleLength < content.length) {
      const timer = setTimeout(() => {
        setVisibleLength(prev => Math.min(prev + chunkSize, content.length));
      }, 66); // Show each chunk quickly (66ms - 10% slower than 60ms)
      return () => clearTimeout(timer);
    }
  }, [visibleLength, content.length, isMobileDevice]);

  const visibleContent = content.slice(0, visibleLength);

  return (
    <>
      {formatMessageText(visibleContent)}
    </>
  );
};

// Memoized message component to prevent re-renders
const MessageBubble = React.memo(({ msg }: { msg: ChatMessage }) => {
  if (msg.sender === 'ai') {
    return (
      <div className="flex items-start gap-3 max-w-[560px]">
        <div className="relative w-[48px] h-[48px] flex-shrink-0 rounded-full overflow-hidden bg-[#D9D9D9]">
          <img
            src="https://storage.googleapis.com/storage.magicpath.ai/user/323295203727400960/assets/a162f3c9-9017-4e52-a2b7-d48614b32b0f.jpg"
            alt="Profile"
            className="absolute w-full h-full object-cover"
          />
        </div>
        <div
          className="px-[18px] py-[14px] bg-white text-black"
          style={{
            borderRadius: '30px 30px 30px 0px',
            boxShadow: '0 4px 12px rgba(40, 63, 228, 0.08)'
          }}
        >
          <div className="text-[14px] leading-[21px] font-extralight" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
            <ChunkyText content={msg.content || ''} />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-[560px] flex flex-col items-end">
      {/* Card Thumbnail - if message includes card */}
      {msg.card && (
        <div 
          className="mb-3 inline-block"
          style={{
            transform: `rotate(${msg.card.id === 'ova' ? '-15deg' : msg.card.id === 'ioc' ? '5deg' : msg.card.id === 'greex' ? '15deg' : '-15deg'})`
          }}
        >
          <div 
            className="w-[100px] h-[100px] rounded-[20px] border border-white overflow-hidden relative"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <img 
              src={msg.card.image} 
              alt={msg.card.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      
      <div
        className="px-[22px] py-[20px] bg-black/[0.79] text-white"
        style={{
          borderRadius: '30px 30px 0px 30px',
          boxShadow: '0 4px 12px rgba(40, 63, 228, 0.08)'
        }}
      >
        <p className="text-[14px] leading-[21px] font-light" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
          {msg.content}
        </p>
      </div>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';

const NAV_ITEMS = [
  {
    id: "chat" as const,
    label: "Chat"
  },
  {
    id: "inbox" as const,
    label: "Inbox"
  },
  {
    id: "calendar" as const,
    label: "Calendar"
  }
] as const;

const ALL_SUGGESTIONS = [
  "tell me more about ova",
  "what is your design process?",
  "what is your design tech stack?",
  "how did you get into design?",
  "what's your favorite project?",
  "do you take freelance work?",
  "what's your design philosophy?",
  "tell me about the greex project",
  "what inspired you to design?",
  "how do you approach research?",
  "tell me about the ioc project",
  "can you share design tips?"
];

const PROJECT_CARDS = [
  {
    id: 'ova',
    title: 'ova : period tracking app',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1761388415/Slide_4_3_-_1_2_zr9r7i.png',
    message: 'what did designing ova teach you',
    position: { left: '0px', top: '73.7px' },
    rotation: -15
  },
  {
    id: 'ioc',
    title: 'ioc : vendor management',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png',
    message: 'what was the most challenging part about ioc',
    position: { left: '42.16px', top: '254.54px' },
    rotation: 5
  },
  {
    id: 'greex',
    title: 'greex : defi trading',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png',
    message: 'whats was ur process for greex',
    position: { left: '831.04px', top: '0px' },
    rotation: 15
  },
  {
    id: 'dealdoc',
    title: 'dealdoc : deal management',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1761388291/656_3x_shots_so_qced29.png',
    message: "what did you like most about dealdoc's redesign",
    position: { left: '783.09px', top: '272.86px' },
    rotation: -15
  }
] as const;

export const PortfolioHeroSection: React.FC<RakshaPortfolioProps> = (props: RakshaPortfolioProps) => {
  // Mobile-responsive portfolio with working chat, cards, and optimized performance (v2.0)
  const [activeNav, setActiveNav] = React.useState<"chat" | "inbox" | "calendar">("chat");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const [visiblePills, setVisiblePills] = React.useState<string[]>(ALL_SUGGESTIONS);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [visibleCards, setVisibleCards] = React.useState<string[]>(PROJECT_CARDS.map(c => c.id));
  const [isDraggingCard, setIsDraggingCard] = React.useState<string | null>(null);
  const [isCardOverChat, setIsCardOverChat] = React.useState(false);
  const [clickingCard, setClickingCard] = React.useState<string | null>(null);
  const chatCardRef = React.useRef<HTMLDivElement>(null);
  const cardsContainerRef = React.useRef<HTMLDivElement>(null);
  
  // Input ref for instant typing response
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Abort controller ref for cleanup
  const abortControllerRef = React.useRef<AbortController | null>(null);

  // Mobile detection - more robust check
  const [isMobile, setIsMobile] = React.useState(false);
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth <= 768;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const shouldUseMobile = isMobileWidth || isMobileDevice;
      console.log('🔍 Mobile Detection:', { width: window.innerWidth, isMobileDevice, shouldUseMobile });
      setIsMobile(shouldUseMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Limit message history to prevent memory leak
  const MAX_MESSAGES = 20;
  const addMessage = React.useCallback((newMessage: ChatMessage) => {
    setMessages(prev => {
      const updated = [...prev, newMessage];
      // Keep only last MAX_MESSAGES messages
      if (updated.length > MAX_MESSAGES) {
        return updated.slice(-MAX_MESSAGES);
      }
      return updated;
    });
  }, []);

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages.length]);
  
  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    // Cancel any pending API call
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'text',
      content: textToSend,
      sender: 'user',
      timestamp: Date.now()
    };

    addMessage(userMessage);
    setInputValue("");
    // Clear input field directly for instant visual feedback
    if (inputRef.current) inputRef.current.value = "";
    setIsLoading(true);

    try {
      // Debug: Check if API key exists
      if (!AI_CONFIG.API_KEY) {
        console.error('❌ API Key is missing! Check Vercel environment variables.');
        throw new Error('API Key not configured');
      }
      console.log('✅ API Key found, sending message to AI...');
      
      // Send to AI
      const response = await sendToAI(textToSend, messages, AI_CONFIG.API_KEY);
      
      // Check if response was successful
      if (!response.success) {
        console.error('❌ AI response failed:', response.error);
        // Still show the error message to user
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'text',
          content: response.message,
          sender: 'ai',
          timestamp: Date.now()
        };
        addMessage(errorMessage);
      } else {
      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: response.message,
        sender: 'ai',
        timestamp: Date.now()
      };
      addMessage(aiMessage);
      }
    } catch (error: any) {
      // Only add fallback if not aborted
      if (error?.name !== 'AbortError') {
        console.error('❌ Error in handleSendMessage:', error);
        const fallbackMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'text',
          content: getFallbackResponse(textToSend),
          sender: 'ai',
          timestamp: Date.now()
        };
        addMessage(fallbackMessage);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePillClick = async (pillText: string) => {
    if (isLoading) return;
    
    // Cancel any pending API call
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    // Cycle pill to end for infinite loop
    setVisiblePills(prev => {
      const filtered = prev.filter(p => p !== pillText);
      return [...filtered, pillText];
    });
    
    // Add message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'text',
      content: pillText,
      sender: 'user',
      timestamp: Date.now()
    };
    
    addMessage(userMessage);
    setIsLoading(true);
    
    try {
      const response = await sendToAI(pillText, messages, AI_CONFIG.API_KEY);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: response.message,
        sender: 'ai',
        timestamp: Date.now()
      };
      
      addMessage(aiMessage);
    } catch (error: any) {
      // Only add fallback if not aborted
      if (error?.name !== 'AbortError') {
        const fallbackMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'text',
          content: getFallbackResponse(pillText),
          sender: 'ai',
          timestamp: Date.now()
        };
        addMessage(fallbackMessage);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  // Handle card drop into chat
  const handleCardDrop = async (cardId: string) => {
    const card = PROJECT_CARDS.find(c => c.id === cardId);
    if (!card || isLoading) return;

    // Hide the card
    setVisibleCards(prev => prev.filter(id => id !== cardId));
    setIsDraggingCard(null);
    setIsCardOverChat(false);

    // Cancel any pending API call
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    // Add user message with card thumbnail
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'card-with-question',
      content: card.message,
      card: {
        id: card.id,
        image: card.image,
        title: card.title
      },
      sender: 'user',
      timestamp: Date.now()
    };

    addMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await sendToAI(card.message, messages, AI_CONFIG.API_KEY);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: response.message,
        sender: 'ai',
        timestamp: Date.now()
      };

      addMessage(aiMessage);
    } catch (error: any) {
      if (error?.name !== 'AbortError') {
        const fallbackMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'text',
          content: getFallbackResponse(card.message),
          sender: 'ai',
          timestamp: Date.now()
        };
        addMessage(fallbackMessage);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  // Handle card click for mobile
  const handleCardClick = (cardId: string) => {
    if (isMobile) {
      // Simple: just handle drop immediately
      handleCardDrop(cardId);
      
      // Scroll to chatbox with offset to account for fixed header
      setTimeout(() => {
        if (chatCardRef.current) {
          const element = chatCardRef.current;
          const headerHeight = 80; // Mobile header blur height
          const yOffset = -headerHeight - 20; // Extra 20px padding
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Unified responsive component (no separate mobile component)
  return (
    <div className="relative w-full min-h-screen bg-[#D8D4E8] overflow-hidden">
      {/* Background Blurs - Hidden on mobile, visible on desktop (lg:) */}
      <div className="hidden lg:block absolute w-[1472px] h-[761px] -left-[227px] top-[281px] bg-[rgba(0,132,255,0.1)] rounded-[4444px] blur-[80px] pointer-events-none z-[-2]" />
      <div className="hidden lg:block absolute w-[1629px] h-[842px] right-[-300px] bottom-[-200px] bg-white rounded-[4444px] blur-[80px] pointer-events-none z-[-2]" />
      <div className="hidden lg:block absolute w-[800px] h-[600px] left-1/2 -translate-x-1/2 top-[350px] bg-white rounded-[4444px] blur-[100px] pointer-events-none z-[-1]" />

      {/* Navigation - Responsive */}
        <nav className="fixed left-0 right-0 top-0 z-50 w-full">
        {/* Mobile Header - visible on mobile, hidden on desktop */}
        <div className="flex md:hidden items-center justify-center h-full w-full p-3 gap-[200px]">
            {/* Logo - "raks" */}
          <div className="text-center text-white text-4xl font-medium break-words" style={{ fontFamily: 'Caveat, cursive, system-ui, sans-serif' }}>
              raks
          </div>

            {/* Social Icons (Mobile) */}
          <div className="flex items-center gap-4 opacity-44">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: '29px',
                  height: '29px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.9583 3.625C23.5993 3.625 24.214 3.87961 24.6672 4.33283C25.1204 4.78604 25.375 5.40073 25.375 6.04167V22.9583C25.375 23.5993 25.1204 24.214 24.6672 24.6672C24.214 25.1204 23.5993 25.375 22.9583 25.375H6.04167C5.40073 25.375 4.78604 25.1204 4.33283 24.6672C3.87961 24.214 3.625 23.5993 3.625 22.9583V6.04167C3.625 5.40073 3.87961 4.78604 4.33283 4.33283C4.78604 3.87961 5.40073 3.625 6.04167 3.625H22.9583ZM22.3542 22.3542V15.95C22.3542 14.9053 21.9391 13.9033 21.2004 13.1646C20.4617 12.4259 19.4597 12.0108 18.415 12.0108C17.3879 12.0108 16.1917 12.6392 15.6117 13.5817V12.2404H12.2404V22.3542H15.6117V16.3971C15.6117 15.4667 16.3608 14.7054 17.2913 14.7054C17.7399 14.7054 18.1702 14.8836 18.4874 15.2009C18.8047 15.5181 18.9829 15.9484 18.9829 16.3971V22.3542H22.3542ZM8.31333 10.3433C8.85172 10.3433 9.36806 10.1295 9.74876 9.74876C10.1295 9.36806 10.3433 8.85172 10.3433 8.31333C10.3433 7.18958 9.43708 6.27125 8.31333 6.27125C7.77174 6.27125 7.25233 6.4864 6.86936 6.86936C6.4864 7.25233 6.27125 7.77174 6.27125 8.31333C6.27125 9.43708 7.18958 10.3433 8.31333 10.3433ZM9.99292 22.3542V12.2404H6.64583V22.3542H9.99292Z" fill="var(--color-dark-900, #020617)" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                style={{
                  width: '24px',
                  height: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.5859 21.375L14.0885 10.4471L14.1013 10.4574L20.8613 2.625H18.6023L13.0954 9L8.72227 2.625H2.79766L9.79723 12.8276L9.79638 12.8267L2.41406 21.375H4.67309L10.7955 14.2824L15.6613 21.375H21.5859ZM7.82719 4.32954L18.3466 19.6705H16.5564L6.02852 4.32954H7.82719Z" fill="var(--color-dark-900, #020617)" />
                </svg>
              </a>
            </div>
          </div>

        {/* Desktop Navigation - hidden on mobile, visible on desktop (md:) */}
        <div className="hidden md:flex w-full px-20 py-2.5 bg-[rgba(255,255,255,0.01)] backdrop-blur-[11px] justify-between items-center">
            {/* Logo - "raks" */}
          <div className="text-center text-white text-4xl font-medium break-words" style={{ fontFamily: 'Neulis Cursive, cursive, serif' }}>
            raks
            </div>

            {/* Social Icons */}
          <div className="w-[73px] opacity-44 flex justify-between items-center">
              {/* LinkedIn Icon */}
              <a
                href="https://linkedin.com/in/raksha-t"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:opacity-100 transition-opacity"
                style={{
                  width: '29px',
                  height: '29px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.9583 3.625C23.5993 3.625 24.214 3.87961 24.6672 4.33283C25.1204 4.78604 25.375 5.40073 25.375 6.04167V22.9583C25.375 23.5993 25.1204 24.214 24.6672 24.6672C24.214 25.1204 23.5993 25.375 22.9583 25.375H6.04167C5.40073 25.375 4.78604 25.1204 4.33283 24.6672C3.87961 24.214 3.625 23.5993 3.625 22.9583V6.04167C3.625 5.40073 3.87961 4.78604 4.33283 4.33283C4.78604 3.87961 5.40073 3.625 6.04167 3.625H22.9583ZM22.3542 22.3542V15.95C22.3542 14.9053 21.9391 13.9033 21.2004 13.1646C20.4617 12.4259 19.4597 12.0108 18.415 12.0108C17.3879 12.0108 16.1917 12.6392 15.6117 13.5817V12.2404H12.2404V22.3542H15.6117V16.3971C15.6117 15.4667 16.3608 14.7054 17.2913 14.7054C17.7399 14.7054 18.1702 14.8836 18.4874 15.2009C18.8047 15.5181 18.9829 15.9484 18.9829 16.3971V22.3542H22.3542ZM8.31333 10.3433C8.85172 10.3433 9.36806 10.1295 9.74876 9.74876C10.1295 9.36806 10.3433 8.85172 10.3433 8.31333C10.3433 7.18958 9.43708 6.27125 8.31333 6.27125C7.77174 6.27125 7.25233 6.4864 6.86936 6.86936C6.4864 7.25233 6.27125 7.77174 6.27125 8.31333C6.27125 9.43708 7.18958 10.3433 8.31333 10.3433ZM9.99292 22.3542V12.2404H6.64583V22.3542H9.99292Z" fill="var(--color-dark-900, #020617)" />
                </svg>
              </a>

              {/* X (Twitter) Icon */}
              <a
                href="https://twitter.com/rakshatated"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:opacity-100 transition-opacity"
                style={{
                  width: '24px',
                  height: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.5859 21.375L14.0885 10.4471L14.1013 10.4574L20.8613 2.625H18.6023L13.0954 9L8.72227 2.625H2.79766L9.79723 12.8276L9.79638 12.8267L2.41406 21.375H4.67309L10.7955 14.2824L15.6613 21.375H21.5859ZM7.82719 4.32954L18.3466 19.6705H16.5564L6.02852 4.32954H7.82719Z" fill="var(--color-dark-900, #020617)" />
                </svg>
              </a>
            </div>
          </div>
        </nav>

      {/* Bottom Navigation Bar - Mobile Only (hidden on desktop) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 bg-[rgba(255,255,255,0.01)] backdrop-blur-[1px]">
        <div className="flex items-start justify-center gap-7 w-full">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeNav === item.id;
              const isCalendar = item.id === "calendar";
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isCalendar) {
                      setIsCalendarOpen(true);
                    } else {
                      setActiveNav(item.id);
                    }
                  }}
                  className="relative flex items-center justify-center transition-all duration-300"
                  style={{
                    flex: '1 1 0',
                    height: '60px',
                    padding: '18px',
                    background: isActive ? '#283FE4' : 'rgba(255, 255, 255, 0.64)',
                    boxShadow: isActive ? '1px 2px 4px rgba(0, 0, 0, 0.10)' : 'none',
                    overflow: 'hidden',
                    borderRadius: '4444px',
                    outline: isActive ? '1px white solid' : 'none',
                    position: 'relative'
                  }}
                  aria-label={item.label}
                >
                  {/* Glow effect for active chat icon */}
                  {isActive && index === 0 && (
                    <div 
                      style={{
                        width: '30px',
                        height: '25px',
                        left: 0,
                        top: '-2px',
                        position: 'absolute',
                        background: 'white',
                        boxShadow: '44px 44px 44px',
                        filter: 'blur(22px)'
                      }}
                    />
                  )}

                  {/* Chat Icon */}
                  {index === 0 && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="relative z-10">
                      <g clipPath="url(#clip0_371_216_mobile)">
                        <mask id="mask0_371_216_mobile" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                          <path d="M24 0H0V24H24V0Z" fill="white"/>
                          <path d="M22.75 14.4971C22.75 15.8083 22.3947 17.0325 21.7881 18.0918C21.4381 18.7473 22.0797 20.0133 22.5303 20.4648C22.7394 20.6742 22.8061 20.9874 22.7002 21.2637C22.5942 21.5399 22.3354 21.7282 22.04 21.7441C21.3651 21.7806 20.6264 21.6475 19.9893 21.4619C19.536 21.3299 19.098 21.1595 18.7354 20.9775C17.7323 21.4798 16.6207 21.7461 15.499 21.7461C11.4948 21.7459 8.2502 18.5019 8.25 14.5C8.25 10.498 11.4977 7.25 15.501 7.25C19.5037 7.25018 22.75 10.4949 22.75 14.4971Z" fill="black"/>
                        </mask>
                        <g mask="url(#mask0_371_216_mobile)">
                          <path d="M1 9.99348C1.00003 11.624 1.44063 13.1472 2.19626 14.4646C2.38601 14.9255 2.27792 15.4945 2.15636 15.9568C1.97097 16.6619 1.62172 17.3398 1.21379 17.7485C1.0104 17.9522 0.945503 18.2561 1.04846 18.525C1.1515 18.7939 1.40329 18.9771 1.69077 18.9927C2.51536 19.0372 3.42875 18.8742 4.22582 18.6419C4.83702 18.4638 5.42053 18.2318 5.88387 17.9889C7.15411 18.645 8.57122 18.9955 10.0009 18.9955C14.9719 18.9954 18.9997 14.9668 19 9.99728C19 5.05316 15.0118 1.04141 10.0779 1C5.1088 1.00007 1 5.02371 1 9.99348Z" fill="url(#paint0_linear_371_216_mobile)"/>
                        </g>
                        <path d="M22.75 14.4971C22.75 15.8083 22.3947 17.0325 21.7881 18.0918C21.4381 18.7473 22.0797 20.0133 22.5303 20.4648C22.7394 20.6742 22.8061 20.9874 22.7002 21.2637C22.5942 21.5399 22.3354 21.7282 22.04 21.7441C21.3651 21.7806 20.6264 21.6475 19.9893 21.4619C19.536 21.3299 19.098 21.1595 18.7354 20.9775C17.7323 21.4798 16.6207 21.7461 15.499 21.7461C11.4948 21.7459 8.2502 18.5019 8.25 14.5C8.25 10.498 11.4977 7.25 15.501 7.25C19.5037 7.25018 22.75 10.4949 22.75 14.4971Z" fill="url(#paint2_linear_371_216_mobile)"/>
                        <path d="M22 14.4971C22 11.0214 19.2686 8.18279 15.835 8.00879L15.501 8C11.9118 8 9 10.9122 9 14.5C9.0002 18.0874 11.9088 20.9959 15.499 20.9961V21.7461C11.4948 21.7459 8.2502 18.5019 8.25 14.5C8.25 10.498 11.4977 7.25 15.501 7.25C19.5037 7.25018 22.75 10.4949 22.75 14.4971C22.75 15.8083 22.3947 17.0325 21.7881 18.0918C21.4381 18.7473 22.0797 20.0133 22.5303 20.4648C22.7394 20.6742 22.8061 20.9874 22.7002 21.2637C22.5942 21.5399 22.3354 21.7282 22.04 21.7441C21.3651 21.7806 20.6264 21.6475 19.9893 21.4619C19.536 21.3299 19.098 21.1595 18.7354 20.9775C17.7323 21.4798 16.6207 21.7461 15.499 21.7461V20.9961C16.5025 20.9961 17.4992 20.7574 18.3994 20.3066C18.6109 20.2007 18.8599 20.2016 19.0713 20.3076C19.389 20.467 19.7847 20.6214 20.1992 20.7422C20.7163 20.8928 21.2777 20.9965 21.7852 21L22 20.9951C21.684 20.6784 21.3597 20.1509 21.1582 19.6211C21.0549 19.3495 20.9707 19.0451 20.9453 18.7373C20.9203 18.4343 20.9483 18.0728 21.127 17.7383L21.1377 17.7188C21.6146 16.886 21.9171 15.9424 21.9854 14.9336L22 14.4971Z" fill="url(#paint3_linear_371_216_mobile)"/>
                      </g>
                      <defs>
                        <linearGradient id="paint0_linear_371_216_mobile" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse">
                          <stop stopColor={isActive ? "white" : "#2B2B2B"}/>
                          <stop offset="1" stopColor={isActive ? "white" : "rgba(0, 0, 0, 0.34)"} stopOpacity={isActive ? "0.34" : "1"}/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_371_216_mobile" x1="15.5" y1="7.25" x2="15.5" y2="21.75" gradientUnits="userSpaceOnUse">
                          <stop stopColor={isActive ? "white" : "rgba(255, 255, 255, 0.78)"} stopOpacity={isActive ? "0.6" : "1"}/>
                          <stop offset="1" stopColor={isActive ? "white" : "rgba(0, 0, 0, 0.60)"} stopOpacity={isActive ? "0.6" : "1"}/>
                        </linearGradient>
                        <linearGradient id="paint3_linear_371_216_mobile" x1="15.5" y1="7.25" x2="15.5" y2="15.647" gradientUnits="userSpaceOnUse">
                          <stop stopColor={isActive ? "white" : "rgba(255, 255, 255, 0.66)"}/>
                          <stop offset="1" stopColor={isActive ? "white" : "rgba(255, 255, 255, 0)"} stopOpacity="0"/>
                        </linearGradient>
                        <clipPath id="clip0_371_216_mobile">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  )}

                  {/* Inbox Icon (simplified for mobile) */}
                  {index === 1 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.3989 14.9955L21.1412 7.04961C20.9136 5.61186 20.7999 4.89299 20.4453 4.35306C20.1327 3.87717 19.6912 3.50015 19.1724 3.26581C18.5837 3 17.8558 3 16.4002 3L7.60059 3C6.14502 3 5.4171 3 4.82842 3.26594C4.30957 3.5002 3.86807 3.87731 3.55548 4.35319C3.20094 4.89306 3.08721 5.61195 2.85962 7.04973L1.60205 14.9962C3.97778 16.0307 6.82488 18.0001 9.50027 18.0001L14.5003 18C17.1756 18 20.0231 16.0302 22.3989 14.9955Z" fill={isActive ? "rgba(255, 255, 255, 0.60)" : "#575757"} />
                      <path d="M17.1818 21C18.8751 21 19.7217 21 20.3979 20.7478C21.4849 20.3424 22.3424 19.4849 22.7478 18.3979C23 17.7217 23 16.8751 23 15.1818C23 14.5469 23 14.2294 22.9054 13.9758C22.7534 13.5682 22.4318 13.2466 22.0242 13.0946C21.7706 13 21.4531 13 20.8182 13H17.8563C17.5432 13 17.3867 13 17.2446 13.0432C17.1188 13.0814 17.0018 13.144 16.9002 13.2275C16.7855 13.3217 16.6987 13.452 16.525 13.7125L15.475 15.2875C15.3013 15.548 15.2145 15.6783 15.0998 15.7725C14.9982 15.856 14.8812 15.9186 14.7554 15.9568C14.6133 16 14.4568 16 14.1437 16H9.85632C9.54316 16 9.38667 16 9.24463 15.9568C9.11877 15.9186 9.00183 15.856 8.90015 15.7725C8.78546 15.6783 8.69873 15.548 8.52502 15.2875L7.47498 13.7125C7.30127 13.452 7.21454 13.3217 7.09985 13.2275C6.99817 13.144 6.88123 13.0814 6.75537 13.0432C6.61333 13 6.45684 13 6.14368 13H3.18182C2.54684 13 2.22944 13 1.97583 13.0946C1.56821 13.2466 1.24663 13.5682 1.09461 13.9758C1 14.2294 1 14.5469 1 15.1818C1 16.8751 1 17.7217 1.25219 18.3979C1.65762 19.4849 2.51508 20.3424 3.60213 20.7478C4.27827 21 5.12493 21 6.81818 21H17.1818Z" fill={isActive ? "rgba(227, 227, 229, 0.60)" : "rgba(227, 227, 229, 0.60)"} />
                    </svg>
                  )}

                  {/* Calendar Icon (simplified for mobile) */}
                  {index === 2 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.4775 15.4951C7.5821 15.4951 8.4775 16.3905 8.4775 17.4951C8.4775 18.5997 7.5821 19.4951 6.4775 19.4951C5.37293 19.4951 4.4775 18.5997 4.4775 17.4951C4.4775 16.3905 5.37293 15.4951 6.4775 15.4951ZM12 15.4951C13.1046 15.4951 14 16.3905 14 17.4951C14 18.5997 13.1046 19.4951 12 19.4951C10.8954 19.4951 10 18.5997 10 17.4951C10 16.3905 10.8954 15.4951 12 15.4951ZM17.5234 15.4951C18.6278 15.4954 19.5234 16.3907 19.5234 17.4951C19.5234 18.5995 18.6278 19.4949 17.5234 19.4951C16.4189 19.4951 15.5234 18.5997 15.5234 17.4951C15.5234 16.3905 16.4189 15.4951 17.5234 15.4951ZM17 1C17.5523 1 18 1.44772 18 2V3.04C18.7846 3.08784 19.3414 3.1935 19.8164 3.4355C20.5689 3.819 21.181 4.43108 21.5645 5.18359C22.0004 6.03924 22 7.16022 22 9.40039V11H18.8428C19.259 11.3665 19.5234 11.9018 19.5234 12.5C19.5234 13.6044 18.6278 14.4997 17.5234 14.5C16.4189 14.5 15.5234 13.6046 15.5234 12.5C15.5234 11.9018 15.7869 11.3665 16.2031 11H13.3193C13.7357 11.3665 14 11.9017 14 12.5C14 13.6046 13.1046 14.5 12 14.5C10.8954 14.5 10 13.6046 10 12.5C10 11.9017 10.2643 11.3665 10.6807 11H7.79688C8.21318 11.3665 8.4775 11.9017 8.4775 12.5C8.4775 13.6046 7.5821 14.5 6.4775 14.5C5.37293 14.5 4.4775 13.6046 4.4775 12.5C4.4775 11.9017 4.74182 11.3665 5.15816 11H2V9.40039C2 7.16022 1.99963 6.03924 2.43555 5.18359C2.819 4.43108 3.43108 3.819 4.18359 3.4355C4.65859 3.1935 5.21543 3.08784 6 3.04V2C6 1.44772 6.44772 1 7 1C7.55228 1 8 1.44772 8 2V3.001C8.12943 3.00092 8.26276 3 8.40039 3H11V2C11 1.44772 11.4477 1 12 1C12.5523 1 13 1.44772 13 2V3H15.5996C15.7372 3 15.8706 3.00092 16 3.001V2C16 1.44772 16.4477 1 17 1Z" fill={isActive ? "rgba(255, 255, 255, 0.60)" : "#575757"} />
                      <path d="M15.5996 7C17.8398 7 18.9608 6.99963 19.8164 7.4356C20.5689 7.819 21.181 8.43108 21.5645 9.18359C22.0004 10.0392 22 11.1602 22 13.4004V15.5996C22 17.8398 22.0004 18.9608 21.5645 19.8164C21.181 20.5689 20.5689 21.181 19.8164 21.5645C18.9608 22.0004 17.8398 22 15.5996 22H8.40039C6.16022 22 5.03924 22.0004 4.18359 21.5645C3.43108 21.181 2.819 20.5689 2.43555 19.8164C1.99963 18.9608 2 17.8398 2 15.5996V13.4004C2 11.1602 1.99963 10.0392 2.43555 9.18359C2.819 8.43108 3.43108 7.819 4.18359 7.4356C5.03924 6.99963 6.16022 7 8.40039 7H15.5996Z" fill={isActive ? "rgba(227, 227, 229, 0.60)" : "rgba(227, 227, 229, 0.60)"} />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      {/* Content Container - Responsive */}
      <div className="relative w-full p-6 md:p-11 mt-10 md:mt-[60px]">
          {/* Main Heading */}
          <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto text-left w-full max-w-full lg:max-w-[603.2px] mt-5 mb-5 lg:mt-10 lg:mb-10"
        >
          <div className="w-full">
            <span className="text-base md:text-xl lg:text-2xl font-bold break-words text-[rgba(41,41,41,0.88)] md:text-[#303034]" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
              Raksha T<br/><span className="hidden md:inline"><br/></span>
            </span>
            <span className="text-sm md:text-lg lg:text-xl font-light break-words text-[rgba(41,41,41,0.88)] md:text-[#303034]" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              aka raks - product designer who builds products that work, look good and sell<br/>
              i live in duality: lead design experiences at startups and also code frontend with cursor{' '}<br/>
              <span className="hidden md:inline"> </span>to find out more  →  
            </span>
            <a 
              href="https://cal.com/raksha-tated-v2ee58/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-lg lg:text-xl font-light underline break-words text-[rgba(41,41,41,0.88)] md:text-[#303034] hover:opacity-80 transition-opacity cursor-pointer" 
              style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
            >
              let's talk
            </a>
            <br/><br/>
            <span className="text-sm md:text-lg lg:text-xl font-light break-words text-[rgba(41,41,41,0.88)] md:text-[#303034]" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              chat with my portfolio below ↓ or explore projects{' '}
            </span>
            <button 
              className="text-sm md:text-lg lg:text-xl font-light underline break-words text-[rgba(41,41,41,0.88)] md:text-[#303034] hover:opacity-80 transition-opacity bg-none border-none p-0 cursor-pointer" 
              style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
              onClick={() => {/* TODO: navigate to projects */}}
            >
              here
            </button>
          </div>
          </motion.div>

        {/* Chat + Cards Container - Responsive sizing */}
        <div ref={cardsContainerRef} className="relative mx-auto w-full max-w-[348px] lg:max-w-[1040.8px] lg:w-[1040.8px] lg:h-[485.6px]">
          {/* Chat Interface Card */}
          <motion.div
            ref={chatCardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden w-full lg:absolute lg:z-20 lg:left-[203.2px] lg:top-[23.2px] lg:w-[603.2px] lg:h-[439.2px]"
            style={{
              background: 'linear-gradient(180deg, #E9E8FF 0%, #EFF4EC 100%)',
              boxShadow: '0px 30px 66px rgba(0, 0, 0, 0.04)',
              borderRadius: '44px',
              outline: '2px white solid',
              outlineOffset: '-2px',
              height: '483px'
            }}
          >
          {/* Drop Zone Overlay - Shows when dragging a card (desktop only) */}
          {isCardOverChat && (
            <div className="hidden lg:flex absolute inset-0 z-50 rounded-[44px] bg-blue-500/10 border-2 border-dashed border-blue-500 items-center justify-center pointer-events-none"
              style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              <p className="text-lg font-medium text-blue-600" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                Drop to ask about this project
              </p>
            </div>
          )}
          {/* Inner Background Blurs - Desktop only for performance */}
          <div className="hidden lg:block">
              <div className="absolute w-[421px] h-[336px] left-1/2 bottom-[-99px] -translate-x-1/2 translate-x-[236px] bg-[rgba(101,73,255,0.14)] rounded-[4444px] blur-[60px] pointer-events-none" />
              <div className="absolute w-[605px] h-[313px] left-1/2 bottom-[267px] -translate-x-1/2 -translate-x-[172px] bg-gradient-to-r from-[rgba(255,255,255,0.88)] to-[rgba(255,255,255,0.1936)] rounded-[4444px] blur-[60px] pointer-events-none" />
          </div>

          <div className="relative h-full flex flex-col items-center">
            {/* Top Transparent Blur Overlay */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-[560px] top-0 h-[40px] pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))'
              }}
            />
            
            {/* Chat Messages Container - Scrollable */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-8 flex flex-col w-[304px] h-[320px] lg:w-[560px]"
            >
              <div 
                ref={chatContainerRef}
                className="overflow-y-auto flex flex-col gap-3 pr-3 custom-scrollbar flex-1 pb-4 lg:pb-20"
                style={{ 
                  scrollPaddingBottom: '20px'
                }}
              >
              {/* Initial Welcome Message - Always show */}
              <div className="w-full flex-shrink-0 mb-2">
                <div className="flex items-start gap-3 max-w-[560px]">
                  <div className="relative w-[48px] h-[48px] flex-shrink-0 rounded-full overflow-hidden bg-[#D9D9D9]">
                    <img
                      src="https://storage.googleapis.com/storage.magicpath.ai/user/323295203727400960/assets/a162f3c9-9017-4e52-a2b7-d48614b32b0f.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="px-[18px] py-[14px] bg-white text-black flex-1"
                    style={{
                      borderRadius: '30px 30px 30px 0px',
                      filter: 'drop-shadow(0 15px 34px rgba(40, 63, 228, 0.04)) drop-shadow(0 62px 62px rgba(40, 63, 228, 0.03)) drop-shadow(0 139px 84px rgba(40, 63, 228, 0.02)) drop-shadow(0 248px 99px rgba(40, 63, 228, 0.01)) drop-shadow(0 387px 108px rgba(40, 63, 228, 0.00))'
                    }}
                  >
                    <p className="text-[14px] leading-[21px] font-extralight" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                      you can ask me here about my design process, my past projects or just get to know me better!
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Messages - Memoized for performance */}
              {messages.map((msg) => (
                <div key={msg.id} className={`w-full flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <MessageBubble msg={msg} />
                </div>
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="w-full flex justify-start">
                  <div className="flex items-start gap-3 max-w-[560px]">
                    <div className="relative w-[48px] h-[48px] flex-shrink-0 rounded-full overflow-hidden bg-[#D9D9D9]">
                      <img
                        src="https://storage.googleapis.com/storage.magicpath.ai/user/323295203727400960/assets/a162f3c9-9017-4e52-a2b7-d48614b32b0f.jpg"
                        alt="Profile"
                        className="absolute w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="px-[22px] py-[20px] bg-white text-black"
                      style={{
                        borderRadius: '30px 30px 30px 0px',
                        boxShadow: '0 4px 12px rgba(40, 63, 228, 0.08)'
                      }}
                    >
                      <p className="text-[14px] leading-[21px] font-extralight" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                        ...
              </p>
            </div>
                  </div>
                </div>
              )}
        </div>
      </div>

            {/* Bottom Section - Input + Suggestions */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center w-[304px] bottom-3 gap-2 md:w-[560px] md:bottom-10 md:gap-3">
              {/* Input Bar with Backdrop Blur */}
              <div
                className="w-full h-[56px] flex items-center justify-center px-[22px] py-[4px] rounded-[100px] border border-white/40 backdrop-blur-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0px 297px 119px rgba(0, 0, 0, 0.01), 0px 167px 100px rgba(0, 0, 0, 0.02), 0px 74px 74px rgba(0, 0, 0, 0.03), 0px 19px 41px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="w-full flex items-center justify-between gap-3">
                  {/* Left: Sparkle Icon + Input */}
                  <div className="flex items-center gap-3 flex-1" style={{ alignItems: 'center' }}>
                    {/* Sparkle Icon SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clipPath="url(#clip0_371_175)">
                        <mask id="mask0_371_175" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                          <path d="M24 0H0V24H24V0Z" fill="white"/>
                          <path d="M16.6562 9.21214L14.3939 3.51184C13.893 2.24975 12.1067 2.24959 11.6056 3.5116L9.34196 9.21214C9.31836 9.27141 9.27155 9.31822 9.21228 9.34182L3.51087 11.6058C2.24898 12.1069 2.24898 13.8929 3.51087 14.394L9.21228 16.658C9.27155 16.6816 9.31836 16.7284 9.34196 16.7876L11.6055 22.4882C12.1067 23.7502 13.8929 23.75 14.3939 22.4879L16.6562 16.7876C16.6799 16.7282 16.7273 16.6815 16.7868 16.658L22.4888 14.394C23.7507 13.893 23.7507 12.1068 22.4888 11.6058L16.7868 9.34182C16.7273 9.31828 16.6799 9.27161 16.6562 9.21214Z" fill="black"/>
                        </mask>
                        <g mask="url(#mask0_371_175)">
                          <path d="M13.0001 9.00529C13.5523 9.00529 14 9.45306 14.0001 10.0053V12.0053H16.0001C16.5523 12.0053 17 12.4531 17.0001 13.0053C16.9999 13.5574 16.5522 14.0053 16.0001 14.0053H14.0001V16.0053C13.9999 16.5574 13.5522 17.0053 13.0001 17.0053C12.448 17.0053 12.0003 16.5574 12.0001 16.0053V14.0053H10.0001C9.448 14.0053 9.00034 13.5574 9.00009 13.0053C9.00016 12.4531 9.44789 12.0054 10.0001 12.0053H12.0001V10.0053C12.0002 9.45309 12.4479 9.00534 13.0001 9.00529ZM6.0704 1.34123C6.40449 0.499893 7.59584 0.499834 7.92978 1.34123L9.25009 4.66935C9.26462 4.70569 9.29382 4.73394 9.33017 4.74845L12.6593 6.07072C13.5006 6.40475 13.5006 7.59507 12.6593 7.92912L9.33017 9.25138C9.29383 9.26588 9.26463 9.29417 9.25009 9.33049L7.92978 12.6586C7.59584 13.5 6.40449 13.5 6.0704 12.6586L4.74911 9.33049C4.73455 9.29416 4.7054 9.26586 4.66904 9.25138L1.34091 7.92912C0.499646 7.59507 0.499646 6.40477 1.34091 6.07072L4.66904 4.74845C4.70542 4.73397 4.73456 4.7057 4.74911 4.66935L6.0704 1.34123Z" fill="url(#paint0_linear_371_175)"/>
                        </g>
                        <mask id="mask1_371_175" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="2" y="2" width="22" height="22">
                          <path d="M16.6562 9.21214L14.3939 3.51184C13.893 2.24975 12.1067 2.24959 11.6056 3.5116L9.34196 9.21214C9.31836 9.27141 9.27155 9.31822 9.21228 9.34182L3.51087 11.6058C2.24898 12.1069 2.24898 13.8929 3.51087 14.394L9.21228 16.658C9.27155 16.6816 9.31836 16.7284 9.34196 16.7876L11.6055 22.4882C12.1067 23.7502 13.8929 23.75 14.3939 22.4879L16.6562 16.7876C16.6799 16.7282 16.7273 16.6815 16.7868 16.658L22.4888 14.394C23.7507 13.893 23.7507 12.1068 22.4888 11.6058L16.7868 9.34182C16.7273 9.31828 16.6799 9.27161 16.6562 9.21214Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask1_371_175)">
                          <g filter="url(#filter0_f_371_175)">
                            <path d="M13.0001 9.00529C13.5523 9.00529 14 9.45306 14.0001 10.0053V12.0053H16.0001C16.5523 12.0053 17 12.4531 17.0001 13.0053C16.9999 13.5574 16.5522 14.0053 16.0001 14.0053H14.0001V16.0053C13.9999 16.5574 13.5522 17.0053 13.0001 17.0053C12.448 17.0053 12.0003 16.5574 12.0001 16.0053V14.0053H10.0001C9.448 14.0053 9.00034 13.5574 9.00009 13.0053C9.00016 12.4531 9.44789 12.0054 10.0001 12.0053H12.0001V10.0053C12.0002 9.45309 12.4479 9.00534 13.0001 9.00529ZM6.0704 1.34123C6.40449 0.499893 7.59584 0.499834 7.92978 1.34123L9.25009 4.66935C9.26462 4.70569 9.29382 4.73394 9.33017 4.74845L12.6593 6.07072C13.5006 6.40475 13.5006 7.59507 12.6593 7.92912L9.33017 9.25138C9.29383 9.26588 9.26463 9.29417 9.25009 9.33049L7.92978 12.6586C7.59584 13.5 6.40449 13.5 6.0704 12.6586L4.74911 9.33049C4.73455 9.29416 4.7054 9.26586 4.66904 9.25138L1.34091 7.92912C0.499646 7.59507 0.499646 6.40477 1.34091 6.07072L4.66904 4.74845C4.70542 4.73397 4.73456 4.7057 4.74911 4.66935L6.0704 1.34123Z" fill="url(#paint1_linear_371_175)"/>
                          </g>
                        </g>
                        <path d="M16.6562 9.21214L14.3939 3.51184C13.893 2.24975 12.1067 2.24959 11.6056 3.5116L9.34196 9.21214C9.31836 9.27141 9.27155 9.31822 9.21228 9.34182L3.51087 11.6058C2.24898 12.1069 2.24898 13.8929 3.51087 14.394L9.21228 16.658C9.27155 16.6816 9.31836 16.7284 9.34196 16.7876L11.6055 22.4882C12.1067 23.7502 13.8929 23.75 14.3939 22.4879L16.6562 16.7876C16.6799 16.7282 16.7273 16.6815 16.7868 16.658L22.4888 14.394C23.7507 13.893 23.7507 12.1068 22.4888 11.6058L16.7868 9.34182C16.7273 9.31828 16.6799 9.27161 16.6562 9.21214Z" fill="url(#paint2_linear_371_175)"/>
                        <path d="M11.6056 3.5118C12.1066 2.24991 13.8926 2.25003 14.3936 3.5118L16.6563 9.212C16.68 9.27147 16.7277 9.31834 16.7872 9.34188L22.4884 11.6056C23.7503 12.1066 23.7503 13.8936 22.4884 14.3947L16.7872 16.6583L16.7452 16.6798C16.7054 16.7057 16.6741 16.7434 16.6563 16.7882L14.3936 22.4884L14.3429 22.6027C13.8002 23.7119 12.1989 23.7121 11.6563 22.6027L11.6056 22.4884L9.34192 16.7882C9.31833 16.7289 9.2713 16.6819 9.21204 16.6583L3.51087 14.3947C2.24898 13.8936 2.24898 12.1067 3.51087 11.6056L9.21204 9.34188C9.2713 9.31828 9.31833 9.27126 9.34192 9.212L11.6056 3.5118ZM13.6974 3.78915C13.447 3.15823 12.5536 3.15757 12.3028 3.78817L10.0391 9.48934C9.9518 9.70881 9.78861 9.88887 9.58118 9.99715L9.48938 10.0392L3.78821 12.3029C3.15726 12.5534 3.15727 13.4468 3.78821 13.6974L9.48938 15.9611C9.70885 16.0484 9.88891 16.2116 9.99719 16.4191L10.0391 16.5109L12.3028 22.212C12.5536 22.8426 13.446 22.842 13.6964 22.2111L15.9591 16.5109L16.002 16.4181C16.1119 16.2084 16.2932 16.0471 16.5099 15.9611L22.212 13.6974C22.843 13.4469 22.843 12.5534 22.212 12.3029L16.5099 10.0392C16.2933 9.95312 16.1118 9.79173 16.002 9.58211L15.9591 9.48934L13.6974 3.78915Z" fill="url(#paint3_linear_371_175)"/>
                      </g>
                      <defs>
                        <filter id="filter0_f_371_175" x="-3.29004" y="-3.28979" width="24.29" height="24.2952" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                          <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_371_175"/>
                        </filter>
                        <linearGradient id="paint0_linear_371_175" x1="8.85509" y1="0.709981" x2="8.85509" y2="13.5" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#283FE4" stopOpacity="0.38"/>
                          <stop offset="1" stopColor="white" stopOpacity="0.38"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_371_175" x1="8.85509" y1="0.709981" x2="8.85509" y2="13.5" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#283FE4" stopOpacity="0.38"/>
                          <stop offset="1" stopColor="white" stopOpacity="0.38"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_371_175" x1="13.1508" y1="25.999" x2="12.8493" y2="0.000757185" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#283FE4" stopOpacity="0.38"/>
                          <stop offset="1" stopColor="white" stopOpacity="0.6"/>
                        </linearGradient>
                        <linearGradient id="paint3_linear_371_175" x1="12.9992" y1="2.56506" x2="12.9992" y2="13.5001" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white"/>
                          <stop offset="1" stopColor="white" stopOpacity="0"/>
                        </linearGradient>
                        <clipPath id="clip0_371_175">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>

                    <div 
                      className="relative flex-1 min-w-0 h-[24px] flex items-center"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        defaultValue=""
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="w-full h-full bg-transparent border-none outline-none font-normal text-black disabled:opacity-50"
                        style={{ 
                          fontFamily: 'Outfit, system-ui, sans-serif',
                          fontSize: '16px',
                          lineHeight: '24px',
                          padding: 0
                        }}
                      />
                      {!inputValue && (
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-start whitespace-nowrap">
                          <span
                            className="text-[14px] font-normal text-black/[0.44] whitespace-nowrap"
                            style={{ 
                              fontFamily: 'Outfit, system-ui, sans-serif',
                              lineHeight: '24px',
                              display: 'inline-block'
                            }}
                          >
                            talk 2 me
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Send Button */}
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputValue.trim()}
                    className="w-[44px] h-[44px] bg-white rounded-[3333px] flex items-center justify-center hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      boxShadow: '-17px 20px 10px rgba(40, 63, 228, 0.01), -10px 11px 9px rgba(40, 63, 228, 0.02), -4px 5px 7px rgba(40, 63, 228, 0.03), -1px 1px 4px rgba(40, 63, 228, 0.04)'
                    }}
                    aria-label="Send message"
                  >
                    <ArrowUp className="w-[20px] h-[20px] text-[#283FE4]" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Suggestion Pills - Static (no animations) */}
              <div className="w-full overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex items-center gap-3">
                  {visiblePills.map((suggestion, index) => {
                    return (
                      <button 
                        key={`${suggestion}-${index}`}
                        onClick={() => handlePillClick(suggestion)}
                        disabled={isLoading}
                        className="relative px-5 py-2 h-[37px] rounded-full flex items-center justify-center disabled:cursor-not-allowed cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
                        style={{
                          background: 'rgba(255, 255, 255, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        <span
                          className="text-[13px] leading-[20px] font-normal text-black/[0.64] whitespace-nowrap text-center"
                          style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
                        >
                          {suggestion}
        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            </div>
          </motion.div>

          {/* Project Cards - Desktop: Draggable around chat, Mobile/iPad Air: Stacked below chat with click */}
          {/* Desktop Draggable Cards - Hidden on mobile/iPad Air, visible on desktop (lg: 1024px+) */}
          <div className="hidden lg:block">
            <AnimatePresence>
              {PROJECT_CARDS.map((card) => {
                if (!visibleCards.includes(card.id)) return null;
                
                return (
                  <motion.div
                    key={card.id}
                    drag
                    dragMomentum={false}
                    dragElastic={0.1}
                    dragConstraints={false}
                    onDragStart={() => {
                      setIsDraggingCard(card.id);
                    }}
                    onDrag={(event, info) => {
                      // Check if card is over chat area using cursor position
                      if (chatCardRef.current) {
                        const chatRect = chatCardRef.current.getBoundingClientRect();
                        const cursorX = info.point.x;
                        const cursorY = info.point.y;
                        
                        // Check if cursor is inside chat area
                        const isOver = 
                          cursorX >= chatRect.left &&
                          cursorX <= chatRect.right &&
                          cursorY >= chatRect.top &&
                          cursorY <= chatRect.bottom;
                        
                        setIsCardOverChat(isOver);
                      }
                    }}
                    onDragEnd={(event, info) => {
                      // Check if dropped over chat - use cursor position for reliability
                      if (chatCardRef.current) {
                        const chatRect = chatCardRef.current.getBoundingClientRect();
                        const cursorX = info.point.x;
                        const cursorY = info.point.y;
                        
                        // Check if cursor is inside chat area when dropped
                        const isDroppedOnChat = 
                          cursorX >= chatRect.left &&
                          cursorX <= chatRect.right &&
                          cursorY >= chatRect.top &&
                          cursorY <= chatRect.bottom;
                        
                        if (isDroppedOnChat) {
                          handleCardDrop(card.id);
                        } else {
                          setIsDraggingCard(null);
                          setIsCardOverChat(false);
                        }
                      } else {
                        setIsDraggingCard(null);
                        setIsCardOverChat(false);
                      }
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
          opacity: 1,
                      scale: 1,
                      rotate: card.rotation
                    }}
                    exit={{ 
          opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.3 }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                      transition: { duration: 0.2 }
                    }}
                    whileDrag={{ 
                      scale: 1.1, 
                      rotate: 0,
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                      cursor: 'grabbing'
                    }}
                    transition={{ delay: 0.4 + PROJECT_CARDS.findIndex(c => c.id === card.id) * 0.1 }}
                    className="absolute w-[263px] h-[266px] rounded-[44px] border border-white cursor-grab"
                    style={{
                      ...card.position,
                      background: 'rgba(255, 255, 255, 0.30)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      zIndex: isDraggingCard === card.id ? 100 : 10,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                  {/* Card Title - Clean text at top */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      padding: '20px 24px',
                      zIndex: 10
                    }}
                  >
                    <div
                      style={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: '14px',
                        fontFamily: 'Nexa, system-ui, sans-serif',
                        fontWeight: '400',
                        wordWrap: 'break-word'
                      }}
                    >
                      {card.title}
              </div>
                  </div>
                  
                  {/* Card Image - Fills bottom portion */}
                  <div
                    style={{
                      width: '100%',
                      height: 'calc(100% - 60px)',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      borderRadius: '20px 20px 44px 44px',
                      overflow: 'hidden'
                    }}
                  >
                    <img 
                      src={card.image} 
                      alt={card.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                      className="pointer-events-none"
                      draggable={false}
                    />
            </div>
          </motion.div>
              );
            })}
          </AnimatePresence>
          </div>

          {/* Mobile/iPad Air Click Cards - Stacked vertically - Visible on mobile/iPad Air, hidden on desktop */}
          <div className="lg:hidden flex flex-col gap-6 mt-8 items-center">
              <AnimatePresence>
                {PROJECT_CARDS.map((card, index) => {
                  if (!visibleCards.includes(card.id)) return null;
                  
                  const alternateRotation = index % 2 === 0 ? -15 : 15;
                  
                  return (
                    <motion.div
                      key={card.id}
                      onClick={() => handleCardClick(card.id)}
                      initial={false}
                      animate={{ rotate: alternateRotation }}
                      transition={{ duration: 0 }}
                    className="w-[263px] h-[266px] rounded-[44px] border border-white cursor-pointer relative"
                      style={{
                        background: 'rgba(255, 255, 255, 0.30)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {/* Card Title */}
                      <div 
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          padding: '20px 24px',
                          zIndex: 10
                        }}
                      >
                        <p 
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontSize: '14px',
                            fontFamily: 'Nexa, system-ui, sans-serif',
                            fontWeight: '400',
                            wordWrap: 'break-word'
                          }}
                        >
                          {card.title}
              </p>
            </div>

                      {/* Card Image */}
                      <div 
                        style={{
                          width: '100%',
                          height: 'calc(100% - 60px)',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          borderRadius: '20px 20px 44px 44px',
                          overflow: 'hidden'
                        }}
                      >
                        <img 
                          src={card.image} 
                          alt={card.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                          }}
                          draggable={false}
                        />
            </div>
          </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
        </div>
      </div>

      {/* Book A Call Button */}
      <div className="flex justify-center w-full mb-8 mt-[92px]">
        <div
          onClick={() => setIsCalendarOpen(true)}
          className={`book-call-button ${isButtonHovered ? 'is-hovered' : ''} cursor-pointer block w-[calc(100%-32px)] md:w-[410px] relative overflow-visible`}
        >
          {/* Hover detection overlay - exactly matches button rectangle */}
          <div
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            style={{
              position: 'absolute',
              top: '5.81%', // (10 / 172) * 100
              left: '11.34%', // (46.5 / 410) * 100 - centered rectangle
              width: '77.32%', // (317 / 410) * 100
              height: '36.05%', // (62 / 172) * 100
              zIndex: 10,
              cursor: 'pointer'
            }}
          />
          <svg width="410" height="172" viewBox="0 0 410 172" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}>
            <g filter="url(#filter0_ddddiiii_463_365)">
              <g clipPath="url(#clip0_463_365)">
                <rect x="46.5" y="10" width="317" height="62" rx="16" fill="#2D44E5" style={{ pointerEvents: 'auto' }}/>
                <g filter="url(#filter1_f_463_365)">
                  <rect x="58.5" y="-15" width="50" height="50" fill="#D9D9D9"/>
                </g>
                <g filter="url(#filter2_f_463_365)">
                  <rect x="58.5" y="-15" width="50" height="50" fill="#D9D9D9"/>
                </g>
                <g filter="url(#filter3_f_463_365)">
                  <rect x="310.5" y="55" width="118" height="30" fill="#D9D9D9"/>
                </g>
                <g filter="url(#filter4_f_463_365)">
                  <rect x="233.5" y="19" width="183" height="56" fill="#10229F"/>
                </g>
                <g filter="url(#filter5_f_463_365)">
                  <rect x="355.5" y="19" width="61" height="56" fill="#2032B9"/>
                </g>
                <g filter="url(#filter6_f_463_365)">
                  <rect x="355.5" y="19" width="61" height="56" fill="#2032B9"/>
                </g>
                <g filter="url(#filter7_f_463_365)">
                  <rect x="355.5" y="19" width="61" height="56" fill="#2032B9"/>
                </g>
                <g filter="url(#filter8_f_463_365)">
                  <rect x="355.5" y="19" width="61" height="56" fill="#2032B9"/>
                </g>
                <g filter="url(#filter9_f_463_365)">
                  <rect x="47.5" y="62" width="394" height="8" fill="#001295"/>
                </g>
                <path d="M162.29 48V46.2H165.908C166.544 46.2 167.036 46.002 167.384 45.606C167.732 45.21 167.906 44.754 167.906 44.238C167.906 43.89 167.828 43.566 167.672 43.266C167.516 42.966 167.288 42.726 166.988 42.546C166.688 42.366 166.328 42.276 165.908 42.276H162.29V40.476H165.602C166.142 40.476 166.574 40.338 166.898 40.062C167.222 39.786 167.384 39.378 167.384 38.838C167.384 38.298 167.222 37.89 166.898 37.614C166.574 37.338 166.142 37.2 165.602 37.2H162.29V35.4H165.656C166.508 35.4 167.216 35.556 167.78 35.868C168.344 36.18 168.764 36.582 169.04 37.074C169.316 37.566 169.454 38.094 169.454 38.658C169.454 39.318 169.268 39.9 168.896 40.404C168.536 40.908 168.002 41.316 167.294 41.628L167.456 40.98C168.248 41.304 168.866 41.76 169.31 42.348C169.754 42.936 169.976 43.626 169.976 44.418C169.976 45.066 169.814 45.66 169.49 46.2C169.178 46.74 168.71 47.178 168.086 47.514C167.474 47.838 166.718 48 165.818 48H162.29ZM160.868 48V35.4H162.938V48H160.868ZM175.755 48.18C174.915 48.18 174.153 47.982 173.469 47.586C172.785 47.178 172.239 46.632 171.831 45.948C171.435 45.264 171.237 44.502 171.237 43.662C171.237 42.822 171.435 42.066 171.831 41.394C172.239 40.722 172.785 40.188 173.469 39.792C174.153 39.384 174.915 39.18 175.755 39.18C176.607 39.18 177.375 39.378 178.059 39.774C178.743 40.17 179.283 40.71 179.679 41.394C180.087 42.066 180.291 42.822 180.291 43.662C180.291 44.502 180.087 45.264 179.679 45.948C179.283 46.632 178.743 47.178 178.059 47.586C177.375 47.982 176.607 48.18 175.755 48.18ZM175.755 46.272C176.247 46.272 176.679 46.164 177.051 45.948C177.435 45.72 177.729 45.408 177.933 45.012C178.149 44.616 178.257 44.166 178.257 43.662C178.257 43.158 178.149 42.714 177.933 42.33C177.717 41.946 177.423 41.646 177.051 41.43C176.679 41.202 176.247 41.088 175.755 41.088C175.275 41.088 174.843 41.202 174.459 41.43C174.087 41.646 173.793 41.946 173.577 42.33C173.373 42.714 173.271 43.158 173.271 43.662C173.271 44.166 173.373 44.616 173.577 45.012C173.793 45.408 174.087 45.72 174.459 45.948C174.843 46.164 175.275 46.272 175.755 46.272ZM185.898 48.18C185.058 48.18 184.296 47.982 183.612 47.586C182.928 47.178 182.382 46.632 181.974 45.948C181.578 45.264 181.38 44.502 181.38 43.662C181.38 42.822 181.578 42.066 181.974 41.394C182.382 40.722 182.928 40.188 183.612 39.792C184.296 39.384 185.058 39.18 185.898 39.18C186.75 39.18 187.518 39.378 188.202 39.774C188.886 40.17 189.426 40.71 189.822 41.394C190.23 42.066 190.434 42.822 190.434 43.662C190.434 44.502 190.23 45.264 189.822 45.948C189.426 46.632 188.886 47.178 188.202 47.586C187.518 47.982 186.75 48.18 185.898 48.18ZM185.898 46.272C186.39 46.272 186.822 46.164 187.194 45.948C187.578 45.72 187.872 45.408 188.076 45.012C188.292 44.616 188.4 44.166 188.4 43.662C188.4 43.158 188.292 42.714 188.076 42.33C187.86 41.946 187.566 41.646 187.194 41.43C186.822 41.202 186.39 41.088 185.898 41.088C185.418 41.088 184.986 41.202 184.602 41.43C184.23 41.646 183.936 41.946 183.72 42.33C183.516 42.714 183.414 43.158 183.414 43.662C183.414 44.166 183.516 44.616 183.72 45.012C183.936 45.408 184.23 45.72 184.602 45.948C184.986 46.164 185.418 46.272 185.898 46.272ZM197.57 48L193.916 43.59L197.552 39.36H199.91L195.734 44.112L195.824 42.978L200.09 48H197.57ZM192.08 48V35.04H194.06V48H192.08ZM203.702 48L208.886 35.4H210.326L215.474 48H213.242L209.21 37.794H209.966L205.898 48H203.702ZM206.258 45.57V43.77H212.936V45.57H206.258ZM226.094 48.18C225.182 48.18 224.336 48.018 223.556 47.694C222.788 47.358 222.116 46.896 221.54 46.308C220.964 45.708 220.52 45.018 220.208 44.238C219.896 43.446 219.74 42.6 219.74 41.7C219.74 40.8 219.896 39.96 220.208 39.18C220.52 38.388 220.964 37.698 221.54 37.11C222.116 36.522 222.788 36.06 223.556 35.724C224.336 35.388 225.182 35.22 226.094 35.22C227.114 35.22 227.996 35.388 228.74 35.724C229.484 36.06 230.144 36.516 230.72 37.092L229.316 38.496C228.944 38.088 228.488 37.77 227.948 37.542C227.42 37.314 226.802 37.2 226.094 37.2C225.47 37.2 224.9 37.308 224.384 37.524C223.868 37.74 223.418 38.052 223.034 38.46C222.662 38.856 222.374 39.33 222.17 39.882C221.966 40.434 221.864 41.04 221.864 41.7C221.864 42.36 221.966 42.966 222.17 43.518C221.874 44.07 222.662 44.55 223.034 44.958C223.418 45.354 223.868 45.66 224.384 45.876C224.9 46.092 225.47 46.2 226.094 46.2C226.862 46.2 227.51 46.086 228.038 45.858C228.578 45.618 229.034 45.294 229.406 44.886L230.81 46.29C230.234 46.878 229.556 47.34 228.776 47.676C227.996 48.012 227.102 48.18 226.094 48.18ZM235.759 48.18C234.979 48.18 234.271 47.982 233.635 47.586C233.011 47.19 232.513 46.656 232.141 45.984C231.781 45.3 231.601 44.538 231.601 43.698C231.601 42.846 231.781 42.084 232.141 41.412C232.513 40.728 233.011 40.188 233.635 39.792C234.271 39.384 234.979 39.18 235.759 39.18C236.419 39.18 237.001 39.324 237.505 39.612C238.021 39.888 238.429 40.272 238.729 40.764C239.029 41.256 239.179 41.814 239.179 42.438V44.922C239.179 45.546 239.029 46.104 238.729 46.596C238.441 47.088 238.039 47.478 237.523 47.766C237.007 48.042 236.419 48.18 235.759 48.18ZM236.083 46.308C236.815 46.308 237.403 46.062 237.847 45.57C238.303 45.078 238.531 44.448 238.531 43.68C238.531 43.164 238.429 42.708 238.225 42.312C238.021 41.916 237.733 41.61 237.361 41.394C237.001 41.166 236.575 41.052 236.083 41.052C235.603 41.052 235.177 41.166 234.805 41.394C234.445 41.61 234.157 41.916 233.941 42.312C233.737 42.708 233.635 43.164 233.635 43.68C233.635 44.196 233.737 44.652 233.941 45.048C234.157 45.444 234.445 45.756 234.805 45.984C235.177 46.2 235.603 46.308 236.083 46.308ZM238.405 48V45.678L238.747 43.572L238.405 41.484V39.36H240.385V48H238.405ZM242.582 48V35.04H244.562V48H242.582ZM246.766 48V35.04H248.746V48H246.766Z" fill="white"/>
              </g>
              <rect x="45" y="8.5" width="320" height="65" rx="17.5" stroke="url(#paint0_linear_463_365)" strokeWidth="3"/>
            </g>
            <defs>
              <filter id="filter0_ddddiiii_463_365" x="0" y="-1" width="410" height="173" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="3" dy="4"/>
                <feGaussianBlur stdDeviation="5.5"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.403922 0 0 0 0 0.462745 0 0 0 0 0.882353 0 0 0 0.22 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_463_365"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="11" dy="16"/>
                <feGaussianBlur stdDeviation="10"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.403922 0 0 0 0 0.462745 0 0 0 0 0.882353 0 0 0 0.19 0"/>
                <feBlend mode="normal" in2="effect1_dropShadow_463_365" result="effect2_dropShadow_463_365"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="26" dy="37"/>
                <feGaussianBlur stdDeviation="13.5"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.403922 0 0 0 0 0.462745 0 0 0 0 0.882353 0 0 0 0.11 0"/>
                <feBlend mode="normal" in2="effect2_dropShadow_463_365" result="effect3_dropShadow_463_365"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="46" dy="65"/>
                <feGaussianBlur stdDeviation="16"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.403922 0 0 0 0 0.462745 0 0 0 0 0.882353 0 0 0 0.03 0"/>
                <feBlend mode="normal" in2="effect3_dropShadow_463_365" result="effect4_dropShadow_463_365"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_463_365" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="-4" dy="-4"/>
                <feGaussianBlur stdDeviation="6"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect5_innerShadow_463_365"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="4" dy="4"/>
                <feGaussianBlur stdDeviation="6"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="effect5_innerShadow_463_365" result="effect6_innerShadow_463_365"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="-8" dy="-8"/>
                <feGaussianBlur stdDeviation="6"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0"/>
                <feBlend mode="normal" in2="effect6_innerShadow_463_365" result="effect7_innerShadow_463_365"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="4" dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                <feBlend mode="normal" in2="effect7_innerShadow_463_365" result="effect8_innerShadow_463_365"/>
              </filter>
              <filter id="filter1_f_463_365" x="-76" y="-115" width="250" height="250" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_463_365"/>
              </filter>
              <filter id="filter2_f_463_365" x="-76" y="-115" width="250" height="250" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_463_365"/>
              </filter>
              <filter id="filter3_f_463_365" x="176" y="-45" width="318" height="230" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_463_365"/>
              </filter>
              <filter id="filter4_f_463_365" x="99" y="-81" width="383" height="256" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_463_365"/>
              </filter>
              <filter id="filter5_f_463_365" x="221" y="-81" width="261" height="256" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_463_365"/>
              </filter>
              <filter id="filter6_f_463_365" x="221" y="-81" width="261" height="256" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_463_365"/>
              </filter>
              <filter id="filter7_f_463_365" x="221" y="-81" width="261" height="256" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_463_365"/>
              </filter>
              <filter id="filter8_f_463_365" x="221" y="-81" width="261" height="256" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_463_365"/>
              </filter>
              <filter id="filter9_f_463_365" x="-9" y="40" width="438" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="11" result="effect1_foregroundBlur_463_365"/>
              </filter>
              <linearGradient id="paint0_linear_463_365" x1="46.5" y1="0" x2="363.5" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#95A2FF"/>
                <stop offset="1" stopColor="#2133B9"/>
              </linearGradient>
              <clipPath id="clip0_463_365">
                <rect x="46.5" y="10" width="317" height="62" rx="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.cdnfonts.com/css/nexa-bold');
        @import url('https://fonts.googleapis.com/css2?family=Nexa+Text:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.cdnfonts.com/css/neulis-cursive');
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap');
        
        /* Book Call Button Hover Animation */
        .book-call-button {
          transition: none;
        }
        
        .book-call-button.is-hovered {
          transform: scale(1.02);
          opacity: 0.95;
          transition: transform 0.15s ease-out, opacity 0.15s ease-out;
        }
        
        .book-call-button.is-hovered #paint0_linear_463_365 stop:first-child {
          stop-color: #B0B9FF;
          transition: stop-color 0.15s ease-out;
        }
        
        .book-call-button.is-hovered #paint0_linear_463_365 stop:last-child {
          stop-color: #2D45D9;
          transition: stop-color 0.15s ease-out;
        }
        
        #paint0_linear_463_365 stop {
          transition: none;
        }
        
        /* Custom Scrollbar Styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 127, 186, 0.3);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 127, 186, 0.5);
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 127, 186, 0.3) transparent;
        }
      `}</style>

      {/* Footer */}
      <div className="relative z-10 flex justify-center w-full">
        <div className="w-full max-w-full md:max-w-[1200px] p-[22px] flex flex-col justify-start items-center gap-5 mt-[60px] mb-[100px] md:mt-[220px] md:mb-0 min-w-0">
        {/* Top Section - Title */}
        <div className="flex flex-col justify-start items-center gap-3">
          <div className="text-center text-[#9F94AD] text-xl md:text-2xl lg:text-4xl font-medium italic break-words" style={{ fontFamily: 'Neulis Cursive' }}>
            lovely to see you here!
          </div>
          <div className="text-white text-[100px] md:text-[150px] lg:text-[200px] font-medium break-words w-[242px] h-[113px] md:w-auto md:h-auto leading-normal md:leading-[200px]" style={{ fontFamily: 'Neulis Cursive' }}>
            raks
          </div>
        </div>

        {/* Bottom Section - Links and Credits */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 w-full max-w-full min-w-0">
          {/* Social Links */}
          <div className="w-auto md:w-[463px] flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 md:gap-0 h-[122px] md:h-auto">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center text-[#9F94AD] text-xs md:text-sm font-semibold underline break-words cursor-pointer" 
              style={{ fontFamily: 'Geist Mono, monospace' }}
            >
              Linkedin
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center text-[#9F94AD] text-xs md:text-sm font-semibold underline break-words cursor-pointer" 
              style={{ fontFamily: 'Geist Mono, monospace' }}
            >
              X
            </a>
            <a 
              href="https://contra.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center text-[#9F94AD] text-xs md:text-sm font-semibold underline break-words cursor-pointer" 
              style={{ fontFamily: 'Geist Mono, monospace' }}
            >
              Contra
            </a>
            <a 
              href="https://medium.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center text-[#9F94AD] text-xs md:text-sm font-semibold underline break-words cursor-pointer" 
              style={{ fontFamily: 'Geist Mono, monospace' }}
            >
              Medium
            </a>
            <a 
              href="mailto:hey@raksha.design"
              className="text-center text-[#9F94AD] text-xs md:text-sm font-semibold underline break-words cursor-pointer" 
              style={{ fontFamily: 'Geist Mono, monospace' }}
            >
              hey@raksha.design
            </a>
          </div>

          {/* Credits */}
          <div className="text-center self-stretch md:self-auto">
            <span className="text-[#A599B6] text-xs md:text-sm font-semibold break-words" style={{ fontFamily: 'Geist Mono, monospace' }}>
              Designed and coded by me and cursor<span className="md:hidden"><br /></span> → 
            </span>
            <a 
              href="#" 
              className="text-[#A599B6] text-xs md:text-sm font-semibold underline break-words cursor-pointer" 
              style={{ fontFamily: 'Geist Mono, monospace' }}
            >
              View process 
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* Cal.com Embedded Modal */}
      {isCalendarOpen && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCalendarOpen(false)}
        >
          <div 
            className="relative w-[90%] max-w-[1000px] h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Top right, aligned with modal */}
            <button
              onClick={() => setIsCalendarOpen(false)}
              className="absolute z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg top-4 right-4 md:top-0 md:-right-12"
              aria-label="Close calendar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Cal.com Embed */}
            <iframe
              src="https://cal.com/raksha-tated-v2ee58/15min"
              className="w-full h-full border-0 rounded-[24px] shadow-2xl bg-white"
              allow="camera; microphone; autoplay; display-capture"
              title="Book a meeting with Raksha"
            />
      </div>
      </div>
      )}
      </div>
  );
};
