const cors_proxy = require('cors-anywhere');

cors_proxy
  .createServer({
    originWhitelist: [],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
  })
  .listen(8080, 'localhost', () => {
    console.log('CORS Anywhere proxy running on http://localhost:8080');
  });
