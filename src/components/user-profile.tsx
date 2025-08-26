'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface UserData {
  id: number;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export function UserProfile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/profile');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <User className="h-4 w-4 mr-2" />
        Loading...
      </Button>
    );
  }

  if (!user) {
    return (
      <Button variant="outline" size="sm">
        <User className="h-4 w-4 mr-2" />
        Guest
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">
          {user.email.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="hidden sm:block text-sm">
        <div className="font-medium">{user.email}</div>
        <div className="text-xs text-gray-500">
          {user.isAdmin ? 'Admin' : 'User'}
        </div>
      </div>
    </div>
  );
}
