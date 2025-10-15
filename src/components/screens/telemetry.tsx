import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Zap,
  Activity,
  TrendingDown,
  AlertCircle,
  Calendar
} from 'lucide-react';

interface TelemetryProps {
  onBack: () => void;
}

export function Telemetry({ onBack }: TelemetryProps) {
  const [timeRange, setTimeRange] = useState('day');

  const energyData = [
    { time: '00:00', usage: 0.8, cost: 0.12 },
    { time: '04:00', usage: 0.5, cost: 0.08 },
    { time: '08:00', usage: 1.2, cost: 0.18 },
    { time: '12:00', usage: 2.1, cost: 0.32 },
    { time: '16:00', usage: 1.8, cost: 0.27 },
    { time: '20:00', usage: 2.5, cost: 0.38 },
    { time: '23:59', usage: 1.3, cost: 0.20 }
  ];

  const deviceUsageData = [
    { name: 'Air Purifier', value: 35, color: '#3b82f6' },
    { name: 'AC Unit', value: 28, color: '#8b5cf6' },
    { name: 'LED Lights', value: 15, color: '#10b981' },
    { name: 'Smart TV', value: 12, color: '#f59e0b' },
    { name: 'Others', value: 10, color: '#6b7280' }
  ];

  const healthMetrics = [
    { label: 'Air Filter', value: 78, status: 'success' as const, estimate: '~3 months' },
    { label: 'Fan Motor', value: 92, status: 'success' as const, estimate: '~2 years' },
    { label: 'UV Lamp', value: 45, status: 'warning' as const, estimate: '~6 weeks' },
    { label: 'Sensor Array', value: 88, status: 'success' as const, estimate: '~18 months' }
  ];

  const getStatusColor = (status: string) => {
    return status === 'success' ? 'text-emerald-400' : 
           status === 'warning' ? 'text-amber-400' : 
           'text-red-400';
  };

  const getProgressColor = (status: string) => {
    return status === 'success' ? 'bg-emerald-500' : 
           status === 'warning' ? 'bg-amber-500' : 
           'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-6">
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
            <h1 className="text-white">Monitoring & Telemetry</h1>
            <p className="text-gray-400 text-sm">Real-time analytics and device health</p>
          </div>
          <Button variant="outline" className="border-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-800/50 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-emerald-400 text-sm">-12%</span>
            </div>
            <p className="text-gray-400 text-sm">Total Energy</p>
            <p className="text-white text-2xl">8.4 kWh</p>
            <p className="text-gray-500 text-xs">Today</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-purple-900/40 to-purple-900/10 border border-purple-800/50 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <span className="text-emerald-400 text-sm">100%</span>
            </div>
            <p className="text-gray-400 text-sm">Uptime</p>
            <p className="text-white text-2xl">30d</p>
            <p className="text-gray-500 text-xs">Last month</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-emerald-900/40 to-emerald-900/10 border border-emerald-800/50 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 text-sm">-$2.50</span>
            </div>
            <p className="text-gray-400 text-sm">Est. Cost</p>
            <p className="text-white text-2xl">$12.40</p>
            <p className="text-gray-500 text-xs">This week</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-amber-900/40 to-amber-900/10 border border-amber-800/50 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 text-sm">1 Alert</span>
            </div>
            <p className="text-gray-400 text-sm">Maintenance</p>
            <p className="text-white text-2xl">UV Lamp</p>
            <p className="text-gray-500 text-xs">Needs attention</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gray-900 border-gray-800 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white">Energy Consumption</h2>
              <Tabs value={timeRange} onValueChange={setTimeRange}>
                <TabsList className="bg-gray-950 border border-gray-800">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#energyGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <h2 className="text-white mb-6">Device Usage</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deviceUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {deviceUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {deviceUsageData.map((device, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: device.color }}
                    />
                    <span className="text-gray-300">{device.name}</span>
                  </div>
                  <span className="text-gray-400">{device.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="bg-gray-900 border-gray-800 p-6">
          <h2 className="text-white mb-6">Component Health & Life Expectancy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{metric.label}</span>
                  <span className={getStatusColor(metric.status)}>
                    {metric.value}%
                  </span>
                </div>
                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${getProgressColor(metric.status)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <p className="text-gray-500 text-xs">{metric.estimate}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
