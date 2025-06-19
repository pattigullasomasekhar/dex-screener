import { useState } from 'react';

const timeFilters = ['5m', '1h', '6h', '24h'];

function Header({ onSearch }) {
  const [selected, setSelected] = useState('1h');

  return (
    <header className="w-full px-4 py-4 flex flex-col md:flex-row justify-between items-center border-b border-gray-700 gap-4">
      {/* Left: Title + Time Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <h1 className="text-2xl font-bold whitespace-nowrap">DEX Screener</h1>
        <div className="flex gap-2">
          {timeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setSelected(t)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selected === t ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Search */}
      <input
        type="text"
        placeholder="Search tokens..."
        onChange={(e) => onSearch(e.target.value)}
        className="px-4 py-2 bg-gray-800 text-white rounded w-full max-w-xs"
      />
    </header>
  );
}

export default Header;
