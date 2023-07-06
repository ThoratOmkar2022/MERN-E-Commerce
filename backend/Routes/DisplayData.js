const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send([global.fooddata, global.foodCategory]);
  } catch (err) {
    console.error(error.message);
    res.send("Server error");
  }
});

module.exports = router;
