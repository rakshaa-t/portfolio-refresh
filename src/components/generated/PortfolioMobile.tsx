"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { sendToAI, getFallbackResponse, type ChatMessage } from "../../lib/ai-chat";
import { AI_CONFIG } from "../../lib/config";

export interface PortfolioMobileProps {}

const PROJECT_CARDS = [
  {
    id: 'dealdoc',
    title: 'dealdoc : deal management platform',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1761388291/656_3x_shots_so_qced29.png',
    message: "what did you like most about dealdoc's redesign"
  },
  {
    id: 'greex',
    title: 'greex : defi trading platform',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png',
    message: 'whats was ur process for greex'
  },
  {
    id: 'ova',
    title: 'ova : period tracking app',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1761388415/Slide_4_3_-_1_2_zr9r7i.png',
    message: 'what did designing ova teach you'
  },
  {
    id: 'ioc',
    title: 'ioc : vendor management app',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png',
    message: 'what was the most challenging part about ioc'
  }
] as const;

const SUGGESTION_PILLS = [
  'tell me more about ova',
  'what is your design process?',
  'what is your design tech stack?',
  'how did you get into design?',
  'what\'s your favorite project?',
  'do you take freelance work?',
  'what\'s your design philosophy?',
  'tell me about the greex project',
  'what inspired you to design?'
] as const;

export const PortfolioMobile: React.FC<PortfolioMobileProps> = (props: PortfolioMobileProps) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = React.useState<string[]>(PROJECT_CARDS.map(c => c.id));
  const [clickedPill, setClickedPill] = React.useState<string | null>(null);
  const [cardAttachments, setCardAttachments] = React.useState<{[key: string]: {image: string, title: string}}>({});

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    // Track clicked pill for animation
    if (messageText) {
      setClickedPill(messageText);
      setTimeout(() => setClickedPill(null), 200);
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'text',
      content: textToSend,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Auto-scroll to latest message
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);

    try {
      const response = await sendToAI(textToSend, messages, '');
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        type: 'text',
        content: response.message,
        sender: 'ai',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      const fallbackMessage: ChatMessage = {
        id: `ai-error-${Date.now()}`,
        type: 'text',
        content: getFallbackResponse(error),
        sender: 'ai',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (cardId: string) => {
    const card = PROJECT_CARDS.find(c => c.id === cardId);
    if (card) {
      setVisibleCards(prev => prev.filter(id => id !== cardId));
      
      // Create user message directly with card attachment
      const messageId = `user-${Date.now()}`;
      const userMessage: ChatMessage = {
        id: messageId,
        type: 'text',
        content: card.message,
        sender: 'user',
        timestamp: Date.now()
      };
      
      setCardAttachments(prev => ({
        ...prev,
        [messageId]: { image: card.image, title: card.title }
      }));
      
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      
      // Auto-scroll to latest message
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
      
      // Get AI response
      (async () => {
        try {
          const response = await sendToAI(card.message, messages, '');
          const assistantMessage: ChatMessage = {
            id: `ai-${Date.now()}`,
            type: 'text',
            content: response.message,
            sender: 'ai',
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, assistantMessage]);
        } catch (error: any) {
          const fallbackMessage: ChatMessage = {
            id: `ai-error-${Date.now()}`,
            type: 'text',
            content: getFallbackResponse(error),
            sender: 'ai',
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, fallbackMessage]);
        } finally {
          setIsLoading(false);
        }
      })();
      
      // Scroll to chat section
      setTimeout(() => {
        const chatElement = document.getElementById('mobile-chat');
        if (chatElement) {
          chatElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <div style={{width: '100%', minHeight: '100vh', position: 'relative', background: '#E3DDED', overflow: 'hidden', padding: '0 20px'}}>
      
      {/* Header Bar with blur effect */}
      <div style={{width: '100%', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50}}>
        <div style={{textAlign: 'center', color: 'white', fontSize: 36, fontFamily: 'Caveat, cursive', fontWeight: '500', wordWrap: 'break-word'}}>raks</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{width: 73, opacity: 0.44, justifyContent: 'space-between', alignItems: 'center', display: 'flex'}}>
            <a href="https://linkedin.com/in/raksha-tated" target="_blank" rel="noopener noreferrer" style={{width: 29, height: 29, position: 'relative', overflow: 'hidden'}}>
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.9583 3.625C23.5993 3.625 24.214 3.87961 24.6672 4.33283C25.1204 4.78604 25.375 5.40073 25.375 6.04167V22.9583C25.375 23.5993 25.1204 24.214 24.6672 24.6672C24.214 25.1204 23.5993 25.375 22.9583 25.375H6.04167C5.40073 25.375 4.78604 25.1204 4.33283 24.6672C3.87961 24.214 3.625 23.5993 3.625 22.9583V6.04167C3.625 5.40073 3.87961 4.78604 4.33283 4.33283C4.78604 3.87961 5.40073 3.625 6.04167 3.625H22.9583ZM22.3542 22.3542V15.95C22.3542 14.9053 21.9391 13.9033 21.2004 13.1646C20.4617 12.4259 19.4597 12.0108 18.415 12.0108C17.3879 12.0108 16.1917 12.6392 15.6117 13.5817V12.2404H12.2404V22.3542H15.6117V16.3971C15.6117 15.4667 16.3608 14.7054 17.2913 14.7054C17.7399 14.7054 18.1702 14.8836 18.4874 15.2009C18.8047 15.5181 18.9829 15.9484 18.9829 16.3971V22.3542H22.3542ZM8.31333 10.3433C8.85172 10.3433 9.36806 10.1295 9.74876 9.74876C10.1295 9.36806 10.3433 8.85172 10.3433 8.31333C10.3433 7.18958 9.43708 6.27125 8.31333 6.27125C7.77174 6.27125 7.25233 6.4864 6.86936 6.86936C6.4864 7.25233 6.27125 7.77174 6.27125 8.31333C6.27125 9.43708 7.18958 10.3433 8.31333 10.3433ZM9.99292 22.3542V12.2404H6.64583V22.3542H9.99292Z" fill="var(--color-dark-900, #020617)" />
              </svg>
            </a>
            <a href="https://twitter.com/raksha_tated" target="_blank" rel="noopener noreferrer" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M21.5859 21.375L14.0885 10.4471L14.1013 10.4574L20.8613 2.625H18.6023L13.0954 9L8.72227 2.625H2.79766L9.79723 12.8276L9.79638 12.8267L2.41406 21.375H4.67309L10.7955 14.2824L15.6613 21.375H21.5859ZM7.82719 4.32954L18.3466 19.6705H16.5564L6.02852 4.32954H7.82719Z" fill="var(--color-dark-900, #020617)" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Title Text */}
      <div style={{width: '100%', marginTop: 100, boxSizing: 'border-box'}}>
        <span style={{color: 'rgba(41.29, 41.29, 41.29, 0.88)', fontSize: 18, fontFamily: 'Nexa', fontWeight: '700', lineHeight: '20px', wordWrap: 'break-word'}}>Raksha T<br/></span>
        <span style={{color: 'rgba(41.29, 41.29, 41.29, 0.88)', fontSize: 14, fontFamily: 'Outfit', fontWeight: '300', lineHeight: '20px', wordWrap: 'break-word'}}>
          aka raks - product designer who builds products that work, look good and sell<br/><br/>
          i live in duality: lead design experiences at startups and also code frontend with cursor  to find out more  →  
        </span>
        <a href="https://cal.com/raksha-tated-v2ee58/15min" target="_blank" rel="noopener noreferrer" style={{color: 'rgba(41.29, 41.29, 41.29, 0.88)', fontSize: 14, fontFamily: 'Outfit', fontWeight: '300', textDecoration: 'underline', lineHeight: '20px', wordWrap: 'break-word'}}>let's talk</a>
        <span style={{color: 'rgba(41.29, 41.29, 41.29, 0.88)', fontSize: 14, fontFamily: 'Outfit', fontWeight: '300', lineHeight: '20px', wordWrap: 'break-word'}}>
          <br/><br/>chat with my portfolio below ↓ or explore projects here<br/>
        </span>
      </div>

      {/* Chat Component */}
      <div id="mobile-chat" style={{width: '100%', maxWidth: 'calc(100vw - 32px)', height: 514, margin: '20px auto 0', boxSizing: 'border-box'}}>
        <div style={{width: '100%', height: '100%', position: 'relative', background: 'linear-gradient(180deg, #E9E8FF 0%, #EFF4EC 100%)', boxShadow: '0px 30px 66px rgba(0, 0, 0, 0.04)', overflow: 'hidden', borderRadius: 44, outline: '2px white solid', outlineOffset: '-2px'}}>
        
        {/* Chat Messages Container */}
        <div ref={chatContainerRef} style={{position: 'absolute', top: 14, left: 12, right: 12, bottom: 150, overflowY: 'auto', overflowX: 'hidden', padding: 0}}>
          {/* Welcome Message - Always show */}
          <div style={{marginBottom: 14, paddingLeft: 16, paddingRight: 16}}>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: 8, width: '100%'}}>
              <div style={{width: 29, height: 29, background: '#D9D9D9', borderRadius: 44444, overflow: 'hidden', flexShrink: 0}}>
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/323295203727400960/assets/a162f3c9-9017-4e52-a2b7-d48614b32b0f.jpg" alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div style={{
                flex: 1,
                background: 'white',
                boxShadow: '0px 15px 34px rgba(40, 63, 228, 0.04)',
                borderRadius: '44px 44px 44px 0',
                padding: 14,
                wordWrap: 'break-word'
              }}>
                <div style={{color: 'black', fontSize: 14, fontFamily: 'Outfit', fontWeight: '300', wordWrap: 'break-word', textAlign: 'left'}}>
                  you can ask me here about my design process, my past projects or just get to know me better!
                </div>
              </div>
            </div>
          </div>

          {/* User and AI Messages */}
          {messages.map((msg) => {
            const attachment = cardAttachments[msg.id];
            return (
              <div key={msg.id} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                {/* Card Thumbnail for user messages with attachments */}
                {attachment && msg.sender === 'user' && (
                  <div style={{width: 80, height: 80, borderRadius: 12, overflow: 'hidden', marginLeft: 'auto', marginBottom: 8}}>
                    <img src={attachment.image} alt={attachment.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  </div>
                )}
                {msg.sender === 'ai' && (
                  <div style={{marginBottom: 14, paddingLeft: 16, paddingRight: 16}}>
                    <div style={{display: 'flex', alignItems: 'flex-start', gap: 8, width: '100%'}}>
                      <div style={{width: 29, height: 29, background: '#D9D9D9', borderRadius: 44444, overflow: 'hidden', flexShrink: 0}}>
                        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/323295203727400960/assets/a162f3c9-9017-4e52-a2b7-d48614b32b0f.jpg" alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                      </div>
                      <div style={{
                        flex: 1,
                        background: 'white',
                        boxShadow: '0px 15px 34px rgba(40, 63, 228, 0.04)',
                        borderRadius: '44px 44px 44px 0',
                        padding: 14,
                        wordWrap: 'break-word'
                      }}>
                        <div style={{color: 'black', fontSize: 14, fontFamily: 'Outfit', fontWeight: '300', wordWrap: 'break-word', textAlign: 'left'}}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {msg.sender === 'user' && (
                  <div style={{marginBottom: 14, paddingLeft: 16, paddingRight: 16}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                      <div style={{
                        maxWidth: '85%',
                        background: 'rgba(0, 0, 0, 0.79)',
                        boxShadow: '0px 15px 34px rgba(40, 63, 228, 0.04)',
                        borderRadius: '44px 44px 0 44px',
                        padding: 14,
                        wordWrap: 'break-word'
                      }}>
                        <div style={{
                          color: 'white',
                          fontSize: 14,
                          fontFamily: 'Outfit',
                          fontWeight: '300',
                          textAlign: 'right'
                        }}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div style={{display: 'flex', justifyContent: 'flex-start', marginBottom: 14}}>
              <div style={{
                background: 'white',
                boxShadow: '0px 15px 34px rgba(40, 63, 228, 0.04)',
                borderRadius: '44px 44px 0 44px',
                padding: 14
              }}>
                <div style={{color: 'black', fontSize: 14, fontFamily: 'Outfit', fontWeight: '300'}}>
                  ...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Pills & Input - Fixed at bottom */}
        <div style={{width: 'calc(100% - 40px)', position: 'absolute', left: 20, bottom: 30, flexDirection: 'column', gap: 15, display: 'flex'}}>
          {/* Input Box */}
          <div style={{width: '100%', height: 63, paddingLeft: 22, paddingRight: 22, paddingTop: 6, paddingBottom: 6, background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.44) 100%)', boxShadow: '0px 19px 41px rgba(0, 0, 0, 0.04)', borderRadius: 100, outline: '1px white solid', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, flex: 1}}>
              {/* Sparkle Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.5 6L18 7.5L13.5 9L12 13.5L10.5 9L6 7.5L10.5 6L12 2Z" fill="#283FE4" opacity="0.8" />
                <path d="M19 10L20.5 14L24 15.5L20.5 17L19 21.5L17.5 17L14 15.5L17.5 14L19 10Z" fill="#283FE4" opacity="0.6" />
              </svg>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="talk 2 me"
                disabled={isLoading}
                style={{flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'rgba(0, 0, 0, 0.44)', fontSize: 14, fontFamily: 'Outfit', fontWeight: '400'}}
              />
            </div>
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              style={{width: 38, height: 38, padding: 13, background: 'white', boxShadow: '-1px 1px 4px rgba(40, 63, 228, 0.04)', borderRadius: 3333, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
              <ArrowUp style={{width: 19, height: 19, color: '#283FE4', strokeWidth: 2}} />
            </button>
          </div>

          {/* Suggestion Pills - Below Input */}
          <div style={{width: '100%', overflowX: 'auto', display: 'flex', gap: 12, scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {SUGGESTION_PILLS.map((pill, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(pill)}
                disabled={isLoading}
                style={{
                  padding: '8px 20px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 2222,
                  border: '1px solid white',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transform: clickedPill === pill ? 'scale(0.95)' : 'scale(1)',
                  transition: 'transform 0.1s ease'
                }}
              >
                <div style={{color: 'rgba(0, 0, 0, 0.64)', fontSize: 14, fontFamily: 'Outfit', fontWeight: '400'}}>
                  {pill}
                </div>
              </button>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* My Projects Label */}
      <div style={{textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'Nexa', fontWeight: '400', wordWrap: 'break-word', marginTop: 40, marginBottom: 20}}>
        My projects
      </div>

      {/* Project Cards */}
      <div style={{width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 30, display: 'flex', marginBottom: 60}}>
        {PROJECT_CARDS.map((card, index) => {
          if (!visibleCards.includes(card.id)) return null;
          
          const rotation = index % 2 === 0 ? 15 : -15;
          
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              style={{
                width: 263,
                height: 266,
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: 44,
                outline: '1px white solid',
                cursor: 'pointer',
                transform: `rotate(${rotation}deg)`
              }}
            >
              <img style={{width: 263, height: 266, position: 'absolute', objectFit: 'cover', borderRadius: 44}} src={card.image} alt={card.title} />
              <div style={{
                position: 'absolute',
                top: 16,
                left: 20,
                width: 'auto',
                maxWidth: '85%',
                background: 'rgba(255, 255, 255, 0.40)',
                backdropFilter: 'blur(10px)',
                padding: '8px 16px',
                borderRadius: 20,
                color: 'rgba(0, 0, 0, 0.8)',
                fontSize: 14,
                fontFamily: 'Nexa',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                {card.title}
              </div>
            </div>
          );
        })}
      </div>


      {/* Footer */}
      <div style={{width: '100%', padding: 22, marginTop: 100, marginBottom: 100, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex'}}>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'flex'}}>
          <div style={{textAlign: 'center', color: '#433556', fontSize: 20, fontFamily: 'Caveat, cursive', fontStyle: 'italic', fontWeight: '500', wordWrap: 'break-word'}}>
            lovely to see you here!
          </div>
          <div style={{width: 242, height: 113, color: 'white', fontSize: 100, fontFamily: 'Caveat, cursive', fontWeight: '500', wordWrap: 'break-word', textAlign: 'center'}}>
            raks
          </div>
        </div>
        <div style={{width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 40, display: 'flex'}}>
          <div style={{width: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: 12, display: 'flex'}}>
            <a href="https://linkedin.com/in/raksha-tated" target="_blank" rel="noopener noreferrer" style={{textAlign: 'center', color: '#433556', fontSize: 12, fontFamily: 'Geist Mono', fontWeight: '500', textDecoration: 'underline', wordWrap: 'break-word'}}>Linkedin</a>
            <a href="https://twitter.com/raksha_tated" target="_blank" rel="noopener noreferrer" style={{textAlign: 'center', color: '#433556', fontSize: 12, fontFamily: 'Geist Mono', fontWeight: '500', textDecoration: 'underline', wordWrap: 'break-word'}}>X</a>
            <a href="https://contra.com/raksha_tated" target="_blank" rel="noopener noreferrer" style={{textAlign: 'center', color: '#433556', fontSize: 12, fontFamily: 'Geist Mono', fontWeight: '500', textDecoration: 'underline', wordWrap: 'break-word'}}>Contra</a>
            <a href="https://medium.com/@raksha" target="_blank" rel="noopener noreferrer" style={{textAlign: 'center', color: '#433556', fontSize: 12, fontFamily: 'Geist Mono', fontWeight: '500', textDecoration: 'underline', wordWrap: 'break-word'}}>Medium</a>
            <a href="mailto:hey@raksha.design" style={{textAlign: 'center', color: '#433556', fontSize: 12, fontFamily: 'Geist Mono', fontWeight: '500', textDecoration: 'underline', wordWrap: 'break-word'}}>hey@raksha.design</a>
          </div>
          <div style={{width: '100%', textAlign: 'center'}}>
            <span style={{color: '#433556', fontSize: 12, fontFamily: 'Geist Mono', fontWeight: '500', wordWrap: 'break-word'}}>
              Designed and coded by me and cursor<br/> → 
            </span>
            <span style={{color: '#433556', fontSize: 12, fontFamily: 'Geist Mono', fontWeight: '500', textDecoration: 'underline', wordWrap: 'break-word'}}>
              View process
            </span>
          </div>
        </div>
      </div>

      <style>{`
        /* Hide scrollbar for suggestion pills */
        div[style*="overflowX: 'auto'"]::-webkit-scrollbar {
          display: none;
        }
        div[style*="overflowX: 'auto'"] {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

