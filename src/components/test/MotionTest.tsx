import { motion } from "motion/react"

export function MotionTest() {
  return (
    <div style={{ 
      padding: '40px', 
      display: 'flex', 
      gap: '20px',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0a0a0a'
    }}>
      <h1 style={{ color: 'white', fontFamily: 'system-ui' }}>
        Motion Library Test
      </h1>

      {/* Test 1: Simple Drag */}
      <motion.div
        drag
        style={{
          width: 120,
          height: 120,
          backgroundColor: "#283fe4",
          borderRadius: 16,
          cursor: "grab",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        Drag me!
      </motion.div>

      {/* Test 2: Button Press Effect */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, y: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        style={{
          width: 160,
          height: 60,
          backgroundColor: "#dd00ee",
          border: 'none',
          borderRadius: 12,
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Press Me
      </motion.button>

      {/* Test 3: Animated Entry */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: 200,
          height: 80,
          backgroundColor: "#00ee88",
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
          fontWeight: 'bold'
        }}
      >
        I animated in!
      </motion.div>

      <p style={{ color: '#666', fontSize: '14px', marginTop: '20px' }}>
        ✅ Motion library is working!
      </p>
    </div>
  )
}

