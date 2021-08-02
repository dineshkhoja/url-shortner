const router = require("express").Router();

const shortURLController = require("./shortURLController");

/**
 * 
 */
router.post("/shorten", (req, res) => {
  try {
    let url = req.query.url;

    shortURLController.shortenURL(url, (err, result) => {
      if (err) {
        console.error("Error while shortening url: ", err);

        // EXITING
        return res.status(400).send({error: "Error "});
      }
      console.debug("Returning back shortened url data : ", JSON.stringify(result));

      // EXITING
      return res.status(201).send(result);
    });
  } catch (error) {
    console.error("Error while resolving shorten url request ...!", error);
    // EXITING
    return res.status(400).send({ error: "Unexpected error while resolving shorten url request ...!" });
  }
});

/**
 * 
 */
router.get("/:urlId", (req, res) => {
  try {
    let urlId = req.params.urlId;

    shortURLController.getRedirectionURL(urlId, (err, result) => {
      if (err) {
        console.error(`Error while fething actual url for: ${urlId}`, err);

        // EXITING
        return res.status(400).send({ error: "Unexpected error while processing request ...!" });
      }
      console.debug("Redirecting to actual url : ", JSON.stringify(result));

      // EXITING
      return res.redirect(result.url);

    });
  } catch (error) {
    console.error("Error in while fething redirection url ...!", error);

    // EXITING
    return res.status(400).send({ error: "Unexpected error in while fething redirection url ...!" });
  }
});

module.exports = router;
