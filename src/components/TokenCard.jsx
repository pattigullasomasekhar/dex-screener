import { useState } from 'react';

function TokenCard({ token }) {
  const [showModal, setShowModal] = useState(false);

  const handleBuyClick = () => setShowModal(true);
  const handleCancel = () => setShowModal(false);
  const handleConfirm = () => {
    alert(`✅ You purchased ${token.name}`);
    setShowModal(false);
  };

  return (
    <>
      <div className="border-b py-6 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 dark:text-white">
        {/* Left: Token Image + Info */}
        <div className="flex items-center gap-4 min-w-[180px]">
          <img src={token.image} alt={token.name} className="w-16 h-16" />
          <div>
            <h2 className="text-lg font-bold">{token.name} ({token.symbol})</h2>
            <p className="text-md font-semibold text-white">${token.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Center: Token Stats */}
        <div className="grid grid-cols-4 sm:grid-cols-7 text-center w-full gap-4 text-sm">
          <div>
            <p className="text-gray-400">MARKET CAP</p>
            <p>${token.marketCap.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400">LIQUIDITY</p>
            <p>${token.liquidity.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400">VOLUME</p>
            <p>${token.volume.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400">TXNS</p>
            <p>{(Math.random() * 10 + 1).toFixed(1)}K</p>
          </div>
          <div>
            <p className="text-gray-400">AUDIT LOG</p>
            <p>{(Math.random() * 500 + 100).toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-gray-400">BUY/SELL</p>
            <p>
              {(Math.random() * 8000).toFixed(0)} / {(Math.random() * 2000).toFixed(0)}
            </p>
          </div>
          <div>
            <p className="text-gray-400">ACTION</p>
            <button
              onClick={handleBuyClick}
              className="mt-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Buy
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md mx-auto shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">Confirm Purchase</h3>
            <p className="mb-2 text-center">
              <strong>Token:</strong> {token.name}
            </p>
            <p className="mb-2 text-center">
              <strong>Price:</strong> ${token.price.toLocaleString()}
            </p>
            <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
              Are you sure you want to buy this token?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TokenCard;
