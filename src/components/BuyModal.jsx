
function BuyModal({ token, onClose, onConfirm }) {
  if (!token) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg w-[90%] max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
        <p className="mb-2 text-lg">{token.name} ({token.symbol})</p>
        <p className="mb-4 text-gray-600 dark:text-gray-300">Price: ${token.price.toLocaleString()}</p>
        
        <div className="flex justify-center gap-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => onConfirm(token)}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyModal;
