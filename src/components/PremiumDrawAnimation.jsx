import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, PartyPopper } from 'lucide-react';

const PremiumDrawAnimation = ({ participants, onComplete }) => {
  const [phase, setPhase] = useState('countdown'); // countdown, fast, medium, slow, reveal
  const [currentName, setCurrentName] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Phase 1: Countdown (3 seconds)
    if (phase === 'countdown') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setPhase('fast');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }

    // Phase 2: Fast shuffle (10 seconds)
    if (phase === 'fast') {
      const timer = setInterval(() => {
        setCurrentName(participants[Math.floor(Math.random() * participants.length)]);
      }, 50);
      setTimeout(() => setPhase('medium'), 10000);
      return () => clearInterval(timer);
    }

    // Phase 3: Medium shuffle (8 seconds)
    if (phase === 'medium') {
      const timer = setInterval(() => {
        setCurrentName(participants[Math.floor(Math.random() * participants.length)]);
      }, 150);
      setTimeout(() => setPhase('slow'), 8000);
      return () => clearInterval(timer);
    }

    // Phase 4: Slow shuffle (6 seconds)
    if (phase === 'slow') {
      const timer = setInterval(() => {
        setCurrentName(participants[Math.floor(Math.random() * participants.length)]);
      }, 400);
      setTimeout(() => {
        const finalWinner = participants[Math.floor(Math.random() * participants.length)];
        setWinner(finalWinner);
        setPhase('reveal');
        setShowConfetti(true);
      }, 6000);
      return () => clearInterval(timer);
    }

    // Phase 5: Winner reveal (3 seconds display then callback)
    if (phase === 'reveal' && winner) {
      setTimeout(() => {
        if (onComplete) onComplete(winner);
      }, 3000);
    }
  }, [phase, participants, winner, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
                scale: 0,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: Math.random() * 720,
                scale: 1,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: 'linear',
                delay: Math.random() * 0.5,
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#FF6B9D', '#FFA8D5', '#FFD700', '#FF8C42', '#9D4EDD'][i % 5],
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-6">
        <AnimatePresence mode="wait">
          {/* Countdown Phase */}
          {phase === 'countdown' && countdown > 0 && (
            <motion.div
              key="countdown"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-[180px] md:text-[240px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-gold via-soft-orange to-soft-pink leading-none"
              >
                {countdown}
              </motion.div>
              <p className="text-2xl md:text-3xl text-white font-semibold mt-4">
                Draw Starting...
              </p>
            </motion.div>
          )}

          {/* Shuffle Phases (fast, medium, slow) */}
          {(phase === 'fast' || phase === 'medium' || phase === 'slow') && (
            <motion.div
              key="shuffle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8"
            >
              {/* Animated Icon */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className="flex justify-center"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gold via-soft-orange to-soft-pink rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
              </motion.div>

              {/* Name Display */}
              <motion.div
                key={currentName}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-white/20"
              >
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
                >
                  {currentName || 'Shuffling...'}
                </motion.p>
              </motion.div>

              {/* Status Text */}
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xl md:text-2xl text-gray-300 font-medium"
              >
                {phase === 'fast' && 'Shuffling participants...'}
                {phase === 'medium' && 'Finding the winner...'}
                {phase === 'slow' && 'Almost there...'}
              </motion.p>
            </motion.div>
          )}

          {/* Winner Reveal */}
          {phase === 'reveal' && winner && (
            <motion.div
              key="reveal"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="text-center space-y-8"
            >
              {/* Trophy Icon */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="flex justify-center"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-gold via-yellow-400 to-gold rounded-full flex items-center justify-center shadow-2xl shadow-gold/50">
                  <Trophy className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
              </motion.div>

              {/* Congratulations Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-soft-orange to-soft-pink mb-4">
                  🎉 Congratulations! 🎉
                </h2>
              </motion.div>

              {/* Winner Name Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 30px rgba(255, 215, 0, 0.5)',
                      '0 0 60px rgba(255, 215, 0, 0.8)',
                      '0 0 30px rgba(255, 215, 0, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-gradient-to-br from-gold/20 via-soft-orange/20 to-soft-pink/20 backdrop-blur-xl rounded-3xl p-10 md:p-14 border-4 border-gold"
                >
                  <p className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
                    {winner}
                  </p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="h-1 bg-gradient-to-r from-gold via-soft-orange to-gold mx-auto mb-4"
                  />
                  <p className="text-2xl md:text-3xl text-gray-200 font-semibold">
                    Winner!
                  </p>
                </motion.div>
              </motion.div>

              {/* Sparkle Icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-center gap-4"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <PartyPopper className="w-8 h-8 text-gold" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PremiumDrawAnimation;
