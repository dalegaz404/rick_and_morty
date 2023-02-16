const express = require("express");
const router = express.Router();
const {
  getCharacterId,
  getDetailId,
  getFav,
  postFav,
  deleteFavId,
} = require("../controllers/index.js");

router.get("/character/:id", getCharacterId);
router.get("/detail/:detailId", getDetailId);
router.get("/fav", getFav);
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFavId);

module.exports = router;

/*
a. GET/rickandmorty/fav, que obtenga los personajes guardados en el arreglo fav.

b. POST/rickandmorty/fav, que guarde los personajes en el arreglo fav.

c. DELETE/rickandmorty/fav/${id} */