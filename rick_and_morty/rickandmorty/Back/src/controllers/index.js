const axios = require("axios");
var fav = []

const getFav = function (req, res) {
  res.status(200).end(JSON.stringify(fav))
};
const postFav = function (req, res) {
  fav.push(req.body)
  console.log("post fav -> ", fav)
  res.status(200).end(JSON.stringify(req.body))
};
const deleteFavId = function (req, res) {
  const { id } = req.params;
  const character = fav.find(c=> c.id ===Number(id))
  if(character){
    fav = fav.filter(e=> e.id !== Number(id))
    console.log("delete fav -> ", fav)
    res.status(200).end(JSON.stringify(character))
  } else {
    res.status(400).end("este character ya no se encuentra en fav")
  }
};

const getCharacterId = function (req, res) {
  const { id } = req.params;
  axios(`https://rickandmortyapi.com/api/character/${id}`)
    .then((data) => data.data)
    .then((data) => {
      const character = {
        image: data.image,
        name: data.name,
        gender: data.gender,
        species: data.species,
        id: data.id,
      };
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(character));
    })
    .catch((error) => {
      res.writeHead(500, { "Content-type": "text/plain" });
      res.end("not found character");
    });
};

const getDetailId = function (req, res) {
  const { detailId } = req.params;
  axios(`https://rickandmortyapi.com/api/character/${detailId}`)
    .then((data) => data.data)
    .then((data) => {
      // console.log(data)
      const character = {
        image: data.image,
        name: data.name,
        gender: data.gender,
        species: data.species,
        id: data.id,
        status: data.status,
        origin: data.origin,
      };
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(character));
    })
    .catch((error) => {
      res.writeHead(500, { "Content-type": "text/plain" });
      res.end("not found character");
    });
};


module.exports = {
  getCharacterId,
  getDetailId,
  getFav,
  postFav,
  deleteFavId,
};
