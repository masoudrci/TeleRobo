import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search EAs..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 rounded-full bg-navy border-2 border-gold text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" size={20} />
    </div>
  );
};

export default SearchBar;