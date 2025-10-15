import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { RealTimeSlider } from '../real-time-slider';
import { StatusBadge } from '../status-badge';
import { Switch } from '../ui/switch';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Wind,
  Power,
  Zap,
  Timer,
  Moon,
  Home,
  Bluetooth,
  Wifi
} from 'lucide-react';

interface DeviceControlProps {
  onBack: () => void;
}

export function DeviceControl({ onBack }: DeviceControlProps) {
  const [isOn, setIsOn] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(3);
  const [autoMode, setAutoMode] = useState(false);
  const [connection, setConnection] = useState<'ble' | 'mqtt'>('mqtt');

  const presets = [
    { id: 'auto', label: 'Auto', icon: <Zap className="w-5 h-5" /> },
    { id: 'sleep', label: 'Sleep', icon: <Moon className="w-5 h-5" /> },
    { id: 'turbo', label: 'Turbo', icon: <Wind className="w-5 h-5" /> },
    { id: 'eco', label: 'Eco', icon: <Home className="w-5 h-5" /> }
  ];

  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handlePresetClick = (presetId: string) => {
    setActivePreset(presetId);
    if (presetId === 'auto') {
      setAutoMode(true);
      setFanSpeed(2);
    } else if (presetId === 'sleep') {
      setFanSpeed(1);
      setAutoMode(false);
    } else if (presetId === 'turbo') {
      setFanSpeed(5);
      setAutoMode(false);
    } else if (presetId === 'eco') {
      setFanSpeed(2);
      setAutoMode(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-2xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-white">Air Purifier Pro</h1>
            <p className="text-gray-400 text-sm">Living Room</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="success" />
            <div className="flex items-center gap-1 text-xs">
              {connection === 'ble' ? (
                <>
                  <Bluetooth className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400">BLE</span>
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400">MQTT</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  className={`p-3 rounded-lg ${isOn ? 'bg-blue-500/20' : 'bg-gray-800'}`}
                  animate={{
                    backgroundColor: isOn ? 'rgba(59, 130, 246, 0.2)' : 'rgba(31, 41, 55, 1)'
                  }}
                >
                  <Power className={`w-8 h-8 ${isOn ? 'text-blue-400' : 'text-gray-500'}`} />
                </motion.div>
                <div>
                  <p className="text-white">Power Status</p>
                  <p className={`text-sm ${isOn ? 'text-emerald-400' : 'text-gray-500'}`}>
                    {isOn ? 'Running' : 'Standby'}
                  </p>
                </div>
              </div>
              <Switch
                checked={isOn}
                onCheckedChange={setIsOn}
                className="scale-125"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-950 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Air Quality</p>
                <p className="text-emerald-400 text-xl">Good</p>
                <p className="text-gray-500 text-xs">PM2.5: 12 µg/m³</p>
              </div>
              <div className="p-4 bg-gray-950 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Filter Life</p>
                <p className="text-blue-400 text-xl">78%</p>
                <p className="text-gray-500 text-xs">~3 months left</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <h3 className="text-white mb-4">Quick Presets</h3>
            <div className="grid grid-cols-4 gap-3">
              {presets.map(preset => (
                <motion.button
                  key={preset.id}
                  onClick={() => handlePresetClick(preset.id)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    activePreset === preset.id
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'bg-gray-950 border-gray-800 hover:border-gray-700'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className={activePreset === preset.id ? 'text-blue-400' : 'text-gray-400'}>
                    {preset.icon}
                  </div>
                  <p className={`text-xs mt-2 ${
                    activePreset === preset.id ? 'text-blue-400' : 'text-gray-400'
                  }`}>
                    {preset.label}
                  </p>
                </motion.button>
              ))}
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <h3 className="text-white mb-6">Manual Control</h3>
            <div className="space-y-6">
              <RealTimeSlider
                label="Fan Speed"
                value={fanSpeed}
                onChange={setFanSpeed}
                min={1}
                max={5}
                step={1}
                icon={<Wind className="w-5 h-5 text-blue-400" />}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Auto Mode</span>
                </div>
                <Switch
                  checked={autoMode}
                  onCheckedChange={setAutoMode}
                />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white">Timer</p>
                  <p className="text-gray-400 text-sm">Schedule auto shut-off</p>
                </div>
              </div>
              <Button variant="outline" className="border-gray-700">
                Set Timer
              </Button>
            </div>
          </Card>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <Bluetooth className="w-4 h-4" />
              <span>Local control active - Response time: &lt;150ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
