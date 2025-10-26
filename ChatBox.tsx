import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: number;
}

const SUGGESTION_PILLS = [
  'tell me more about ova',
  'what is your design process?',
  'what tools do you use?'
];

export const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'you can ask me here about my design process, my past projects or just get to know me better!',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [usedPills, setUsedPills] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "thanks for your message! i'd love to chat more about that.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handlePillClick = (pill: string) => {
    sendMessage(pill);
    setUsedPills(prev => new Set(prev).add(pill));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage(inputValue);
    }
  };

  return (
    <div style={{
      width: '754px',
      height: '544px',
      background: 'linear-gradient(180deg, #E9E8FF 0%, #EFF4EC 100%)',
      borderRadius: '44px',
      outline: '2px solid white',
      boxShadow: '0px 30px 66px rgba(0,0,0,0.04)',
      padding: '32px 46px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Outfit, sans-serif'
    }}>
      
      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {messages.map(message => (
          message.type === 'ai' ? (
            <div key={message.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '59px', 
                height: '59px', 
                minWidth: '59px', 
                background: '#D9D9D9', 
                borderRadius: '50%' 
              }} />
              <div style={{
                background: 'white',
                padding: '16px 24px',
                borderRadius: '20px',
                boxShadow: '0px 15px 34px rgba(40,63,228,0.04)',
                maxWidth: '426px'
              }}>
                <p style={{ fontSize: '16px', fontWeight: 300, color: 'black', margin: 0 }}>
                  {message.content}
                </p>
              </div>
            </div>
          ) : (
            <div key={message.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                background: 'rgba(0,0,0,0.79)',
                padding: '16px 24px',
                borderRadius: '20px',
                boxShadow: '0px 15px 34px rgba(40,63,228,0.04)',
                maxWidth: '395px'
              }}>
                <p style={{ fontSize: '16px', fontWeight: 300, color: 'white', textAlign: 'right', margin: 0 }}>
                  {message.content}
                </p>
              </div>
            </div>
          )
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggestion Pills */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {SUGGESTION_PILLS.map(pill => (
          <button
            key={pill}
            onClick={() => handlePillClick(pill)}
            disabled={usedPills.has(pill)}
            style={{
              background: 'rgba(255,255,255,0.10)',
              padding: '8px 36px',
              borderRadius: '2222px',
              border: 'none',
              cursor: usedPills.has(pill) ? 'default' : 'pointer',
              fontSize: '14px',
              color: 'rgba(0,0,0,0.64)',
              fontFamily: 'Outfit, sans-serif',
              transition: 'all 0.2s',
              opacity: usedPills.has(pill) ? 0.5 : 1
            }}
            onMouseEnter={(e) => !usedPills.has(pill) && (e.currentTarget.style.background = 'rgba(255,255,255,0.20)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
          >
            {pill}
          </button>
        ))}
      </div>
      
      {/* Input Box */}
      <div style={{
        width: '662px',
        height: '63px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.44) 100%)',
        borderRadius: '100px',
        outline: '1px solid white',
        boxShadow: '0px 19px 41px rgba(0,0,0,0.04)',
        padding: '6px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <input
          type="text"
          placeholder="talk 2 me"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '16px',
            color: 'rgba(0,0,0,0.88)'
          }}
        />
        <button
          onClick={() => sendMessage(inputValue)}
          style={{
            width: '50px',
            height: '50px',
            minWidth: '50px',
            background: 'white',
            borderRadius: '50%',
            border: 'none',
            boxShadow: '-1px 1px 4px rgba(40,63,228,0.04)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '-1px 1px 8px rgba(40,63,228,0.12)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '-1px 1px 4px rgba(40,63,228,0.04)')}
        >
          ↑
        </button>
      </div>
    </div>
  );
};

