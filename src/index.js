const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const { page, size } = req.query;

  const { data } = await axios.get("https://rickandmortyapi.com/api/character");

  const characters = data.results.map((item) => {
    return {
      id: item.id,
      name: item.name,
      status: item.status,
      species: item.species,
      gender: item.gender,
      location: item.location,
      image: item.image,
    };
  });

  const initialElement = page * size - size;
  const lastElement = page * size;

  //let results = [];

  // characters.forEach((item, index) => {
  //   if (index >= initialElement && index < lastElement) {
  //     results.push(item);
  //   }
  // });

  const results = characters.slice(initialElement, lastElement);

  return res.json({ initialElement, lastElement, results });
});

app.listen(3334);
