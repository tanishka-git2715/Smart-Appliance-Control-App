import React, { useState } from 'react';
import { Slider } from './ui/slider';
import { motion } from 'motion/react';

interface RealTimeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  icon?: React.ReactNode;
}

export function RealTimeSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  icon
}: RealTimeSliderProps) {
  const [isChanging, setIsChanging] = useState(false);

  const handleChange = (values: number[]) => {
    setIsChanging(true);
    onChange(values[0]);
    setTimeout(() => setIsChanging(false), 200);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-gray-300">{label}</span>
        </div>
        <motion.span
          className="text-blue-400"
          animate={{
            scale: isChanging ? 1.1 : 1,
            color: isChanging ? '#60a5fa' : '#3b82f6'
          }}
          transition={{ duration: 0.15 }}
        >
          {value}{unit}
        </motion.span>
      </div>
      <div className="relative">
        <Slider
          value={[value]}
          onValueChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          animate={{
            opacity: isChanging ? 0.3 : 0
          }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-full h-full bg-blue-500 rounded-full blur-sm" />
        </motion.div>
      </div>
    </div>
  );
}
