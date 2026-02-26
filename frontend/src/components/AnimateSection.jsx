import { motion } from 'framer-motion';

export default function AnimateSection({ children, className = '', style = {}, delay = 0 }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      whileHover={{ y: -2 }}
    >
      {children}
    </motion.div>
  );
}


