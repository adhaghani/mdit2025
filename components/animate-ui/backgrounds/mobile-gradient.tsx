'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type MobileGradientBackgroundProps = React.ComponentProps<'div'> & {
  colors?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
};

function MobileGradientBackground({
  className,
  children,
  colors = {
    first: '18,113,255',    // Blue
    second: '221,74,255',   // Purple
    third: '0,220,255',     // Cyan
    fourth: '180,180,50',   // Yellow
  },
  ...props
}: MobileGradientBackgroundProps) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        '--first-color': colors.first,
        '--second-color': colors.second,
        '--third-color': colors.third,
        '--fourth-color': colors.fourth,
      } as React.CSSProperties}
      {...props}
    >
      {/* Static gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(${colors.first}, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(${colors.second}, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(${colors.third}, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, rgba(${colors.first}, 0.05) 0%, rgba(${colors.second}, 0.05) 100%)
          `,
        }}
      />

      {/* Floating elements for aesthetic */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <motion.div
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(${colors.first}, 0.3) 0%, transparent 70%)`,
            top: '10%',
            left: '10%',
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
        
        <motion.div
          className="absolute w-24 h-24 rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, rgba(${colors.second}, 0.4) 0%, transparent 70%)`,
            top: '20%',
            right: '15%',
          }}
          animate={{
            y: [5, -15, 5],
            x: [3, -3, 3],
          }}
          transition={{
            duration: 12,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 2,
          }}
        />

        <motion.div
          className="absolute w-16 h-16 rounded-full opacity-25"
          style={{
            background: `radial-gradient(circle, rgba(${colors.third}, 0.5) 0%, transparent 70%)`,
            bottom: '25%',
            left: '20%',
          }}
          animate={{
            y: [-8, 12, -8],
            x: [-4, 4, -4],
          }}
          transition={{
            duration: 10,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 4,
          }}
        />

        <motion.div
          className="absolute w-20 h-20 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(${colors.fourth}, 0.3) 0%, transparent 70%)`,
            bottom: '15%',
            right: '25%',
          }}
          animate={{
            y: [6, -10, 6],
            x: [2, -6, 2],
          }}
          transition={{
            duration: 14,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 1,
          }}
        />

        {/* Subtle geometric shapes */}
        <motion.div
          className="absolute w-8 h-8 opacity-10"
          style={{
            background: `linear-gradient(45deg, rgba(${colors.first}, 0.6), rgba(${colors.second}, 0.6))`,
            top: '60%',
            left: '70%',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute w-6 h-6 opacity-15"
          style={{
            background: `rgba(${colors.third}, 0.4)`,
            top: '40%',
            right: '40%',
            borderRadius: '2px',
          }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 16,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 3,
          }}
        />
      </div>

      {children}
    </div>
  );
}

export { MobileGradientBackground, type MobileGradientBackgroundProps };
