const express = require("express");
const {
  addTransection,
  getAlltransection,
} = require("../controllers/transectionController");
const router = express.Router();

//routes: add transection:
router.post("/add-transection", addTransection);

//routes: add transection:
router.post("/get-transection", getAlltransection);

module.exports = router;
