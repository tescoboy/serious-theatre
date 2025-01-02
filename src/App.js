import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, User, Calendar, Search, Edit, Trash, X } from 'lucide-react';

const TheatreApp = () => {
  const [plays, setPlays] = useState([]);
  const [playName, setPlayName] = useState('');
  const [playDate, setPlayDate] = useState('');
  const [rating, setRating] = useState(0);

  const RatingInput = ({ value, onChange, readonly = false }) => {
    const handleMoonClick = (index) => {
      if (readonly) return;
      const clickedRating = index + 1;
      if (value === clickedRating) {
        onChange(clickedRating - 0.5);
      } else {
        onChange(clickedRating);
      }
    };

    const renderMoon = (index) => {
      const clickedRating = index + 1;
      const isHalf = value === clickedRating - 0.5;
      const isFull = value >= clickedRating;

      return (
        <div key={index} className="relative inline-block">
          <Moon
            className={`w-8 h-8 ${!readonly && 'cursor-pointer'} ${
              isFull || isHalf ? 'text-yellow-400' : 'text-gray-400'
            }`}
            onClick={() => handleMoonClick(index)}
          />
          {(isFull || isHalf) && (
            <div 
              className="absolute inset-0 overflow-hidden bg-yellow-400"
              style={{
                clipPath: isHalf ? 'inset(0 50% 0 0)' : 'none'
              }}
            />
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
          onClick={() => !readonly && onChange(6)}
        />
      </div>
    );
  };

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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gray-900 text-gray-100 min-h-screen">
      <Card className="bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="text-yellow-400">Add New Play</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-pink-300 mb-1">Play Name</label>
              <input
                type="text"
                value={playName}
                onChange={(e) => setPlayName(e.target.value)}
                placeholder="Enter play name"
                className="w-full p-2 rounded bg-gray-700 text-gray-100"
              />
            </div>
            <div>
              <label className="block text-pink-300 mb-1">Date</label>
              <input
                type="date"
                value={playDate}
                onChange={(e) => setPlayDate(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-gray-100"
              />
            </div>
            <div>
              <label className="block text-pink-300 mb-1">Rating</label>
              <RatingInput value={rating} onChange={setRating} />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full p-3 rounded bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              Add Play
            </button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2>All Plays</h2>
        <ul>
          {plays.map((play) => (
            <li key={play.id}>
              {play.name} - {play.date} - {play.rating === 6 ? '🕴️' : `${play.rating} 🌙`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TheatreApp;
