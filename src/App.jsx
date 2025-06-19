import { useState } from 'react';
import Header from './components/Header';
import TokenList from './components/TokenList';

function App() {
  const [search, setSearch] = useState('');

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen w-full">
      <Header onSearch={setSearch} />
      <TokenList search={search} />
    </div>
  );
}

export default App;
