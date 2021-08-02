
const shortURLService = require("./shortURLService");

const shortenURL = (url, callback) => {
  shortURLService.shortenURL(url, callback);
}

const getRedirectionURL = (shortenURL, callback) => {
  shortURLService.getRedirectionURL(shortenURL, callback);
}

module.exports = {
  shortenURL,
  getRedirectionURL
}
