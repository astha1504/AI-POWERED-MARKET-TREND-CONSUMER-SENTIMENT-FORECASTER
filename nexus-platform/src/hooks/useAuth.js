import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);

  const login = (email) => {
    const name = email ? email.split('@')[0] : 'User';
    const cap  = name.charAt(0).toUpperCase() + name.slice(1);
    setUser({
      firstName: cap,
      lastName:  '',
      email:     email || 'user@nexus.ai',
      role:      'Analyst',
    });
  };

  const register = (firstName, lastName, email, role) => {
    setUser({
      firstName: firstName || 'User',
      lastName:  lastName  || '',
      email:     email     || 'user@nexus.ai',
      role:      (role && role !== 'Select your role') ? role : 'Analyst',
    });
  };

  const logout = () => setUser(null);

  const getDisplayName = () => {
    if (!user) return 'User';
    return (user.firstName + ' ' + user.lastName).trim();
  };

  const getInitials = () => {
    if (!user) return 'U';
    const first = user.firstName?.[0] || '';
    const last  = user.lastName?.[0]  || '';
    return (first + last).toUpperCase() || 'U';
  };

  return {
    user,
    login,
    register,
    logout,
    getDisplayName,
    getInitials,
  };
}