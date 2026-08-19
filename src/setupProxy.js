const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pr-1.bff.finops-sales.preview.develop.govoll.com',
      changeOrigin: true,
      secure: true,
    })
  );
};
