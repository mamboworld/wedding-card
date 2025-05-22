import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

type ToggleSectionProps = {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  icon?: React.ReactNode;
  titleClassName?: string;
  customBgColor?: string;
  noPadding?: boolean;
};

const ToggleSection: React.FC<ToggleSectionProps> = ({
  title,
  children,
  initiallyOpen = false,
  icon,
  titleClassName = '',
  customBgColor = 'bg-amber-50',
  noPadding = false,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 bg-gray-50 rounded-lg shadow-sm overflow-hidden">
      <motion.button
        className={`w-full p-4 flex justify-between items-center ${customBgColor} ${titleClassName}`}
        onClick={toggleOpen}
        whileTap={{ scale: 0.98 }}
        whileHover={{ backgroundColor: customBgColor === 'bg-white' ? '#fef3c7' : '#fde68a' }}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span className="text-lg font-korean-title text-amber-800">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 0 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-amber-600"
        >
          {isOpen ? (
            <ChevronUpIcon className="h-6 w-6" />
          ) : (
            <ChevronDownIcon className="h-6 w-6" />
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={noPadding ? "bg-white" : "p-4 bg-white"}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToggleSection; 