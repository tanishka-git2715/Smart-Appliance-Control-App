import React, { useState } from 'react';
import { DeviceCard } from '../device-card';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { motion } from 'motion/react';
import {
  Wind,
  Tv,
  Lightbulb,
  Thermometer,
  Plus,
  Home,
  Bed,
  UtensilsCrossed,
  Sofa
} from 'lucide-react';

interface Device {
  id: string;
  name: string;
  room: string;
  type: string;
  isOn: boolean;
  status: 'success' | 'warning' | 'error';
  connection: 'ble' | 'mqtt';
  additionalInfo?: string;
}

interface DashboardProps {
  onDeviceClick: (deviceId: string) => void;
  onAddDevice: () => void;
}

export function Dashboard({ onDeviceClick, onAddDevice }: DashboardProps) {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Air Purifier Pro',
      room: 'Living Room',
      type: 'purifier',
      isOn: true,
      status: 'success',
      connection: 'mqtt',
      additionalInfo: 'Air Quality: Good'
    },
    {
      id: '2',
      name: 'Smart TV',
      room: 'Living Room',
      type: 'tv',
      isOn: false,
      status: 'success',
      connection: 'mqtt'
    },
    {
      id: '3',
      name: 'LED Strip',
      room: 'Bedroom',
      type: 'light',
      isOn: true,
      status: 'success',
      connection: 'ble',
      additionalInfo: 'Brightness: 80%'
    },
    {
      id: '4',
      name: 'AC Unit',
      room: 'Bedroom',
      type: 'ac',
      isOn: true,
      status: 'warning',
      connection: 'mqtt',
      additionalInfo: '22°C'
    },
    {
      id: '5',
      name: 'Coffee Maker',
      room: 'Kitchen',
      type: 'appliance',
      isOn: false,
      status: 'success',
      connection: 'ble'
    },
    {
      id: '6',
      name: 'Smart Lamp',
      room: 'Living Room',
      type: 'light',
      isOn: true,
      status: 'error',
      connection: 'mqtt',
      additionalInfo: 'Bulb needs replacement'
    }
  ]);

  const [selectedRoom, setSelectedRoom] = useState<string>('all');

  const handleToggle = (id: string, isOn: boolean) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, isOn } : device
    ));
  };

  const getDeviceIcon = (type: string) => {
    const icons = {
      purifier: <Wind className="w-6 h-6" />,
      tv: <Tv className="w-6 h-6" />,
      light: <Lightbulb className="w-6 h-6" />,
      ac: <Thermometer className="w-6 h-6" />,
      appliance: <UtensilsCrossed className="w-6 h-6" />
    };
    return icons[type as keyof typeof icons] || <Home className="w-6 h-6" />;
  };

  const rooms = ['all', 'Living Room', 'Bedroom', 'Kitchen'];
  const filteredDevices = selectedRoom === 'all'
    ? devices
    : devices.filter(d => d.room === selectedRoom);

  const getRoomIcon = (room: string) => {
    const icons = {
      all: <Home className="w-4 h-4" />,
      'Living Room': <Sofa className="w-4 h-4" />,
      'Bedroom': <Bed className="w-4 h-4" />,
      'Kitchen': <UtensilsCrossed className="w-4 h-4" />
    };
    return icons[room as keyof typeof icons];
  };

  const activeCount = devices.filter(d => d.isOn).length;
  const healthyCount = devices.filter(d => d.status === 'success').length;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-b from-blue-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-white mb-2">ElectraWireless</h1>
              <p className="text-gray-400">Manage your smart home</p>
            </div>
            <Button
              onClick={onAddDevice}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Device
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Devices</p>
                  <p className="text-white text-2xl">{devices.length}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Home className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Active Now</p>
                  <p className="text-white text-2xl">{activeCount}</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Wind className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Healthy</p>
                  <p className="text-white text-2xl">{healthyCount}/{devices.length}</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Thermometer className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </motion.div>
          </div>

          <Tabs value={selectedRoom} onValueChange={setSelectedRoom} className="mb-6">
            <TabsList className="bg-gray-900 border border-gray-800">
              {rooms.map(room => (
                <TabsTrigger key={room} value={room} className="data-[state=active]:bg-blue-600">
                  <span className="flex items-center gap-2">
                    {getRoomIcon(room)}
                    {room === 'all' ? 'All Rooms' : room}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDevices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <DeviceCard
                  {...device}
                  icon={getDeviceIcon(device.type)}
                  onToggle={handleToggle}
                  onClick={onDeviceClick}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
