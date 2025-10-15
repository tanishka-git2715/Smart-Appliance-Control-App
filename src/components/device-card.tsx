import React from 'react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { StatusBadge } from './status-badge';
import { motion } from 'motion/react';
import { Wifi, Bluetooth } from 'lucide-react';

type ConnectionType = 'ble' | 'mqtt';
type StatusType = 'success' | 'warning' | 'error';

export interface DeviceCardProps {
  id: string;
  name: string;
  room: string;
  isOn: boolean;
  status: StatusType;
  connection: ConnectionType;
  icon: React.ReactNode;
  additionalInfo?: string;
  onToggle: (id: string, isOn: boolean) => void;
  onClick?: (id: string) => void;
}

export function DeviceCard({
  id,
  name,
  room,
  isOn,
  status,
  connection,
  icon,
  additionalInfo,
  onToggle,
  onClick
}: DeviceCardProps) {
  const handleToggle = (checked: boolean) => {
    onToggle(id, checked);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Card
        className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
        onClick={() => onClick?.(id)}
      >
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className={`p-2 rounded-lg ${isOn ? 'bg-blue-500/20' : 'bg-gray-800'}`}
                animate={{
                  backgroundColor: isOn ? 'rgba(59, 130, 246, 0.2)' : 'rgba(31, 41, 55, 1)'
                }}
                transition={{ duration: 0.15 }}
              >
                <div className={isOn ? 'text-blue-400' : 'text-gray-500'}>
                  {icon}
                </div>
              </motion.div>
              <div>
                <h3 className="text-white">{name}</h3>
                <p className="text-gray-400 text-sm">{room}</p>
              </div>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <Switch
                checked={isOn}
                onCheckedChange={handleToggle}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status={status} showIcon={false} />
              <div className="flex items-center gap-1 text-xs text-gray-500">
                {connection === 'ble' ? (
                  <>
                    <Bluetooth className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400">Local</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3 h-3 text-purple-400" />
                    <span className="text-purple-400">Cloud</span>
                  </>
                )}
              </div>
            </div>
            {additionalInfo && (
              <span className="text-xs text-gray-400">{additionalInfo}</span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
