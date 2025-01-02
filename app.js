import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, User, Calendar, Search, Edit, Trash, X, Wifi, WifiOff } from 'lucide-react';

// First, define the RatingInput component
const RatingInput = ({ value, onChange, readonly = false }) => {
  const getMoonState = (position) => {
    const fullMoons = Math.floor(value);
    const hasHalf = value % 1 !== 0;
    
    if (position < fullMoons) return 'full';
    if (position === fullMoons && hasHalf) return 'half';
    return 'empty';
  };

  const handleMoonClick = (position) => {
    if (readonly) return;

    const currentState = getMoonState(position);
    
    switch (currentState) {
      case 'empty':
        onChange(position + 1);
        break;
      case 'full':
        onChange(position + 0.5);
        break;
      case 'half':
        onChange(position);
        break;
      default:
        break;
    }
  };

  const renderMoon = (position) => {
    const state = getMoonState(position);
    
    return (
      <div key={position} className="relative inline-block">
        <Moon
          className={`w-8 h-8 ${!readonly && 'cursor-pointer'} ${
            state === 'empty' ? 'text-gray-400' : 'text-yellow-400'
          }`}
          onClick={() => handleMoonClick(position)}
        />
        
        {state === 'half' && (
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
            }}
          >
            <Moon className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3, 4].map(renderMoon)}
      <User
        className={`w-8 h-8 ${!readonly && 'cursor-pointer'} ${
          value === 6 ? 'text-yellow-400' : 'text-gray-400'
        }`}
        onClick={() => !readonly && onChange(value === 6 ? 0 : 6)}
      />
    </div>
  );
};

// Then define the main TheatreApp component
const TheatreApp = () => {
  const [plays, setPlays] = useState(() => {
    const saved = localStorage.getItem('theatreAppPlays');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [playName, setPlayName] = useState('');
  const [playDate, setPlayDate] = useState('');
  const [rating, setRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPlay, setEditingPlay] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const itemsPerPage = 10;

  // Save to localStorage whenever plays change
  useEffect(() => {
    localStorage.setItem('theatreAppPlays', JSON.stringify(plays));
  }, [plays]);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Continue with the rest of your component...
  const handleSubmit = () => {
    if (!playName.trim() || !playDate) {
      alert('Please fill in both play name and date');
      return;
    }

    const newPlay = {
      id: Date.now(),
      name: playName.trim(),
      date: playDate,
      rating: rating
    };

    setPlays(prevPlays => [...prevPlays, newPlay]);
    setPlayName('');
    setPlayDate('');
    setRating(0);
  };

  // Rest of your component code...

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gray-900 text-gray-100 min-h-screen">
      {/* Rest of your JSX */}
    </div>
  );
};

export default TheatreApp;
