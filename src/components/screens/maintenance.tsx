import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Download,
  Shield,
  Users,
  UserPlus,
  Crown,
  User,
  Mail,
  Trash2,
  CheckCircle2
} from 'lucide-react';

interface UserAccess {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  devices: number;
  lastActive: string;
}

interface MaintenanceProps {
  onBack: () => void;
}

export function Maintenance({ onBack }: MaintenanceProps) {
  const [updateProgress, setUpdateProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user' | 'guest'
  });

  const [users, setUsers] = useState<UserAccess[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      devices: 6,
      lastActive: '2 min ago'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      devices: 3,
      lastActive: '1 hour ago'
    },
    {
      id: '3',
      name: 'Guest User',
      email: 'guest@example.com',
      role: 'guest',
      devices: 1,
      lastActive: '2 days ago'
    }
  ]);

  const handleStartUpdate = () => {
    setIsUpdating(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUpdateProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUpdating(false);
          setUpdateProgress(0);
        }, 1000);
      }
    }, 200);
  };

  const handleAddUser = () => {
    const newUserObj: UserAccess = {
      id: String(Date.now()),
      ...newUser,
      devices: 0,
      lastActive: 'Just now'
    };
    setUsers([...users, newUserObj]);
    setIsAddUserDialogOpen(false);
    setNewUser({ name: '', email: '', role: 'user' });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const getRoleIcon = (role: string) => {
    if (role === 'admin') return <Crown className="w-4 h-4" />;
    if (role === 'user') return <User className="w-4 h-4" />;
    return <Users className="w-4 h-4" />;
  };

  const getRoleBadge = (role: string) => {
    const config = {
      admin: { className: 'bg-purple-500/20 text-purple-400 border-purple-500/40', label: 'Admin' },
      user: { className: 'bg-blue-500/20 text-blue-400 border-blue-500/40', label: 'User' },
      guest: { className: 'bg-gray-500/20 text-gray-400 border-gray-500/40', label: 'Guest' }
    };
    const { className, label } = config[role as keyof typeof config];
    return (
      <Badge variant="outline" className={className}>
        {getRoleIcon(role)}
        <span className="ml-1">{label}</span>
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 py-6">
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
            <h1 className="text-white">Maintenance & Access Control</h1>
            <p className="text-gray-400 text-sm">Manage firmware updates and user permissions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gray-900 border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Download className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-white">OTA Firmware Updates</h2>
                <p className="text-gray-400 text-sm">Keep your devices up to date</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-950 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Current Version</span>
                  <span className="text-white">v2.4.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Latest Version</span>
                  <span className="text-emerald-400">v2.5.0</span>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-300 text-sm mb-2">What's New in v2.5.0:</p>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Improved BLE connection stability</li>
                  <li>• Enhanced energy monitoring accuracy</li>
                  <li>• New automation triggers</li>
                  <li>• Security patches and bug fixes</li>
                </ul>
              </div>

              {isUpdating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Updating...</span>
                    <span className="text-blue-400 text-sm">{updateProgress}%</span>
                  </div>
                  <Progress value={updateProgress} />
                  <p className="text-gray-500 text-xs">
                    ⚠️ Do not turn off your device during update
                  </p>
                </motion.div>
              )}

              {updateProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Update completed successfully!</span>
                  </div>
                </motion.div>
              )}

              <Button
                onClick={handleStartUpdate}
                disabled={isUpdating}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                {isUpdating ? 'Updating...' : 'Update All Devices'}
              </Button>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-white">Security Settings</h2>
                <p className="text-gray-400 text-sm">Manage device security</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-950 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">End-to-End Encryption</p>
                    <p className="text-gray-500 text-xs">AES-256 encryption enabled</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Secure Boot</p>
                    <p className="text-gray-500 text-xs">Verified firmware signatures</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">2FA Authentication</p>
                    <p className="text-gray-500 text-xs">Two-factor auth enabled</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              <Button variant="outline" className="w-full border-gray-700">
                Security Audit Report
              </Button>
            </div>
          </Card>
        </div>

        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-white">User Management (RBAC)</h2>
                <p className="text-gray-400 text-sm">Role-based access control</p>
              </div>
            </div>
            <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Name</label>
                    <Input
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Enter name"
                      className="bg-gray-950 border-gray-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email</label>
                    <Input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="email@example.com"
                      className="bg-gray-950 border-gray-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Role</label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value: 'admin' | 'user' | 'guest') =>
                        setNewUser({ ...newUser, role: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-950 border-gray-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-950 border-gray-800">
                        <SelectItem value="admin">Admin - Full access</SelectItem>
                        <SelectItem value="user">User - Standard access</SelectItem>
                        <SelectItem value="guest">Guest - Limited access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleAddUser}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={!newUser.name || !newUser.email}
                  >
                    Add User
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-gray-950 border-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-900 rounded-full">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white">{user.name}</h3>
                          {getRoleBadge(user.role)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </span>
                          <span>•</span>
                          <span>{user.devices} devices</span>
                          <span>•</span>
                          <span className="text-gray-500">Active {user.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    {user.role !== 'admin' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm mb-2">Role Permissions:</p>
            <ul className="text-blue-200 text-xs space-y-1">
              <li>• <strong>Admin:</strong> Full control, user management, firmware updates</li>
              <li>• <strong>User:</strong> Control all devices, view analytics, create automations</li>
              <li>• <strong>Guest:</strong> View-only access, limited device control</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
