"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { sendToAI, getFallbackResponse, type ChatMessage } from "../../lib/ai-chat";
import { AI_CONFIG } from "../../lib/config";
import { PortfolioMobile } from "./PortfolioMobile";
import useScroll from "../../hooks/useScroll";
import HighlightedText, { Controls } from "../common/HighlightedText";
import "../common/HighlightedText.css";

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
      <div className="flex items-start gap-[12px] max-w-[560px]">
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
    position: { left: '777.8px', top: '0px' },
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
  const navigate = useNavigate();
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
  const [cardsInMomentum, setCardsInMomentum] = React.useState<Set<string>>(new Set());
  const [cardsDroppedInChat, setCardsDroppedInChat] = React.useState<Set<string>>(new Set());
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState(1040.8);
  const chatCardRef = React.useRef<HTMLDivElement>(null);
  const inputContainerRef = React.useRef<HTMLDivElement>(null);
  const cardsContainerRef = React.useRef<HTMLDivElement>(null);
  const dragConstraintsRef = React.useRef<HTMLDivElement>(null);
  const heroSectionRef = React.useRef<HTMLDivElement>(null);
  const activeTabRef = React.useRef<HTMLButtonElement>(null);
  
  // Scroll to top on page load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Track if we're on desktop (lg breakpoint) for card positioning
  React.useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Track container width for iPad centering
  React.useEffect(() => {
    const updateContainerWidth = () => {
      if (cardsContainerRef.current) {
        const width = cardsContainerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);
  
  // Scroll tracking for navigation bar
  const { y, directionY } = useScroll();
  const headerTriggerY = 50;
  
  // Input ref for instant typing response
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Abort controller ref for cleanup
  const abortControllerRef = React.useRef<AbortController | null>(null);

  // Refs for highlighted text animation - single continuous sweep across all text
  const headingTextRef = React.useRef<Controls | null>(null);
  
  // Single continuous animation for all text
  React.useEffect(() => {
    // Wait a bit for ref to be attached, then start animation
    const timeout = setTimeout(() => {
      if (headingTextRef.current) {
        headingTextRef.current.start();
      } else {
        setTimeout(() => {
          if (headingTextRef.current) {
            headingTextRef.current.start();
          }
        }, 100);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Mobile detection - more robust check
  const [isMobile, setIsMobile] = React.useState(false);

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
      // Send to AI (API key is handled securely by serverless function)
      const response = await sendToAI(textToSend, messages, '');
      
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
      const response = await sendToAI(pillText, messages, '');
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

    try{
      const response = await sendToAI(card.message, messages, '');
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
    <div ref={heroSectionRef} className="relative w-full min-h-screen bg-[#D8D4E8] overflow-hidden">
      {/* Background Blurs - Hidden on mobile, visible on desktop (lg:) */}
      <div className="hidden lg:block absolute w-[1472px] h-[761px] -left-[227px] top-[281px] bg-[rgba(0,132,255,0.1)] rounded-[4444px] blur-[80px] pointer-events-none z-[-2]" />
      <div className="hidden lg:block absolute w-[1629px] h-[842px] right-[-300px] bottom-[-200px] bg-white rounded-[4444px] blur-[80px] pointer-events-none z-[-2]" />
      <div className="hidden lg:block absolute w-[800px] h-[600px] left-1/2 -translate-x-1/2 top-[350px] bg-white rounded-[4444px] blur-[100px] pointer-events-none z-[-1]" />

      {/* Navigation - Responsive */}
        <nav className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 ease-in-out ${
          y > headerTriggerY && directionY === 'down' ? '-translate-y-[128px]' : 'translate-y-0'
        }`}>
        {/* Backdrop blur with gradient fade */}
        <div className="absolute inset-0 z-[-1] backdrop-blur-[11px] [mask-image:linear-gradient(to_top,transparent,black_65%)]" 
          style={{
            background: 'rgba(255,255,255,0.01)'
          }}
        />
        
        {/* Mobile Header - visible on mobile, hidden on desktop */}
        <div className="flex md:hidden items-center justify-center h-full w-full p-3 gap-[200px]">
            {/* Logo - "raks" */}
          <div className="text-center text-white text-4xl font-medium break-words" style={{ fontFamily: 'neulis-cursive, "Neulis Cursive", Caveat, Pacifico, cursive' }}>
              raks
          </div>

            {/* Social Icons (Mobile) */}
          <div className="flex items-center gap-[16px] opacity-44">
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
        <div className="hidden md:flex w-full px-20 py-2.5 justify-between items-center">
            {/* Logo - "raks" */}
          <div className="text-center text-white text-4xl font-medium break-words" style={{ fontFamily: 'neulis-cursive, "Neulis Cursive", Caveat, Pacifico, cursive' }}>
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


      {/* Content Container - Responsive - Using Marijana's system for mobile/tablet, keeping desktop as-is */}
      <div className="relative w-full px-4 md:px-6 lg:px-11 pt-6 md:pt-11 lg:pt-11 mt-10 md:mt-[60px] lg:mt-[60px] flex flex-col items-center">
          {/* Main Heading */}
          <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-full md:max-w-[90vw] lg:max-w-[603.2px] text-left mt-5 md:mt-5 lg:mt-5 mb-5 md:mb-5 lg:mb-10"
          >
          <div className="w-full">
            <HighlightedText
              ref={(e) => {
                headingTextRef.current = e;
              }}
              className="text-base md:text-xl lg:text-2xl font-bold break-words"
              style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}
            >
              Raksha T
            </HighlightedText>
            <span className="hidden md:inline"><br/><br/></span>
            <br/>
            <div className="text-sm md:text-lg lg:text-xl font-light break-words" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              aka raks - product designer who builds products that work, look good and sell
              <br/>
              i live in duality: lead design experiences at product companies and code frontend with cursor{' '}
              <br/>
              <span className="hidden md:inline"> </span>
              to find out more →{' '}
            <a 
              href="https://cal.com/raksha-tated-v2ee58/15min"
              target="_blank"
              rel="noopener noreferrer"
                className="underline hover:opacity-80 transition-opacity cursor-pointer" 
                style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
            >
              let's talk
            </a>
            <br/><br/>
              chat with my portfolio below ↓ or explore projects{' '}
            <button 
                className="underline hover:opacity-80 transition-opacity bg-none border-none p-0 cursor-pointer" 
                style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
              onClick={() => {/* TODO: navigate to projects */}}
            >
              here
            </button>
          </div>
        </div>
          </motion.div>

        {/* Chat + Cards Container - Responsive sizing - Full width on iPad to center chatbox */}
        <div 
          ref={cardsContainerRef} 
          className="relative mx-auto w-full max-w-full md:w-full md:h-[485.6px] md:flex md:justify-center lg:max-w-[1040.8px] lg:w-[1040.8px] lg:h-[485.6px] lg:flex lg:justify-center"
        >
          {/* Drag Constraints Container - Full width, bottom 70% of viewport */}
          <div 
            ref={dragConstraintsRef}
            className="pointer-events-none fixed left-0 right-0 w-screen"
            style={{
              top: '30vh',
              height: '70vh',
              zIndex: 1
            }}
          />
          {/* Chat Interface Card - Centered on iPad and Desktop */}
          <motion.div
            ref={chatCardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden w-full md:absolute md:overflow-hidden md:z-20 md:left-1/2 md:-translate-x-1/2 md:top-[23.2px] md:w-[482.56px] md:h-[435.2px] lg:absolute lg:overflow-hidden lg:z-20 lg:left-1/2 lg:-translate-x-1/2 lg:top-[23.2px] lg:w-[603.2px] lg:h-[435.2px]"
            style={{
              background: 'linear-gradient(180deg, #E9E8FF 0%, #EFF4EC 100%)',
              boxShadow: '0px 30px 66px rgba(0, 0, 0, 0.04)',
              borderRadius: '44px',
              outline: '2px white solid',
              outlineOffset: '-2px',
              height: '483px'
            }}
          >
          {/* Drop Zone Overlay - Shows when dragging a card (iPad and desktop) */}
          {isCardOverChat && (
            <div 
              className="hidden md:flex absolute inset-0 z-50 rounded-[44px] bg-blue-500/10 border-2 border-dashed border-blue-500 items-center justify-center pointer-events-none"
              style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              <p className="text-[18px] font-medium text-blue-600" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                Drop to ask about this project
              </p>
              </div>
          )}
          {/* Inner Background Blurs - iPad and Desktop only for performance */}
          <div className="hidden md:block">
              <div className="absolute w-[421px] h-[336px] left-1/2 bottom-[-99px] -translate-x-1/2 translate-x-[236px] bg-[rgba(101,73,255,0.14)] rounded-[4444px] blur-[60px] pointer-events-none" />
              <div className="absolute w-[605px] h-[313px] left-1/2 bottom-[267px] -translate-x-1/2 -translate-x-[172px] bg-gradient-to-r from-[rgba(255,255,255,0.88)] to-[rgba(255,255,255,0.1936)] rounded-[4444px] blur-[60px] pointer-events-none" />
          </div>

          <div className="relative h-full flex flex-col items-center">
            {/* Top Transparent Blur Overlay */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-[calc(100%-32px)] md:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[340px] md:max-w-[448px] lg:max-w-[560px] top-0 h-[40px] pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))'
              }}
            />
            
            {/* Chat Messages Container - Scrollable */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-[24px] md:top-[32px] flex flex-col w-[calc(100%-32px)] md:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[340px] md:max-w-[448px] lg:max-w-[560px] h-[320px] lg:h-[320px]"
            >
              <div 
                ref={chatContainerRef}
                className="overflow-y-auto flex flex-col gap-2 md:gap-3 pr-1 md:pr-3 custom-scrollbar flex-1 pb-6 md:pb-4 lg:pb-20"
                style={{ 
                  scrollPaddingBottom: '20px'
                }}
              >
              {/* Initial Welcome Message - Always show */}
              <div className="w-full flex-shrink-0">
                <div className="flex items-start gap-[12px] max-w-[560px]">
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
                  <div className="flex items-start gap-[12px] max-w-[560px]">
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
            <div ref={inputContainerRef} className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center w-[calc(100%-32px)] md:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[340px] md:max-w-[448px] lg:max-w-[560px] bottom-[16px] md:bottom-[20px] lg:bottom-[40px] gap-[16px]">
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
                <div className="w-full flex items-center justify-between gap-[12px]">
                  {/* Left: Sparkle Icon + Input */}
                  <div className="flex items-center gap-[12px] flex-1" style={{ alignItems: 'center' }}>
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
              <div className="w-full overflow-x-auto px-4 md:px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex items-center justify-center gap-[12px]">
                  {visiblePills.map((suggestion, index) => {
                    return (
                      <button 
                        key={`${suggestion}-${index}`}
                        onClick={() => handlePillClick(suggestion)}
                        disabled={isLoading}
                        className="relative px-3 md:px-5 py-2 h-[37px] rounded-full flex items-center justify-center disabled:cursor-not-allowed cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
                        style={{
                          background: 'rgba(255, 255, 255, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        <span
                          className="text-[12px] md:text-[13px] leading-[20px] font-normal text-black/[0.64] whitespace-nowrap text-center"
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

          {/* Project Cards - iPad & Desktop: Draggable around chat, Mobile: Stacked below chat with click */}
          {/* iPad & Desktop Draggable Cards - Hidden on mobile, visible on iPad (md: 768px+) */}
          <div className="hidden md:block">
            <AnimatePresence>
              {PROJECT_CARDS.map((card) => {
                if (!visibleCards.includes(card.id)) return null;
                
                return (
                  <motion.div
                    key={card.id}
                    data-card-id={card.id}
                    drag
                    dragConstraints={dragConstraintsRef}
                    dragTransition={{ 
                      bounceStiffness: 100, 
                      bounceDamping: 10, 
                      power: 0.4
                    }}
                    onDragStart={() => {
                      setIsDraggingCard(card.id);
                    }}
                    onDrag={(event, info) => {
                      // Check if card is over chat area using cursor position
                      // Normalize to viewport coordinates so comparisons with getBoundingClientRect() work even after scroll
                      const cursorX = info.point.x - window.scrollX;
                      const cursorY = info.point.y - window.scrollY;
                      let isOver = false;
                      
                      // Check main chat container
                      if (chatCardRef.current) {
                        const chatRect = chatCardRef.current.getBoundingClientRect();
                        const margin = 10;
                        isOver = 
                          cursorX >= chatRect.left - margin &&
                          cursorX <= chatRect.right + margin &&
                          cursorY >= chatRect.top - margin &&
                          cursorY <= chatRect.bottom + margin;
                      }
                      
                      // Also check input container separately to ensure it's detected
                      if (!isOver && inputContainerRef.current) {
                        const inputRect = inputContainerRef.current.getBoundingClientRect();
                        const margin = 10;
                        isOver = 
                          cursorX >= inputRect.left - margin &&
                          cursorX <= inputRect.right + margin &&
                          cursorY >= inputRect.top - margin &&
                          cursorY <= inputRect.bottom + margin;
                      }
                        
                        setIsCardOverChat(isOver);
                    }}
                    onDragEnd={(event, info) => {
                      // Check if dropped over chat - use cursor position for reliability
                      // Normalize to viewport coordinates to account for page scroll
                      const cursorX = info.point.x - window.scrollX;
                      const cursorY = info.point.y - window.scrollY;
                      let isDroppedOnChat = false;
                      
                      // Check main chat container
                      if (chatCardRef.current) {
                        const chatRect = chatCardRef.current.getBoundingClientRect();
                        const margin = 10;
                        isDroppedOnChat = 
                          cursorX >= chatRect.left - margin &&
                          cursorX <= chatRect.right + margin &&
                          cursorY >= chatRect.top - margin &&
                          cursorY <= chatRect.bottom + margin;
                      }
                      
                      // Also check input container separately to ensure it's detected
                      if (!isDroppedOnChat && inputContainerRef.current) {
                        const inputRect = inputContainerRef.current.getBoundingClientRect();
                        const margin = 10;
                        isDroppedOnChat = 
                          cursorX >= inputRect.left - margin &&
                          cursorX <= inputRect.right + margin &&
                          cursorY >= inputRect.top - margin &&
                          cursorY <= inputRect.bottom + margin;
                      }
                        
                        if (isDroppedOnChat) {
                        // Card dropped inside chatbox - mark it and keep it under chatbox
                        setCardsDroppedInChat(prev => new Set(prev).add(card.id));
                          setIsDraggingCard(null);
                          setIsCardOverChat(false);
                        // Stop momentum immediately when dropping into chat
                        handleCardDrop(card.id);
                      } else {
                        // Card dropped outside chatbox - will slide with momentum
                        // Keep z-index high during momentum, will be lowered in onDragTransitionEnd
                        setCardsInMomentum(prev => new Set(prev).add(card.id));
                        setIsDraggingCard(null);
                        setIsCardOverChat(false);
                      }
                    }}
                    onDragTransitionEnd={() => {
                      // Momentum animation completed - check final position
                      setTimeout(() => {
                        if (chatCardRef.current) {
                          // Find the card element using the data attribute
                          const cardElement = document.querySelector(`[data-card-id="${card.id}"]`) as HTMLElement;
                          if (cardElement) {
                            const cardRect = cardElement.getBoundingClientRect();
                            const chatRect = chatCardRef.current.getBoundingClientRect();
                            
                            // Check if card's center is inside chat area after momentum
                            const cardCenterX = cardRect.left + cardRect.width / 2;
                            const cardCenterY = cardRect.top + cardRect.height / 2;
                            
                            const isInChatAfterMomentum = 
                              cardCenterX >= chatRect.left &&
                              cardCenterX <= chatRect.right &&
                              cardCenterY >= chatRect.top &&
                              cardCenterY <= chatRect.bottom;
                            
                            if (isInChatAfterMomentum) {
                              // Card ended up in chatbox after momentum - attach it
                              setCardsDroppedInChat(prev => new Set(prev).add(card.id));
                              handleCardDrop(card.id);
                            }
                          }
                        }
                        
                        // Remove from momentum set - z-index will be lowered
                        setCardsInMomentum(prev => {
                          const next = new Set(prev);
                          next.delete(card.id);
                          return next;
                        });
                      }, 0);
                    }}
                    initial={{ translateY: 75, opacity: 0 }}
                    animate={{ 
                      translateY: 0,
          opacity: 1,
                      rotate: card.rotation
                    }}
                    exit={{ 
                      translateY: 75,
          opacity: 0,
                      transition: { duration: 0.3 }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                      transition: { duration: 0.2 }
                    }}
                    whileDrag={{ 
                      scale: 1.2, 
                      rotate: 0,
                      cursor: 'grabbing'
                    }}
                    transition={{ 
                      ease: 'easeOut',
                      duration: 0.5,
                      delay: PROJECT_CARDS.findIndex(c => c.id === card.id) * 0.1
                    }}
                    className="absolute w-[263px] h-[266px] rounded-[44px] border border-white cursor-grab"
                    style={{
                      // iPad-specific positioning: reduce right-side card positions to bring them into viewport
                      // Desktop (lg:) uses original positions, iPad (md:) uses adjusted positions
                      left: card.id === 'greex' ? (isDesktop ? '777.8px' : '520px') :
                            card.id === 'dealdoc' ? (isDesktop ? '783.09px' : '525px') :
                            card.position.left,
                      top: card.position.top,
                      background: 'rgba(255, 255, 255, 0.30)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      // Z-index logic:
                      // - Dragging: 100 (above chatbox z-20)
                      // - In momentum (sliding): 50 (above chatbox z-20)
                      // - Dropped in chatbox: 5 (under chatbox z-20)
                      // - Default: 10 (under chatbox z-20)
                      zIndex: isDraggingCard === card.id 
                        ? 100 
                        : cardsInMomentum.has(card.id) 
                          ? 50 
                          : cardsDroppedInChat.has(card.id)
                            ? 5
                            : 10,
                      transformStyle: 'preserve-3d',
                      // Performance optimizations for ultra-smooth drag like Marijana's stickers
                      willChange: 'transform',
                      touchAction: 'none',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      WebkitTouchCallout: 'none'
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

          {/* Mobile Click Cards - Stacked vertically - Visible on mobile only, hidden on iPad/desktop */}
          <div className="md:hidden flex flex-col gap-[20px] mt-8 items-center">
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

      {/* Tabs Section - Figma design with underline */}
      <motion.div 
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "100px" }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative w-full flex justify-center py-[20px] md:py-[40px] lg:py-[60px] mt-[40px] md:mt-[60px] lg:mt-[80px] px-[16px] md:px-[20px] lg:px-[22px]"
      >
            <div className="w-full max-w-[540px] mx-auto">
              {/* Tabs container */}
              <div className="flex items-center justify-center gap-[24px] md:gap-[32px] lg:gap-[64px] overflow-x-auto pb-2 px-2">
            {['Work', 'Frontend', 'Hall of fame', 'Concepts'].map((tab, index) => {
              const isActive = index === 0; // 'Work' is active by default
              return (
                <div key={tab} className="relative flex-shrink-0">
                  <motion.button
                    ref={index === 0 ? activeTabRef : null}
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative pb-[4px] transition-all duration-200"
                    style={{
                      fontFamily: 'Nexa, system-ui, sans-serif',
                      fontWeight: isActive ? '600' : '400',
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: isActive ? '#283FE4' : 'rgba(0, 0, 0, 0.44)',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab}
                  </motion.button>
                  
                  {/* Underline for active tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#283FE4]"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.cdnfonts.com/css/nexa-bold');
        @import url('https://fonts.googleapis.com/css2?family=Nexa+Text:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.cdnfonts.com/css/neulis-cursive');
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap');
        
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

      {/* Project Showcase Sections - From Figma Design */}
      <div className="relative w-full max-w-[1293px] mx-auto px-4 md:px-6 lg:px-11 py-[20px] md:py-[40px] lg:py-[60px] mt-[40px] md:mt-[60px] lg:mt-[80px] flex flex-col gap-[60px] md:gap-[80px] lg:gap-[150px]">
        
        {/* Ova Project Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col gap-[8px]"
        >
          <p className="text-[rgba(0,0,0,0.6)] text-base font-normal" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            Ova : A privacy first , Pg13+  Period Tracking App for women
          </p>
          <p className="text-black text-base font-normal leading-relaxed" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
            Focused on allowing women of all ages to track their periods, have a period companion - Ova to guide them through their cycles, give them insights about their period and give predictive feedback of their upcoming cycles, symptoms and moods
          </p>
          <div className="relative h-[400px] md:h-[500px] lg:h-[677px] rounded-[40px] overflow-hidden mt-6">
            <div className="absolute bg-white blur-[200px] filter h-[761px] left-[-227px] top-1/2 -translate-y-1/2 w-[1472px] pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row gap-[16px] items-center w-full max-w-[1258px] px-4">
              <div className="h-[300px] md:h-[400px] lg:h-[635px] rounded-[36px] w-full md:w-[393px] relative overflow-hidden">
                <img 
                  src="https://www.figma.com/api/mcp/asset/58263a68-76ec-40ae-9d3a-0f30c28debaf" 
                  alt="Ova mobile mockup" 
                  className="absolute inset-0 w-full h-full object-cover rounded-[36px]"
                />
              </div>
              <div className="h-[300px] md:h-[400px] lg:h-[635px] rounded-[36px] w-full md:w-[847px] relative overflow-hidden">
                <img 
                  src="https://www.figma.com/api/mcp/asset/9d49b638-e5c9-4a84-bffa-2988b0f687f3" 
                  alt="Ova desktop mockup" 
                  className="absolute inset-0 w-full h-full object-cover rounded-[36px]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Greex Project Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col gap-[8px]"
        >
          <p className="text-[rgba(0,0,0,0.6)] text-base font-normal" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            Greex : A defi Trading Platform
          </p>
          <p className="text-black text-base font-normal leading-relaxed" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
            Greex was a decentralized options and futures trading platform designed to make strategy-based trading more accessible. The product allowed users to apply predefined trading strategies, understand risk-reward visually, and execute trades seamlessly across web and mobile.
          </p>
          <div className="relative h-[400px] md:h-[500px] lg:h-[677px] rounded-[40px] overflow-hidden mt-6">
            <div className="absolute bg-white blur-[200px] filter h-[761px] left-[-227px] top-1/2 -translate-y-1/2 w-[1472px] pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row gap-[16px] items-center w-full max-w-[1258px] px-4">
              <div 
                onClick={() => navigate('/greex')}
                className="h-[300px] md:h-[400px] lg:h-[635px] rounded-[36px] w-full md:w-[982px] relative overflow-hidden shadow-[8px_25px_57px_0px_rgba(0,0,0,0.1)] cursor-pointer transition-opacity hover:opacity-90"
              >
                <img 
                  src="https://www.figma.com/api/mcp/asset/0de2028f-a4ae-40d3-a439-2b4ea84ff274" 
                  alt="Greex desktop mockup" 
                  className="absolute inset-0 w-full h-full object-cover rounded-[36px]"
                />
              </div>
              <div className="h-[200px] md:h-[300px] lg:h-[635px] rounded-[36px] w-full md:w-[264px] relative overflow-hidden">
                <img 
                  src="https://www.figma.com/api/mcp/asset/2af8764a-886e-47c4-aecb-600c080d9937" 
                  alt="Greex mobile mockup" 
                  className="absolute inset-0 w-full h-full object-cover rounded-[36px]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dealdoc Project Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col gap-[8px]"
        >
          <p className="text-[rgba(0,0,0,0.6)] text-base font-normal" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            Dealdoc : Deal management Platform
          </p>
          <p className="text-black text-base font-normal leading-relaxed" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
            Dealdoc is a sales deal management tool for developers and founders. The idea was to create a minimal, developer-first UI that felt clean and logical, while helping users track, manage, and close sales deals more efficiently.
          </p>
          <div className="relative h-[400px] md:h-[500px] lg:h-[677px] rounded-[40px] overflow-hidden mt-6">
            <div className="absolute bg-white blur-[200px] filter h-[761px] left-[-227px] top-1/2 -translate-y-1/2 w-[1472px] pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row gap-[14px] items-center justify-center w-full max-w-[1258px] px-4">
              <div className="flex-1 h-[300px] md:h-[400px] lg:h-[635px] rounded-[36px] relative overflow-hidden">
                <img 
                  src="https://www.figma.com/api/mcp/asset/56e2472b-c849-4d99-a14a-52f98463f9eb" 
                  alt="Dealdoc mockup 1" 
                  className="absolute inset-0 w-full h-full object-cover rounded-[36px]"
                />
              </div>
              <div className="flex-1 h-[635px] rounded-[36px] relative overflow-hidden">
                <img 
                  src="https://www.figma.com/api/mcp/asset/c6579de0-7126-4c23-9b7b-c74d298edbf7" 
                  alt="Dealdoc mockup 2" 
                  className="absolute inset-0 w-full h-full object-cover rounded-[36px]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Adiagnosis Project Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col gap-[8px]"
        >
          <p className="text-[rgba(0,0,0,0.6)] text-base font-normal" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            Adiagnosis : A clinical tool for psychiatrists and medical professionals
          </p>
          <div className="text-black text-base font-normal leading-relaxed" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
            <p className="mb-0">A smarter way to assess, diagnose, and act on mental health. Whether you're a clinician or an individual, Adiagnosis helps turn complex psychiatric symptoms into organized, useful reports. Built on diagnostic frameworks used in mental health practice.</p>
          </div>
          <div className="relative h-[350px] md:h-[450px] lg:h-[584px] rounded-[40px] overflow-hidden mt-6 bg-[rgba(255,255,255,0.3)]">
            <div className="absolute bg-[rgba(255,255,255,0.57)] blur-[200px] filter h-[761px] left-[-227px] top-1/2 -translate-y-1/2 w-[1036px] pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row gap-[16px] items-center justify-center w-full max-w-[1258px] px-4">
              <div className="h-[250px] md:h-[350px] lg:h-[542px] rounded-[36px] w-full md:w-[838px] relative overflow-hidden">
                <img 
                  src="https://www.figma.com/api/mcp/asset/b0b89c9e-a322-4352-b4a0-9a84f8d59567" 
                  alt="Adiagnosis mockup 1" 
                  className="absolute inset-0 w-full h-full object-cover rounded-[36px]"
                />
              </div>
              <div className="flex-1 h-[200px] md:h-[300px] lg:h-[542px] rounded-[22px] relative overflow-hidden">
                <img 
                  src="https://www.figma.com/api/mcp/asset/2d2422c3-f026-4f75-83be-2cd745c745d8" 
                  alt="Adiagnosis mockup 2" 
                  className="absolute inset-0 w-full h-full object-contain rounded-[22px]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section - From Figma Design */}
      <div className="relative w-full py-[20px] md:py-[40px] lg:py-[60px] mt-[40px] md:mt-[60px] lg:mt-[80px] overflow-hidden flex justify-center">
        {/* SVG Background - Desktop only */}
        <div className="absolute inset-0 hidden lg:flex justify-center">
          <svg width="1706" height="900" viewBox="0 0 1706 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[1706px]">
            <g clipPath="url(#clip0_0_595)">
              <g filter="url(#filter0_i_0_595)">
                <rect width="115" height="900" fill="url(#paint0_linear_0_595)"/>
              </g>
              <g filter="url(#filter1_i_0_595)">
                <rect width="115" height="900" transform="matrix(-1 0 0 1 230 0)" fill="url(#paint1_linear_0_595)"/>
              </g>
              <g filter="url(#filter2_i_0_595)">
                <rect x="230" width="115" height="900" fill="url(#paint2_linear_0_595)"/>
              </g>
              <g filter="url(#filter3_i_0_595)">
                <rect width="115" height="900" transform="matrix(-1 0 0 1 460 0)" fill="url(#paint3_linear_0_595)"/>
              </g>
              <g filter="url(#filter4_i_0_595)">
                <rect x="460" width="115" height="900" fill="url(#paint4_linear_0_595)"/>
              </g>
              <g filter="url(#filter5_i_0_595)">
                <rect width="115" height="900" transform="matrix(-1 0 0 1 690 0)" fill="url(#paint5_linear_0_595)"/>
              </g>
              <g filter="url(#filter6_i_0_595)">
                <rect x="690" width="115" height="900" fill="url(#paint6_linear_0_595)"/>
              </g>
              <g filter="url(#filter7_i_0_595)">
                <rect width="115" height="900" transform="matrix(-1 0 0 1 920 0)" fill="url(#paint7_linear_0_595)"/>
              </g>
              <g filter="url(#filter8_i_0_595)">
                <rect x="920" width="115" height="900" fill="url(#paint8_linear_0_595)"/>
              </g>
              <g filter="url(#filter9_i_0_595)">
                <rect width="115" height="900" transform="matrix(-1 0 0 1 1150 0)" fill="url(#paint9_linear_0_595)"/>
              </g>
              <g filter="url(#filter10_i_0_595)">
                <rect x="1150" width="115" height="900" fill="url(#paint10_linear_0_595)"/>
              </g>
              <g filter="url(#filter11_i_0_595)">
                <rect width="115" height="900" transform="matrix(-1 0 0 1 1380 0)" fill="url(#paint11_linear_0_595)"/>
              </g>
              <g filter="url(#filter12_i_0_595)">
                <rect x="1380" width="115" height="900" fill="url(#paint12_linear_0_595)"/>
              </g>
              <g filter="url(#filter13_i_0_595)">
                <rect width="115" height="900" transform="matrix(-1 0 0 1 1610 0)" fill="url(#paint13_linear_0_595)"/>
              </g>
              <g filter="url(#filter14_i_0_595)">
                <rect x="1610" width="115" height="900" fill="url(#paint14_linear_0_595)"/>
              </g>
              <foreignObject x="-487" y="-298" width="2657" height="1391">
                <div style={{backdropFilter: 'blur(2px)', clipPath: 'url(#bgblur_1_0_595_clip_path)', height: '100%', width: '100%'}}></div>
              </foreignObject>
              <g filter="url(#filter15_f_0_595)" data-figma-bg-blur-radius="4">
                <rect x="-87" y="102" width="1857" height="756" rx="200" fill="#11229D"/>
              </g>
            </g>
            <defs>
              <filter id="filter0_i_0_595" x="0" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter1_i_0_595" x="115" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter2_i_0_595" x="230" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter3_i_0_595" x="345" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter4_i_0_595" x="460" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter5_i_0_595" x="575" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter6_i_0_595" x="690" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter7_i_0_595" x="805" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter8_i_0_595" x="920" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter9_i_0_595" x="1035" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter10_i_0_595" x="1150" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter11_i_0_595" x="1265" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter12_i_0_595" x="1380" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter13_i_0_595" x="1495" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter14_i_0_595" x="1610" y="0" width="115" height="904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_595"/>
              </filter>
              <filter id="filter15_f_0_595" x="-487" y="-298" width="2657" height="1391" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_0_595"/>
              </filter>
              <clipPath id="bgblur_1_0_595_clip_path" transform="translate(487 298)">
                <rect x="-87" y="102" width="1857" height="756" rx="200"/>
              </clipPath>
              <linearGradient id="paint0_linear_0_595" x1="115" y1="450" x2="0" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint1_linear_0_595" x1="115" y1="450" x2="0" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint2_linear_0_595" x1="345" y1="450" x2="230" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint3_linear_0_595" x1="115" y1="450" x2="0" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint4_linear_0_595" x1="575" y1="450" x2="460" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint5_linear_0_595" x1="115" y1="450" x2="0" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint6_linear_0_595" x1="805" y1="450" x2="690" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint7_linear_0_595" x1="115" y1="450" x2="0" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint8_linear_0_595" x1="1035" y1="450" x2="920" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint9_linear_0_595" x1="115" y1="450" x2="0" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint10_linear_0_595" x1="1265" y1="450" x2="1150" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint11_linear_0_595" x1="115" y1="450" x2="0" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint12_linear_0_595" x1="1495" y1="450" x2="1380" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint13_linear_0_595" x1="115" y1="450" x2="0" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <linearGradient id="paint14_linear_0_595" x1="1725" y1="450" x2="1610" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5D70FA"/>
                <stop offset="1" stopColor="#283FE4"/>
              </linearGradient>
              <clipPath id="clip0_0_595">
                <rect width="1706" height="900" rx="60" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        
        {/* Mobile/iPad Background Wrapper - hugs content */}
        <div className="relative z-10 w-full max-w-[90vw] mx-auto lg:hidden">
          <div className="bg-gradient-to-br from-[#283fe4] to-[#1a2d9f] rounded-[24px] p-6 md:p-8 backdrop-blur-sm shadow-2xl">
            {/* Inner container with bottom-aligned boxes */}
            <div className="flex flex-col gap-[20px] w-full">
        
        {/* 52+ Projects shipped */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
          className="flex flex-col items-start gap-3 md:gap-3.5 w-full"
        >
          <p className="text-white text-base md:text-lg font-bold leading-normal w-full" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            52+ Projects shipped
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] rounded-[20px] md:rounded-[24px] w-full relative p-3 md:p-4">
            <div className="text-white text-sm md:text-sm font-normal leading-normal w-full" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              <ul className="list-disc pl-6 space-y-1 md:space-y-1.5">
                <li>Adiagnosis</li>
                <li>Dealdoc</li>
                <li>Tickle</li>
                <li>Ova App</li>
                <li>Cognix Health</li>
                <li>Bewakoof.com</li>
                <li>Meyraki</li>
                <li>Indian Oil Company</li>
                <li>Inaam</li>
                <li>ENA</li>
                <li>Kodo Card</li>
                <li>Euman Technologies</li>
                <li>KG International</li>
                <li>Tennishop UAE</li>
                <li>Nourish App</li>
                <li>Unidel</li>
                <li>Lido Learning</li>
                <li>Unifynd</li>
                <li>Reverce</li>
                <li>Nesto Group (App)</li>
                <li>And many more</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Work with 30+ leaders */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-col items-start gap-3 md:gap-3.5 w-full"
        >
          <p className="text-white text-base md:text-lg font-bold leading-normal w-full" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            Work with 30+ leaders
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] rounded-[20px] md:rounded-[24px] w-full relative p-3 md:p-4">
            <div className="text-white text-sm md:text-sm font-normal leading-normal w-full" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              <ul className="list-disc pl-6 space-y-1 md:space-y-1.5">
                <li>Tina Hua</li>
                <li>Angie lee</li>
                <li>Aritra Senugupta</li>
                <li>Sarthak Sharma</li>
                <li>Max Mcquillan</li>
                <li>Hannah Wartooth</li>
                <li>Neerav J</li>
                <li>Amrita Singh</li>
                <li>Rohit Biwas</li>
                <li>Arash</li>
                <li>Sunny</li>
                <li>Raj Karan</li>
                <li>Deepti Sisoki</li>
                <li>Nyshtita Jain</li>
                <li>Thomas Phua</li>
                <li>Rohit Goel</li>
                <li>Sagar Sharma</li>
                <li>Maruti</li>
                <li>and many more</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* $250+ M raised */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.30 }}
          className="flex flex-col items-start gap-3 md:gap-3.5 w-full"
        >
          <p className="text-white text-base md:text-lg font-bold leading-normal w-full" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            $250+ M raised
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] rounded-[20px] md:rounded-[24px] w-full relative p-3 md:p-4">
            <div className="text-white text-sm md:text-sm font-normal leading-normal w-full" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              <ul className="list-disc pl-6 space-y-1 md:space-y-1.5">
                <li>Nesto group : $130M</li>
                <li>Bewakoof : ~$40M+</li>
                <li>Kodo Card : ~$10M +</li>
                <li>Lido Learning : ~$1.7 M+</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 32 Industries */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          className="flex flex-col items-start gap-3 md:gap-3.5 w-full"
        >
          <p className="text-white text-base md:text-lg font-bold leading-normal w-full" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            32 Industries
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] rounded-[20px] md:rounded-[24px] w-full relative p-3 md:p-4">
            <div className="text-white text-sm md:text-sm font-normal leading-normal w-full" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              <ul className="list-disc pl-6 space-y-1 md:space-y-1.5">
                <li>Edutech</li>
                <li>Fintech</li>
                <li>Healthtech</li>
                <li>Consumer tech</li>
                <li>E-Commerce</li>
                <li>Aviation</li>
                <li>Fintech</li>
                <li>Sales CRM</li>
                <li>and more</li>
              </ul>
            </div>
          </div>
        </motion.div>
            </div>
          </div>
        </div>

        {/* Desktop Content - With SVG Background */}
        <div className="relative z-10 max-w-full md:max-w-[90vw] lg:max-w-[1142px] mx-auto px-4 md:px-6 lg:px-11 hidden lg:flex items-center justify-center min-h-0 md:min-h-0 lg:min-h-[900px]">
          {/* Inner container with bottom-aligned boxes */}
          <div className="flex flex-col md:flex-col lg:flex-row items-start md:items-start lg:items-end justify-center gap-[20px] lg:gap-[44px] w-full">
        
        {/* 52+ Projects shipped */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
          className="flex flex-col items-start gap-[16px] w-full lg:w-[245px]"
        >
          <p className="text-white text-base md:text-lg lg:text-[20px] font-bold leading-normal w-full" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            52+ Projects shipped
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] rounded-[20px] md:rounded-[24px] lg:rounded-[28px] w-full relative p-[16px]">
            <div className="text-white text-sm md:text-sm lg:text-base font-normal leading-normal w-full" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              <ul className="list-disc pl-6 space-y-1 md:space-y-1.5 lg:space-y-2">
                <li>Adiagnosis</li>
                <li>Dealdoc</li>
                <li>Tickle</li>
                <li>Ova App</li>
                <li>Cognix Health</li>
                <li>Bewakoof.com</li>
                <li>Meyraki</li>
                <li>Indian Oil Company</li>
                <li>Inaam</li>
                <li>ENA</li>
                <li>Kodo Card</li>
                <li>Euman Technologies</li>
                <li>KG International</li>
                <li>Tennishop UAE</li>
                <li>Nourish App</li>
                <li>Unidel</li>
                <li>Lido Learning</li>
                <li>Unifynd</li>
                <li>Reverce</li>
                <li>Nesto Group (App)</li>
                <li>And many more</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Work with 30+ leaders */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-col items-start gap-[16px] w-full lg:w-[245px]"
        >
          <p className="text-white text-base md:text-lg lg:text-[20px] font-bold leading-normal w-full" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            Work with 30+ leaders
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] rounded-[20px] md:rounded-[24px] lg:rounded-[28px] w-full relative p-[16px]">
            <div className="text-white text-sm md:text-sm lg:text-base font-normal leading-normal w-full" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              <ul className="list-disc pl-6 space-y-1 md:space-y-1.5 lg:space-y-2">
                <li>Tina Hua</li>
                <li>Angie lee</li>
                <li>Aritra Senugupta</li>
                <li>Sarthak Sharma</li>
                <li>Max Mcquillan</li>
                <li>Hannah Wartooth</li>
                <li>Neerav J</li>
                <li>Amrita Singh</li>
                <li>Rohit Biwas</li>
                <li>Arash</li>
                <li>Sunny</li>
                <li>Raj Karan</li>
                <li>Deepti Singhi</li>
                <li>Nyshita Jain</li>
                <li>Thomas Phua</li>
                <li>Rohit Goel</li>
                <li>Sagar Sharma</li>
                <li>Maruti</li>
                <li>and many more</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* $250+ M raised */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.30 }}
          className="flex flex-col items-start gap-[16px] w-full lg:w-[245px]"
        >
          <p className="text-white text-base md:text-lg lg:text-[20px] font-bold leading-normal w-full" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            $250+ M raised
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] rounded-[20px] md:rounded-[24px] lg:rounded-[28px] w-full relative p-[16px]">
            <div className="text-white text-sm md:text-sm lg:text-base font-normal leading-normal w-full" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              <ul className="list-disc pl-6 space-y-1 md:space-y-1.5 lg:space-y-2">
                <li>Nesto group : $130M</li>
                <li>Bewakoof : ~$40M+</li>
                <li>Kodo Card : ~$10M +</li>
                <li>Lido Leaning : ~31.7 M+</li>
                <li>Euman Technologies : ~ $3.4 M+</li>
                <li>Unifynd : ~ $2M</li>
                <li>Cryptiq : ~ $200K+</li>
                <li>and many more</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 2.9+ M users reached */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          className="flex flex-col items-start gap-[16px] w-full lg:w-[245px]"
        >
          <p className="text-white text-base md:text-lg lg:text-[20px] font-bold leading-normal w-full" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            2.9+ M users reached
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] rounded-[20px] md:rounded-[24px] lg:rounded-[28px] w-full relative p-[16px]">
            <div className="text-white text-sm md:text-sm lg:text-base font-normal leading-normal w-full" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
              <p>
                Cumulative number of users across all platforms I worked with in my career may be way above this number
              </p>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </div>

      {/* Principles Section - My non negotiables - From Figma Design */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative w-full bg-[#e4deed] h-auto min-h-[1050px] md:min-h-[900px] lg:min-h-[1050px] py-[40px] md:py-[40px] lg:py-[60px] mt-[60px] md:mt-[60px] lg:mt-[80px] overflow-hidden"
      >
        <div className="absolute bg-white blur-[200px] filter h-[870px] left-[534px] -top-[424px] rounded-[4444px] w-[1682px] pointer-events-none z-0" />
        <p className="relative text-center text-[#9f94ad] text-lg md:text-xl lg:text-[22px] font-bold mb-[20px] md:mb-[40px] lg:mb-[60px] z-10" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
          My non negotiables
        </p>
        
        {/* Principles Cards - Positioned with rotations */}
        <motion.div 
          className="relative max-w-[1728px] mx-auto px-6 md:px-6 lg:px-11 h-[950px] lg:h-[900px] z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
        >
          {/* Main principle - Blue card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -80, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1], 
              delay: 0.64 
            }}
            className="absolute left-1/2 top-[60px] lg:top-0 -translate-x-1/2 w-[88%] lg:w-[533.407px]"
          >
            <div className="absolute inset-0 rotate-[2deg] lg:rotate-[4deg] scale-y-[-1]">
              <div className="bg-gradient-to-l from-[rgba(255,255,255,0.32)] to-[rgba(40,63,228,0.32)] h-[77.238px] rounded-[22px] w-full" />
            </div>
            <div className="relative rotate-[2deg] lg:rotate-[4deg] h-[77.238px] flex items-center justify-center px-3 lg:px-6">
              <p className="text-black text-sm lg:text-base font-normal leading-normal text-center" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                My team is my fuel, if I work with you I respect you all the way
              </p>
            </div>
          </motion.div>

          {/* Blue highlighted principle */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -80, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1], 
              delay: 0.56 
            }}
            className="absolute left-1/2 top-[140px] lg:top-[90px] -translate-x-1/2 w-[90%] lg:w-[682.088px]"
          >
            <div className="absolute inset-0 rotate-[358deg] lg:rotate-[356deg]">
              <div className="bg-[#283fe4] h-[77px] rounded-[22px] shadow-[0px_379px_106px_0px_rgba(74,93,229,0),0px_242px_97px_0px_rgba(74,93,229,0.03),0px_136px_82px_0px_rgba(74,93,229,0.11),0px_61px_61px_0px_rgba(74,93,229,0.19),0px_15px_33px_0px_rgba(74,93,229,0.22)] w-full" />
            </div>
            <div className="relative rotate-[358deg] lg:rotate-[356deg] h-[77px] flex items-center justify-center px-3 lg:px-6">
              <p className="text-white text-sm lg:text-base font-normal leading-normal text-center" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                Make every function aesthetic and make every aesthetic serve a function
              </p>
            </div>
          </motion.div>

          {/* Other principles */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -80, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1], 
              delay: 0.48 
            }}
            className="absolute left-1/2 top-[220px] lg:top-[185px] -translate-x-1/2 w-[88%] lg:w-[616.784px]"
          >
            <div className="absolute inset-0 rotate-[2deg] lg:rotate-[4deg] scale-y-[-1]">
              <div className="bg-[rgba(255,255,255,0.96)] h-[77px] rounded-[22px] w-full" />
          </div>
            <div className="relative rotate-[2deg] lg:rotate-[4deg] h-[77px] flex items-center justify-center px-3 lg:px-6">
              <p className="text-black text-sm lg:text-base font-normal leading-normal text-center" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                If there's no value exchange - it's theft. Create value, serve a purpose
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -80, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1], 
              delay: 0.40 
            }}
            className="absolute left-1/2 top-[300px] lg:top-[275px] -translate-x-1/2 w-[85%] lg:w-[500.788px]"
          >
            <div className="absolute inset-0 rotate-[358deg] lg:rotate-[356deg]">
              <div className="bg-[rgba(0,0,0,0.64)] h-[77px] rounded-[22px] shadow-[0px_379px_106px_0px_rgba(0,0,0,0),0px_242px_97px_0px_rgba(0,0,0,0.03),0px_136px_82px_0px_rgba(0,0,0,0.06),0px_61px_61px_0px_rgba(0,0,0,0.08),0px_15px_33px_0px_rgba(0,0,0,0.12)] w-full" />
          </div>
            <div className="relative rotate-[358deg] lg:rotate-[356deg] h-[77px] flex items-center justify-center px-3 lg:px-6">
              <p className="text-white text-sm lg:text-base font-normal leading-normal text-center" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                Top-Tier communication, no assumptions
              </p>
        </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -80, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1], 
              delay: 0.32 
            }}
            className="absolute left-1/2 top-[380px] lg:top-[360px] -translate-x-1/2 w-[86%] lg:w-[509.437px]"
          >
            <div className="absolute inset-0 rotate-[2deg] lg:rotate-[4deg] scale-y-[-1]">
              <div className="bg-[rgba(255,255,255,0.72)] h-[77px] rounded-[22px] w-full" />
            </div>
            <div className="relative rotate-[2deg] lg:rotate-[4deg] h-[77px] flex items-center justify-center px-3 lg:px-6">
              <p className="text-black text-sm lg:text-base font-normal leading-normal text-center" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                Work only with ethical and high integrity people
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -80, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1], 
              delay: 0.24 
            }}
            className="absolute left-1/2 top-[460px] lg:top-[445px] -translate-x-1/2 w-[75%] lg:w-[311.843px]"
          >
            <div className="absolute inset-0 rotate-[358deg] lg:rotate-[356deg]">
              <div className="bg-[rgba(255,255,255,0.22)] h-[77px] rounded-[22px] w-full" />
            </div>
            <div className="relative rotate-[358deg] lg:rotate-[356deg] h-[77px] flex items-center justify-center px-3 lg:px-6">
              <p className="text-black text-sm lg:text-base font-normal leading-normal text-center" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                Reverse engineer everything
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -80, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1], 
              delay: 0.16 
            }}
            className="absolute left-1/2 top-[540px] lg:top-[525px] -translate-x-1/2 w-[78%] lg:w-[369.17px]"
          >
            <div className="absolute inset-0 rotate-[2deg] lg:rotate-[4deg] scale-y-[-1]">
              <div className="bg-[rgba(255,255,255,0.44)] h-[77px] rounded-[22px] w-full" />
            </div>
            <div className="relative rotate-[2deg] lg:rotate-[4deg] h-[77px] flex items-center justify-center px-3 lg:px-6">
              <p className="text-black text-sm lg:text-base font-normal leading-normal text-center" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                Be allergic to Mediocracy
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -80, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1], 
              delay: 0.08 
            }}
            className="absolute left-1/2 top-[620px] lg:top-[605px] -translate-x-1/2 w-[76%] lg:w-[330.007px]"
          >
            <div className="absolute inset-0 rotate-[358deg] lg:rotate-[356deg]">
              <div className="bg-[rgba(0,0,0,0.6)] h-[77px] rounded-[22px] w-full" />
            </div>
            <div className="relative rotate-[358deg] lg:rotate-[356deg] h-[77px] flex items-center justify-center px-3 lg:px-6">
              <p className="text-white text-sm lg:text-base font-normal leading-normal text-center" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                NO bloated MVPs
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -80, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1], 
              delay: 0 
            }}
            className="absolute left-1/2 top-[700px] lg:top-[735px] -translate-x-1/2 w-[75%] lg:w-[321.324px]"
          >
            <div className="absolute inset-0 rotate-[2deg] lg:rotate-[4deg] scale-y-[-1]">
              <div className="bg-[rgba(255,255,255,0.72)] h-[77px] rounded-[22px] w-full" />
            </div>
            <div className="relative rotate-[2deg] lg:rotate-[4deg] h-[77px] flex items-center justify-center px-3 lg:px-6">
              <p className="text-black text-sm lg:text-base font-normal leading-normal text-center" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                Details. Details. Details &gt;&gt;
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>



      {/* Footer - At the very bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2, margin: "100px" }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex justify-center w-full py-[20px] md:py-[40px] lg:py-[60px] mt-[40px] md:mt-[60px] lg:mt-[80px]"
      >
        <div className="w-full max-w-full md:max-w-[1200px] p-[22px] flex flex-col justify-start items-center gap-[20px] min-w-0">
        {/* Top Section - Title */}
        <div className="flex flex-col justify-start items-center gap-[12px]">
          <div className="text-center text-[#9F94AD] text-xl md:text-2xl lg:text-4xl font-medium italic break-words" style={{ fontFamily: 'neulis-cursive, "Neulis Cursive", Caveat, Pacifico, cursive' }}>
            lovely to see you here!
          </div>
          <div className="text-center text-white text-[100px] md:text-[150px] lg:text-[200px] font-medium break-words w-full md:w-auto leading-normal md:leading-[200px]" style={{ fontFamily: 'neulis-cursive, "Neulis Cursive", Caveat, Pacifico, cursive' }}>
            raks
          </div>
        </div>

        {/* Bottom Section - Links and Credits */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-[32px] w-full max-w-full min-w-0">
          {/* Social Links */}
          <div className="w-auto md:w-[463px] flex flex-col md:flex-row justify-center md:justify-between items-center gap-[20px] md:gap-0 h-[122px] md:h-auto">
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
      </motion.div>

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
