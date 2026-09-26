import { motion } from 'framer-motion';

import { FineRule, Grain, StarMark, easing } from './shared';

export function ShotSix() {
  return (
    <motion.section
      className="shot shot-six"
      initial={{ opacity: 0, y: '7%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
      transition={{ duration: 0.72, ease: easing }}
    >
      <div className="shot-six-field" />
      <Grain />
      <motion.div
        className="final-star"
        initial={{ rotate: -90, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 45, scale: 3.4, opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.72, ease: easing }}
      >
        <StarMark />
      </motion.div>
      <motion.p
        className="final-wordmark"
        initial={{ opacity: 0, y: 30, letterSpacing: '0.36em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.18em' }}
        transition={{ delay: 0.42, duration: 0.78, ease: easing }}
      >
        NAKSHATRA
      </motion.p>
      <motion.p
        className="final-submark"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.92, duration: 0.55, ease: easing }}
      >
        GRAND RESTAURANT
      </motion.p>
      <FineRule className="final-rule" color="burgundy" />
      <motion.p
        className="telugu-copy final-telugu"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.28, duration: 0.55, ease: easing }}
      >
        నక్షత్ర గ్రాండ్ రెస్టారెంట్
      </motion.p>
      <motion.p
        className="final-promise"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ delay: 1.72, duration: 0.68, ease: easing }}
      >
        Come hungry.
        <br />
        <em>Leave glowing.</em>
      </motion.p>
      <motion.p
        className="final-location"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.52, duration: 0.5 }}
      >
        SITARAMPURAM, ANDHRA PRADESH
      </motion.p>
      <motion.div
        className="final-loop-carrier"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 4, opacity: 0 }}
        transition={{ delay: 0.48, duration: 0.82, ease: easing }}
      />
    </motion.section>
  );
}