const config = {
  "SERVER_PORT": (process.env.SERVER_PORT || 5000),
  "HOST_WEBAPP_BUILD": true,
  // "SHORTEN_URL_PREFIX": "http://localhost:5000/pli/",
  "SHORTEN_URL_PREFIX": "http://localhost:5000/",
  "URL_DATA_FILE": "./data/url_data.txt"
}

module.exports = config;
