import { motion } from 'framer-motion';

import { FineRule, Grain, IMG, Orbit, easing } from './shared';

export function ShotFour() {
  return (
    <motion.section
      className="shot shot-four"
      initial={{ opacity: 0, clipPath: 'circle(8% at 50% 55%)' }}
      animate={{ opacity: 1, clipPath: 'circle(100% at 50% 55%)' }}
      exit={{ opacity: 0, clipPath: 'circle(8% at 50% 55%)', scale: 1.12 }}
      transition={{ duration: 0.88, ease: easing }}
    >
      <div className="shot-four-field" />
      <Grain dark />
      <motion.div
        className="shot-four-photo"
        initial={{ scale: 1.45, filter: 'blur(12px)', rotate: -2 }}
        animate={{ scale: 1.05, filter: 'blur(0px)', rotate: 0 }}
        exit={{ scale: 3.3, filter: 'blur(15px)', opacity: 0 }}
        transition={{ duration: 4.36, ease: easing }}
      >
        <img src={IMG('hero-thali.jpg')} alt="" />
      </motion.div>
      <Orbit className="shot-four-orbit" size="large" />
      <motion.div
        className="shot-four-light"
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '100%', opacity: [0, 0.6, 0] }}
        transition={{ delay: 0.7, duration: 2.4, ease: 'easeInOut' }}
      />
      <motion.p
        className="shot-four-headline"
        initial={{ opacity: 0, y: 38, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.68, duration: 0.72, ease: easing }}
      >
        LEAVE
        <br />
        <em>glowing.</em>
      </motion.p>
      <motion.p
        className="shot-four-support"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.42, duration: 0.55, ease: easing }}
      >
        A table worth dressing up for.
      </motion.p>
      <FineRule className="shot-four-rule" />
      <motion.p
        className="shot-four-label"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.02, type: 'spring', stiffness: 260, damping: 22 }}
      >
        DINE-IN
      </motion.p>
    </motion.section>
  );
}