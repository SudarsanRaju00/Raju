import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { FineRule, Grain, IMG, easing } from './shared';
import { useSceneTimer } from '@/lib/video';

const PLATES = [
  { image: 'gongura-mutton.jpg', label: 'GONGURA MUTTON', className: 'plate-mutton' },
  { image: 'dosa-table.jpg', label: 'CRISP DOSA', className: 'plate-dosa' },
  { image: 'hero-thali.jpg', label: 'A TABLE FOR ALL', className: 'plate-thali' },
];

export function ShotThree() {
  const [plateIndex, setPlateIndex] = useState(0);

  useSceneTimer([
    { time: 1080, callback: () => setPlateIndex(1) },
    { time: 2180, callback: () => setPlateIndex(2) },
  ]);

  const plate = PLATES[plateIndex];

  return (
    <motion.section
      className="shot shot-three"
      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
      transition={{ duration: 0.72, ease: easing }}
    >
      <Grain dark />
      <motion.div
        className="shot-three-bg"
        initial={{ scale: 1.18 }}
        animate={{ scale: 1 }}
        exit={{ scale: 2.8, opacity: 0 }}
        transition={{ duration: 4.45, ease: easing }}
      >
        <img src={IMG(plate.image)} alt="" />
      </motion.div>
      <div className="shot-three-vignette" />
      <FineRule className="shot-three-top-rule" />
      <motion.p
        className="eyebrow shot-three-eyebrow"
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.45, ease: easing }}
      >
        ANDHRA,
      </motion.p>
      <motion.p
        className="shot-three-headline"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easing }}
      >
        SERVED.
      </motion.p>
      <AnimatePresence mode="sync">
        <motion.div
          key={plateIndex}
          className={`plate-label ${plate.className}`}
          initial={{ opacity: 0, y: 28, letterSpacing: '0.16em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.28em' }}
          exit={{ opacity: 0, y: -24, letterSpacing: '0.08em' }}
          transition={{ duration: 0.46, ease: easing }}
        >
          <span className="plate-index">0{plateIndex + 1}</span>
          <span>{plate.label}</span>
        </motion.div>
      </AnimatePresence>
      <motion.div
        className="shot-three-side-rule"
        animate={{ height: ['16%', '42%', '25%'] }}
        transition={{ duration: 4.2, ease: 'easeInOut' }}
      />
      <motion.p
        className="shot-three-footer"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: easing }}
      >
        Three plates. One generous table.
      </motion.p>
    </motion.section>
  );
}