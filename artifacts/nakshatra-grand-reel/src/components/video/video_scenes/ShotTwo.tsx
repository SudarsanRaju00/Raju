import { motion } from 'framer-motion';

import { FineRule, Grain, easing } from './shared';

export function ShotTwo() {
  return (
    <motion.section
      className="shot shot-two"
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.8, ease: easing }}
    >
      <div className="shot-two-burgundy" />
      <Grain />
      <motion.div
        className="paper-panel paper-panel-top"
        initial={{ y: '-104%', rotateX: -16 }}
        animate={{ y: '0%', rotateX: 0 }}
        exit={{ y: '-108%', rotateX: -10 }}
        transition={{ delay: 0.12, duration: 0.78, ease: easing }}
      />
      <motion.div
        className="paper-panel paper-panel-bottom"
        initial={{ y: '104%', rotateX: 16 }}
        animate={{ y: '0%', rotateX: 0 }}
        exit={{ y: '108%', rotateX: 10 }}
        transition={{ delay: 0.12, duration: 0.78, ease: easing }}
      />
      <FineRule className="shot-two-fold" color="burgundy" />
      <motion.p
        className="eyebrow shot-two-eyebrow"
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={{ opacity: 1, letterSpacing: '0.26em' }}
        transition={{ delay: 0.58, duration: 0.7, ease: easing }}
      >
        A LITTLE MORE THAN
      </motion.p>
      <motion.h2
        className="shot-two-headline"
        initial={{ opacity: 0, scale: 1.2, filter: 'blur(9px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.72, duration: 0.78, ease: easing }}
      >
        DINNER.
      </motion.h2>
      <motion.p
        className="telugu-copy shot-two-telugu"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.38, duration: 0.55, ease: easing }}
      >
        నక్షత్ర గ్రాండ్ రెస్టారెంట్
      </motion.p>
      <motion.p
        className="shot-two-support shot-two-support-one"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.12, duration: 0.55, ease: easing }}
      >
        Andhra’s generous flavours.
      </motion.p>
      <motion.p
        className="shot-two-support shot-two-support-two"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.52, duration: 0.55, ease: easing }}
      >
        Served with polish.
      </motion.p>
      <motion.span
        className="shot-two-fold-mark"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ delay: 0.35, duration: 0.6, ease: easing }}
      />
    </motion.section>
  );
}