import { motion } from 'framer-motion';

import { FineRule, Grain, StarMark, easing } from './shared';

export function ShotFive() {
  return (
    <motion.section
      className="shot shot-five"
      initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ opacity: 1, clipPath: 'circle(100% at 50% 50%)' }}
      exit={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.82, ease: easing }}
    >
      <div className="shot-five-field" />
      <Grain />
      <motion.div
        className="shot-five-head-wrap"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.56, ease: easing }}
      >
        <p className="eyebrow shot-five-eyebrow">GOOD TO KNOW</p>
        <h2 className="shot-five-headline">
          MAKE AN
          <br />
          EVENING OF IT.
        </h2>
      </motion.div>
      <FineRule className="shot-five-long-rule" color="burgundy" />
      <div className="visit-facts">
        <motion.div
          className="visit-fact"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.05, duration: 0.5, ease: easing }}
        >
          <span className="fact-kicker">FIND US</span>
          <span className="fact-value">CMF2+HR2, Sitarampuram</span>
          <span className="fact-subvalue">Seetharamapuram, Andhra Pradesh</span>
        </motion.div>
        <motion.div
          className="visit-fact fact-pair"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.42, duration: 0.5, ease: easing }}
        >
          <span className="fact-kicker">THE WORD AROUND TOWN</span>
          <span className="fact-value">4.1 / 5 <small>from 49 reviews</small></span>
        </motion.div>
        <motion.div
          className="visit-fact"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.78, duration: 0.5, ease: easing }}
        >
          <span className="fact-kicker">A GENEROUS TABLE</span>
          <span className="fact-value">₹200–₹400 <small>per person</small></span>
        </motion.div>
        <motion.div
          className="visit-fact visit-fact-last"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.14, duration: 0.5, ease: easing }}
        >
          <span className="fact-kicker">TONIGHT</span>
          <span className="fact-value">Open until 11:00 PM</span>
          <span className="fact-subvalue">Dine-in</span>
        </motion.div>
      </div>
      <motion.div
        className="shot-five-star"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.8 }}
        transition={{ delay: 2.36, type: 'spring', stiffness: 230, damping: 24 }}
      >
        <StarMark />
      </motion.div>
      <motion.p
        className="shot-five-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.58, duration: 0.5 }}
      >
        CMF2+HR2 · Sitarampuram
      </motion.p>
    </motion.section>
  );
}