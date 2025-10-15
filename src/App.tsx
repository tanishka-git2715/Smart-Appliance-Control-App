import React, { useState } from 'react';
import { Onboarding } from './components/screens/onboarding';
import { Dashboard } from './components/screens/dashboard';
import { DeviceControl } from './components/screens/device-control';
import { Telemetry } from './components/screens/telemetry';
import { Automation } from './components/screens/automation';
import { Maintenance } from './components/screens/maintenance';
import { Button } from './components/ui/button';
import {
  LayoutDashboard,
  BarChart3,
  Zap,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Screen = 
  | 'onboarding' 
  | 'dashboard' 
  | 'device-control' 
  | 'telemetry' 
  | 'automation' 
  | 'maintenance';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'telemetry' as Screen, label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'automation' as Screen, label: 'Automation', icon: <Zap className="w-5 h-5" /> },
    { id: 'maintenance' as Screen, label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  const handleDeviceClick = (deviceId: string) => {
    setCurrentScreen('device-control');
  };

  const handleAddDevice = () => {
    setCurrentScreen('onboarding');
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={handleBack} />;
      case 'dashboard':
        return <Dashboard onDeviceClick={handleDeviceClick} onAddDevice={handleAddDevice} />;
      case 'device-control':
        return <DeviceControl onBack={handleBack} />;
      case 'telemetry':
        return <Telemetry onBack={handleBack} />;
      case 'automation':
        return <Automation onBack={handleBack} />;
      case 'maintenance':
        return <Maintenance onBack={handleBack} />;
      default:
        return <Dashboard onDeviceClick={handleDeviceClick} onAddDevice={handleAddDevice} />;
    }
  };

  const showNavigation = !['onboarding', 'device-control'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-gray-950">
      {renderScreen()}

      {showNavigation && (
        <>
          {/* Desktop Navigation */}
          <nav className="hidden md:block fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 z-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-around py-4">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                      currentScreen === item.id
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span className="text-xs">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
            <div className="bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
              <div className="flex items-center justify-around px-4 py-3">
                {navigationItems.slice(0, 3).map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
                      currentScreen === item.id
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-gray-400'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span className="text-xs">{item.label}</span>
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-400"
                  whileTap={{ scale: 0.95 }}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  <span className="text-xs">More</span>
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 p-4"
                >
                  <Button
                    onClick={() => {
                      setCurrentScreen('maintenance');
                      setIsMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:text-white"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
