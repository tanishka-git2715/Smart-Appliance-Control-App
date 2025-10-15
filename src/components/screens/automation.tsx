import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Plus,
  Clock,
  Zap,
  Thermometer,
  Wind,
  Sun,
  Moon,
  Trash2
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  type: 'timer' | 'trigger';
  enabled: boolean;
  condition: string;
  action: string;
  icon: React.ReactNode;
}

interface AutomationProps {
  onBack: () => void;
}

export function Automation({ onBack }: AutomationProps) {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Morning Fresh Air',
      type: 'timer',
      enabled: true,
      condition: 'Every day at 7:00 AM',
      action: 'Turn on Air Purifier (Eco mode)',
      icon: <Sun className="w-5 h-5" />
    },
    {
      id: '2',
      name: 'Night Mode',
      type: 'timer',
      enabled: true,
      condition: 'Every day at 10:00 PM',
      action: 'Set all devices to Sleep mode',
      icon: <Moon className="w-5 h-5" />
    },
    {
      id: '3',
      name: 'Temperature Control',
      type: 'trigger',
      enabled: true,
      condition: 'If temperature > 28°C',
      action: 'Turn on AC Unit (22°C)',
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      id: '4',
      name: 'Air Quality Alert',
      type: 'trigger',
      enabled: false,
      condition: 'If PM2.5 > 50 µg/m³',
      action: 'Turn on Air Purifier (Turbo mode)',
      icon: <Wind className="w-5 h-5" />
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    type: 'timer' as 'timer' | 'trigger',
    name: '',
    condition: '',
    action: ''
  });

  const handleToggleRule = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleCreateRule = () => {
    const newRuleObj: AutomationRule = {
      id: String(Date.now()),
      name: newRule.name,
      type: newRule.type,
      enabled: true,
      condition: newRule.condition,
      action: newRule.action,
      icon: newRule.type === 'timer' ? <Clock className="w-5 h-5" /> : <Zap className="w-5 h-5" />
    };
    setRules([...rules, newRuleObj]);
    setIsCreateDialogOpen(false);
    setNewRule({ type: 'timer', name: '', condition: '', action: '' });
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-6">
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
            <h1 className="text-white">Automation & Scheduling</h1>
            <p className="text-gray-400 text-sm">Create smart rules and schedules</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-5 h-5 mr-2" />
                New Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create Automation Rule</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Rule Type</label>
                  <Select
                    value={newRule.type}
                    onValueChange={(value: 'timer' | 'trigger') =>
                      setNewRule({ ...newRule, type: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-950 border-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-950 border-gray-800">
                      <SelectItem value="timer">Time-based (Timer)</SelectItem>
                      <SelectItem value="trigger">Event-based (Smart Trigger)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Rule Name</label>
                  <Input
                    value={newRule.name}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                    placeholder="e.g., Morning Routine"
                    className="bg-gray-950 border-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    {newRule.type === 'timer' ? 'When (Time)' : 'If (Condition)'}
                  </label>
                  <Input
                    value={newRule.condition}
                    onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                    placeholder={
                      newRule.type === 'timer'
                        ? 'e.g., Every day at 8:00 AM'
                        : 'e.g., If temperature > 25°C'
                    }
                    className="bg-gray-950 border-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Then (Action)</label>
                  <Input
                    value={newRule.action}
                    onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                    placeholder="e.g., Turn on Air Purifier"
                    className="bg-gray-950 border-gray-800"
                  />
                </div>

                <Button
                  onClick={handleCreateRule}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!newRule.name || !newRule.condition || !newRule.action}
                >
                  Create Rule
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-800/50 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Time-based Rules</p>
                <p className="text-white text-2xl">
                  {rules.filter(r => r.type === 'timer').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/10 border border-purple-800/50 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Smart Triggers</p>
                <p className="text-white text-2xl">
                  {rules.filter(r => r.type === 'trigger').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-gray-900 border-gray-800 p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    rule.type === 'timer' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                  }`}>
                    <div className={rule.type === 'timer' ? 'text-blue-400' : 'text-purple-400'}>
                      {rule.icon}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white">{rule.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            rule.type === 'timer'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-purple-500/20 text-purple-400'
                          }`}>
                            {rule.type === 'timer' ? 'Timer' : 'Trigger'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {rule.type === 'timer' ? 'When: ' : 'If: '}
                          <span className="text-gray-300">{rule.condition}</span>
                        </p>
                        <p className="text-gray-400 text-sm">
                          Then: <span className="text-gray-300">{rule.action}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteRule(rule.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {rule.enabled && (
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded">
                        <p className="text-emerald-300 text-xs">✓ Active and monitoring</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="bg-gray-900 border-gray-800 p-6 mt-6">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h3 className="text-white mb-2">Smart Automation Tips</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Time-based rules run on a schedule (e.g., daily at 8:00 AM)</li>
                <li>• Event-based triggers respond to conditions (e.g., temperature, air quality)</li>
                <li>• Combine multiple rules to create complex automation flows</li>
                <li>• All rules execute locally with &lt;200ms response time</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
