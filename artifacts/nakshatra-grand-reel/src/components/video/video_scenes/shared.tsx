import { motion } from 'framer-motion';

export const IMG = (name: string) =>
  `${import.meta.env.BASE_URL}images/${name}`;

export const easing = [0.16, 1, 0.3, 1] as const;

export function Grain({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`grain ${dark ? 'grain-dark' : ''}`}
    />
  );
}

export function FineRule({
  className = '',
  color = 'gold',
}: {
  className?: string;
  color?: 'gold' | 'burgundy' | 'cream';
}) {
  return (
    <span
      aria-hidden="true"
      className={`fine-rule fine-rule-${color} ${className}`}
    />
  );
}

export function Orbit({
  className = '',
  size = 'medium',
}: {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`orbit orbit-${size} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
    >
      <span className="orbit-dot" />
    </motion.span>
  );
}

export function StarMark({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`star-mark ${className}`}>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}