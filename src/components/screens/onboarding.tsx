import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, Bluetooth, Wifi, CheckCircle2, Loader2 } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [isProvisioning, setIsProvisioning] = useState(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStep(2);
    }, 2000);
  };

  const handleProvision = () => {
    setIsProvisioning(true);
    setTimeout(() => {
      setIsProvisioning(false);
      setStep(3);
    }, 3000);
  };

  const handleNetworkConfig = () => {
    setTimeout(() => {
      setStep(4);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-white text-center">Add New Device</h1>
          <Progress value={progress} className="h-1" />
          <p className="text-gray-400 text-center text-sm">Step {step} of {totalSteps}</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gray-900 border-gray-800 p-8">
                <div className="space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="p-4 bg-blue-500/20 rounded-full">
                      <QrCode className="w-16 h-16 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white mb-2">Scan QR Code</h2>
                    <p className="text-gray-400 text-sm">
                      Point your camera at the QR code on your device to begin setup
                    </p>
                  </div>
                  <div className="h-48 bg-gray-950 rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center">
                    {isScanning ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Loader2 className="w-8 h-8 text-blue-400" />
                      </motion.div>
                    ) : (
                      <p className="text-gray-600">Camera viewfinder</p>
                    )}
                  </div>
                  <Button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isScanning ? 'Scanning...' : 'Start Scan'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gray-900 border-gray-800 p-8">
                <div className="space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="p-4 bg-blue-500/20 rounded-full">
                      <Bluetooth className="w-16 h-16 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white mb-2">BLE Secure Provisioning</h2>
                    <p className="text-gray-400 text-sm">
                      Establishing secure Bluetooth connection with your device
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-950 rounded-lg">
                      <Bluetooth className="w-5 h-5 text-blue-400" />
                      <div className="flex-1 text-left">
                        <p className="text-white text-sm">Device: ElectraWireless-A4F2</p>
                        <p className="text-gray-500 text-xs">Signal: Strong</p>
                      </div>
                      {isProvisioning && (
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                      )}
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-300 text-xs">
                        🔒 Secure pairing ensures encrypted communication between your device and phone
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleProvision}
                    disabled={isProvisioning}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isProvisioning ? 'Pairing...' : 'Pair Device'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gray-900 border-gray-800 p-8">
                <div className="space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="p-4 bg-purple-500/20 rounded-full">
                      <Wifi className="w-16 h-16 text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white mb-2">Network Configuration</h2>
                    <p className="text-gray-400 text-sm">
                      Connecting your device to Wi-Fi network
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-950 rounded-lg text-left">
                      <p className="text-gray-400 text-xs mb-1">Network</p>
                      <p className="text-white">Home_WiFi_5G</p>
                    </div>
                    <div className="p-3 bg-gray-950 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Connection Progress</span>
                        <span className="text-blue-400 text-sm">75%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                  </div>
                  <Button
                    onClick={handleNetworkConfig}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Configure Network
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-900 border-gray-800 p-8">
                <div className="space-y-6 text-center">
                  <motion.div
                    className="flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <div className="p-4 bg-emerald-500/20 rounded-full">
                      <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                    </div>
                  </motion.div>
                  <div>
                    <h2 className="text-white mb-2">Setup Complete!</h2>
                    <p className="text-gray-400 text-sm">
                      Your device has been successfully added to ElectraWireless
                    </p>
                  </div>
                  <div className="p-4 bg-gray-950 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Device Name</span>
                      <span className="text-white text-sm">Air Purifier Pro</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Room</span>
                      <span className="text-white text-sm">Living Room</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Connection</span>
                      <span className="text-purple-400 text-sm">Wi-Fi (Cloud)</span>
                    </div>
                  </div>
                  <Button
                    onClick={onComplete}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
