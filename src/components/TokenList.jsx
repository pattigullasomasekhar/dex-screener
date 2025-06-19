import { useEffect, useState } from 'react';

function TokenList({ search }) {
  const [tokens, setTokens] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [networkFilter, setNetworkFilter] = useState('all');
  const [selectedToken, setSelectedToken] = useState(null);

  const fetchTokens = async () => {
    try {
      if (tokens.length === 0) setLoading(true);

      const res = await fetch(
        'https://thingproxy.freeboard.io/fetch/https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'
      );
      const data = await res.json();

      const mapped = data
        .filter(
          (coin) =>
            coin.current_price != null &&
            coin.total_volume != null &&
            coin.market_cap != null
        )
        .map((coin, index) => {
          const spark = coin.sparkline_in_7d?.price;
          const mockSparkline = Array.from({ length: 30 }, (_, i) => {
            const base = coin.current_price;
            return base + base * (Math.sin(i / 5) * 0.02);
          });

          return {
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            marketCap: coin.market_cap,
            volume: coin.total_volume,
            liquidity: Math.floor(coin.total_volume / 10),
            txns: (Math.random() * 10).toFixed(1) + 'K',
            audit: (Math.random() * 500 + 100).toFixed(2) + '%',
            buys: Math.floor(Math.random() * 8000),
            sells: Math.floor(Math.random() * 2000),
            network: index % 2 === 0 ? 'ETH' : 'BSC',
            image: coin.image,
            sparkline: spark?.length ? spark : mockSparkline,
          };
        });

      setTokens(mapped);
    } catch (err) {
      console.error('❌ Error fetching tokens:', err);
      setTokens([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
    const interval = setInterval(fetchTokens, 10000); // refresh every 10 sec
    return () => clearInterval(interval);
  }, []);

  const getFilteredTokens = () => {
    let filtered = [...tokens];
    const query = search.trim().toLowerCase();

    if (query) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.symbol.toLowerCase().includes(query)
      );
    }

    if (networkFilter !== 'all') {
      filtered = filtered.filter(
        (t) => t.network.toLowerCase() === networkFilter.toLowerCase()
      );
    }

    if (activeTab === 'trending') {
      filtered = filtered.sort((a, b) => b.volume - a.volume).slice(0, 10);
    } else if (activeTab === 'pump') {
      filtered = filtered.sort((a, b) => b.price - a.price).slice(0, 10);
    }

    return filtered;
  };

  const filtered = getFilteredTokens();

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {['all', 'trending', 'pump'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            {tab === 'all' ? 'All' : tab === 'trending' ? 'Trending' : 'Pump Live'}
          </button>
        ))}

        <select
          value={networkFilter}
          onChange={(e) => setNetworkFilter(e.target.value)}
          className="px-4 py-2 rounded-full border text-sm font-medium text-black"
        >
          <option value="all">All Networks</option>
          <option value="ETH">Ethereum</option>
          <option value="BSC">BSC</option>
        </select>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-10 gap-4 text-sm font-semibold border-b pb-2 mb-2">
        <div className="col-span-2">Token</div>
        <div>Price</div>
        <div>Market Cap</div>
        <div>Liquidity</div>
        <div>Volume</div>
        <div>Txns</div>
        <div>Audit Log</div>
        <div>Buy/Sell</div>
        <div>Action</div>
      </div>

      {/* Token Rows */}
      {loading ? (
        <div className="text-center">Loading tokens...</div>
      ) : (
        filtered.map((token, idx) => (
          <div
            key={idx}
            className="grid grid-cols-10 gap-4 items-center border-b py-2"
          >
            <div className="col-span-2 flex items-center gap-2">
              <img src={token.image} alt={token.name} className="w-10 h-10" />
              <div>
                <div className="font-semibold">{token.name}</div>
                <div className="text-xs text-gray-400">{token.symbol}</div>
              </div>
            </div>
            <div>${token.price.toLocaleString()}</div>
            <div>${token.marketCap.toLocaleString()}</div>
            <div>${token.liquidity.toLocaleString()}</div>
            <div>${token.volume.toLocaleString()}</div>
            <div>{token.txns}</div>
            <div>{token.audit}</div>
            <div>{token.buys} / {token.sells}</div>
            <div>
              <button
                className="bg-green-600 text-white px-2 py-1 rounded"
                onClick={() => setSelectedToken(token)}
              >
                Buy
              </button>
            </div>
          </div>
        ))
      )}

      {/* Buy Modal */}
      {selectedToken && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">Confirm Purchase</h2>
            <p><strong>Token:</strong> {selectedToken.name}</p>
            <p><strong>Price:</strong> ${selectedToken.price.toLocaleString()}</p>
            <p className="mt-2">Are you sure you want to buy this token?</p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setSelectedToken(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`✅ Purchased ${selectedToken.name}!`);
                  setSelectedToken(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TokenList;
