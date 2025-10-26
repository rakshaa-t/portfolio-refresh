import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface Card {
  id: string;
  title: string;
  image: string;
  message: string;
  initialPosition: { left?: number; right?: number; top: number };
  rotation: number;
}

const CARDS: Card[] = [
  {
    id: 'ova',
    title: 'ova : period tracking app',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1761388415/Slide_4_3_-_1_2_zr9r7i.png',
    message: 'what did designing ova teach you',
    initialPosition: { left: 0, top: 92 },
    rotation: -15
  },
  {
    id: 'ioc',
    title: 'ioc : vendor management app',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png',
    message: 'what was the most challenging part about ioc',
    initialPosition: { left: 52, top: 318 },
    rotation: 5
  },
  {
    id: 'greex',
    title: 'greex : defi trading platform',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png',
    message: 'what was your process for greex',
    initialPosition: { right: 0, top: 0 },
    rotation: 15
  },
  {
    id: 'dealdoc',
    title: 'dealdoc : deal management platform',
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1761388291/656_3x_shots_so_qced29.png',
    message: 'what did the clients request for exactly?',
    initialPosition: { right: 60, top: 341 },
    rotation: -15
  }
];

interface ProjectCardsProps {
  onCardDrop?: (message: string, cardId: string) => void;
}

export const ProjectCards: React.FC<ProjectCardsProps> = ({ onCardDrop }) => {
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [droppedCards, setDroppedCards] = useState<Set<string>>(new Set());

  const handleDragStart = (cardId: string) => {
    setDraggedCard(cardId);
  };

  const handleDragEnd = (cardId: string, info: PanInfo) => {
    setDraggedCard(null);

    // Check if dropped in drop zone (center area ~754x544px)
    const dropZone = {
      left: window.innerWidth / 2 - 377,
      right: window.innerWidth / 2 + 377,
      top: 150,
      bottom: 694
    };

    const isInDropZone =
      info.point.x >= dropZone.left &&
      info.point.x <= dropZone.right &&
      info.point.y >= dropZone.top &&
      info.point.y <= dropZone.bottom;

    if (isInDropZone) {
      const card = CARDS.find(c => c.id === cardId);
      if (card && onCardDrop) {
        onCardDrop(card.message, cardId);
      }
      setDroppedCards(prev => new Set(prev).add(cardId));
    }
  };

  return (
    <div style={{ position: 'relative', width: '1200px', height: '650px', margin: '0 auto' }}>
      
      {/* Drop Zone Indicator */}
      {draggedCard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '29px',
            transform: 'translateX(-50%)',
            width: '754px',
            height: '544px',
            background: 'rgba(40,63,228,0.1)',
            border: '3px dashed #283FE4',
            borderRadius: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#283FE4',
            fontWeight: 600,
            zIndex: 50,
            pointerEvents: 'none'
          }}
        >
          Drop to add to chat
        </motion.div>
      )}

      {/* Cards */}
      {CARDS.map(card => (
        !droppedCards.has(card.id) && (
          <motion.div
            key={card.id}
            drag
            dragMomentum={false}
            onDragStart={() => handleDragStart(card.id)}
            onDragEnd={(_, info) => handleDragEnd(card.id, info)}
            initial={{ 
              ...card.initialPosition, 
              rotate: card.rotation 
            }}
            whileHover={{ 
              boxShadow: '0px 20px 50px rgba(0,0,0,0.15)',
              scale: 1.02
            }}
            whileDrag={{ 
              rotate: 0, 
              scale: 1.05,
              zIndex: 100
            }}
            style={{
              position: 'absolute',
              width: '263px',
              height: '266px',
              background: 'rgba(255,255,255,0.30)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '44px',
              outline: '1px solid white',
              padding: '28px',
              cursor: draggedCard === card.id ? 'grabbing' : 'grab',
              zIndex: draggedCard === card.id ? 100 : 1
            }}
          >
            <p style={{
              fontFamily: 'Nexa, sans-serif',
              fontSize: '14px',
              color: 'rgba(0,0,0,0.6)',
              margin: '0 0 20px 0',
              pointerEvents: 'none'
            }}>
              {card.title}
            </p>
            <img 
              src={card.image} 
              alt={card.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '44px',
                outline: '1px solid white',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            />
          </motion.div>
        )
      ))}
    </div>
  );
};

