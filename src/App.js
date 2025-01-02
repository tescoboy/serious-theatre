import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, User, Calendar, Search, Edit, Trash, X } from 'lucide-react';

const TheatreApp = () => {
  const [plays, setPlays] = useState([]);
  const [playName, setPlayName] = useState('');
  const [playDate, setPlayDate] = useState('');
  const [rating, setRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPlay, setEditingPlay] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const itemsPerPage = 10;

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

  const getFilteredPlays = () => {
    return plays
      .filter(play => play.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const modifier = sortDirection === 'asc' ? 1 : -1;
        if (sortField === 'date') {
          return modifier * (new Date(a.date) - new Date(b.date));
        }
        return modifier * (String(a[sortField]).localeCompare(String(b[sortField])));
      });
  };

  const getPaginatedPlays = () => {
    const filtered = getFilteredPlays();
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  };

  const getTotalPages = () => {
    return Math.ceil(getFilteredPlays().length / itemsPerPage);
  };

  const EditModal = () => {
    if (!showEditModal || !editingPlay) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 text-gray-100 rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Play</h2>
            <X className="cursor-pointer" onClick={() => setShowEditModal(false)} />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Play Name</label>
              <input
                type="text"
                value={editingPlay.name}
                onChange={(e) => setEditingPlay({...editingPlay, name: e.target.value})}
                className="w-full p-2 rounded bg-gray-700 text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={editingPlay.date}
                onChange={(e) => setEditingPlay({...editingPlay, date: e.target.value})}
                className="w-full p-2 rounded bg-gray-700 text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <RatingInput
                value={editingPlay.rating}
                onChange={(value) => setEditingPlay({...editingPlay, rating: value})}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setPlays(plays.map(p => p.id === editingPlay.id ? editingPlay : p));
                  setShowEditModal(false);
                }}
                className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setPlays(plays.filter(p => p.id !== editingPlay.id));
                  setShowEditModal(false);
                }}
                className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete Play
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getCurrentYear = () => new Date().getFullYear();
  const getCurrentMonth = () => new Date().getMonth();

  const getStats = () => {
    const now = new Date();
    const thisYear = plays.filter(play => new Date(play.date).getFullYear() === getCurrentYear());
    const thisMonth = thisYear.filter(play => new Date(play.date).getMonth() === getCurrentMonth());
    const upcoming = plays.filter(play => new Date(play.date) > now);
    const unrated = plays.filter(play => new Date(play.date) < now && !play.rating);
    const hallOfFame = plays.filter(play => play.rating === 5 || play.rating === 6);

    return { thisYear, thisMonth, upcoming, unrated, hallOfFame };
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gray-900 text-gray-100 min-h-screen">
      {/* Input Section */}
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
              <label className="block text-pink-300 mb-1">
                Rating (click same moon again for half moon)
              </label>
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

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Play Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Total Plays: {plays.length}</p>
              <p>This Year: {getStats().thisYear.length}</p>
              <p>This Month: {getStats().thisMonth.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Upcoming Plays ({getStats().upcoming.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getStats().upcoming.map(play => (
                <div key={play.id} className="p-3 bg-gray-700 rounded flex justify-between items-center">
                  <div>
                    <h3>{play.name}</h3>
                    <p className="text-sm text-gray-400">{play.date}</p>
                  </div>
                  <Edit
                    className="cursor-pointer"
                    onClick={() => {
                      setEditingPlay(play);
                      setShowEditModal(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Unrated Plays ({getStats().unrated.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getStats().unrated.map(play => (
                <div key={play.id} className="p-3 bg-gray-700 rounded flex justify-between items-center">
                  <div>
                    <h3>{play.name}</h3>
                    <p className="text-sm text-gray-400">{play.date}</p>
                  </div>
                  <Edit
                    className="cursor-pointer"
                    onClick={() => {
                      setEditingPlay(play);
                      setShowEditModal(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Plays */}
      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle>Recent Plays</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plays
              .filter(play => new Date(play.date) <= new Date())
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 6)
              .map(play => (
                <div key={play.id} className="p-3 bg-gray-700 rounded">
                  <div className="flex justify-between">
                    <h3>{play.name}</h3>
                    <Edit
                      className="cursor-pointer"
                      onClick={() => {
                        setEditingPlay(play);
                        setShowEditModal(true);
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-400">{play.date}</p>
                  <RatingInput value={play.rating} onChange={() => {}} readonly />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Hall of Fame */}
      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle>Hall of Fame</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getStats().hallOfFame.map(play => (
              <div key={play.id} className="p-3 bg-gray-700 rounded">
                <div className="flex justify-between">
                  <h3>{play.name}</h3>
                  <RatingInput value={play.rating} onChange={() => {}} readonly />
                </div>
                <p className="text-sm text-gray-400">{play.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Plays */}
      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle>All Plays</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search plays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded bg-gray-700 flex-1"
              />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="p-2 rounded bg-gray-700"
              >
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>
              <button
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="p-2 rounded bg-gray-700"
              >
                {sortDirection === 'asc' ? '↑' : '↓'}
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Rating</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedPlays().map(play => (
                  <tr key={play.id} className="border-t border-gray-700">
                    <td className="p-2">{play.name}</td>
                    <td className="p-2">{play.date}</td>
                    <td className="p-2">
                      <RatingInput value={play.rating} onChange={() => {}} readonly />
                    </td>
                    <td className="p-2">
                      <Edit
                        className="cursor-pointer"
                        onClick={() => {
                          setEditingPlay(play);
                          setShowEditModal(true);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded bg-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {getTotalPages()}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === getTotalPages()}
                className="p-2 rounded bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <EditModal />
    </div>
  );
};

export default TheatreApp;                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Rating</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedPlays().map(play => (
                  <tr key={play.id} className="border-t border-gray-700">
                    <td className="p-2">{play.name}</td>
                    <td className="p-2">{play.date}</td>
                    <td className="p-2">
                      <RatingInput value={play.rating} onChange={() => {}} readonly />
                    </td>
                    <td className="p-2">
                      <Edit
                        className="cursor-pointer"
                        onClick={() => {
                          setEditingPlay(play);
                          setShowEditModal(true);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded bg-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {getTotalPages()}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === getTotalPages()}
                className="p-2 rounded bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <EditModal />
    </div>
  );
};

export default TheatreApp;
