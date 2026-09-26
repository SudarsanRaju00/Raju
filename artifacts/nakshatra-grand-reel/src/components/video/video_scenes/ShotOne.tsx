import { motion } from 'framer-motion';

import { FineRule, Grain, IMG, Orbit, easing } from './shared';

export function ShotOne() {
  return (
    <motion.section
      className="shot shot-one"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
      transition={{ duration: 0.75, ease: easing }}
    >
      <motion.div
        className="shot-photo shot-one-photo"
        initial={{ scale: 1.18, filter: 'blur(10px)' }}
        animate={{ scale: 1.03, filter: 'blur(0px)' }}
        exit={{ scale: 2.4, opacity: 0, filter: 'blur(14px)' }}
        transition={{ duration: 4.1, ease: easing }}
      >
        <img src={IMG('hero-thali.jpg')} alt="" />
      </motion.div>
      <div className="shot-overlay shot-one-overlay" />
      <Grain dark />
      <Orbit className="shot-one-orbit" size="large" />
      <FineRule className="shot-one-rule" />
      <motion.p
        className="eyebrow shot-one-eyebrow"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.18, duration: 0.5, ease: easing }}
      >
        A TABLE FOR THE EVENING
      </motion.p>
      <motion.div
        className="hero-words shot-one-words"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.36, duration: 0.4 }}
      >
        <motion.span
          className="hero-word hero-word-cream"
          initial={{ opacity: 0, y: 40, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.48, type: 'spring', stiffness: 280, damping: 24 }}
        >
          COME
        </motion.span>
        <motion.span
          className="hero-word hero-word-cream"
          initial={{ opacity: 0, y: 36, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.95, type: 'spring', stiffness: 280, damping: 24 }}
        >
          hungry.
        </motion.span>
        <motion.span
          className="hero-word hero-word-gold hero-word-italic"
          initial={{ opacity: 0, y: 46, scale: 0.84, rotate: -4 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 1.68, type: 'spring', stiffness: 260, damping: 24 }}
        >
          Leave
        </motion.span>
        <motion.span
          className="hero-word hero-word-gold hero-word-italic"
          initial={{ opacity: 0, y: 44, scale: 0.86, rotate: -4 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 2.04, type: 'spring', stiffness: 260, damping: 24 }}
        >
          glowing.
        </motion.span>
      </motion.div>
      <motion.p
        className="shot-copy shot-one-copy"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.72, duration: 0.55, ease: easing }}
      >
        Andhra’s generous flavours, served with the polish of an evening worth
        dressing up for.
      </motion.p>
      <motion.p
        className="telugu-copy shot-one-telugu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.02, duration: 0.55 }}
      >
        రుచితో నిండిన ఒక అందమైన సాయంత్రం
      </motion.p>
      <motion.div
        className="shot-one-seal"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 3.2, opacity: 0 }}
        transition={{ delay: 0.55, duration: 0.9, ease: easing }}
      >
        <span>N</span>
      </motion.div>
    </motion.section>
  );
}