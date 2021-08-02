const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use("/shorten", createProxyMiddleware({ target: "http://localhost:5000" })); // Public end point
};
