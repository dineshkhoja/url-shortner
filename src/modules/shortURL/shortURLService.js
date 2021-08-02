const shortid = require('shortid');
const fs = require('fs');

const config = require("../../config");

const shortenURL = (url, callback) => {
  try {
    let id = shortid.generate();
    let shortenURL = config.SHORTEN_URL_PREFIX + id;
    let fullUrl;
    
    // If full url is not given adding prefix
    if (!url.includes("http://") && !url.includes("https://")) { fullUrl= "http://" + url; }

    let urlObj = { id, url: fullUrl, shortenURL };

    // Appending new url data to store file
    fs.appendFile(config.URL_DATA_FILE, `${JSON.stringify(urlObj)}\n`, (err) => {
      if (err) {
        console.error("Error in getting shortened URL:", error);

      // EXITING
        return callback(error);
      }
      console.debug('Stored url data to store: ', fullUrl);
    });

    // EXITING
    return callback(null, urlObj);

  } catch (error) {
    console.error("Error in getting shortened URL:", error);

    // EXITING
    return callback(error);
  }
}

const getRedirectionURL = (id, callback) => {
  try {
    let urlDataArray;

    // Reading url data from store file
    fs.readFile(config.URL_DATA_FILE, (err, data) => {
      if (err) {
        console.error("Error in getting redirection URL:", err);

        // EXITING
        return callback(err);
      }
      // Converting data buffer to string then into array by new line
      urlDataArray = data.toString().split("\n");
      
      // Finding matching url data
      let filteredResult = urlDataArray.filter(obj => obj && JSON.parse(obj).id == id);

      let result = JSON.parse(filteredResult);

      if (!result) {
        console.error("Error in gettingredirection URL:", err);

        // EXITING
        return callback(err);
      }
      
      console.debug(`Debug fetched redirection url for id ${id} : `, result.url, ", ", result);

      // EXITING
      return callback(null, result);
    });

  } catch (error) {
    console.error("Error in getting redirection URL:", error);

    // EXITING
    return callback(error);
  }
}

module.exports = {
  shortenURL,
  getRedirectionURL
}
