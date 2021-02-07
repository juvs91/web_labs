const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
  extended: true
}))
let pokeCache = {}
// handle properly the request :) 
app.post('/getpokemon/:pokemonName', async (req, res) =>{
  //http://localhost:3000/pikachu
  let pokeName = req.params.pokemonName
  // if known the async await sintax, feel free to use it this way and 
  // add the correct url
  // let resp = await axios.get("'https://pokeapi.co/api/v2/pokemon/ditto'")
  axios.get("'https://pokeapi.co/api/v2/pokemon/ditto'")
    .then((resp) => {
      // handle the resp
      res.send(resp)
    })
    .catch((err) => {
      // handle properly the err
      res.send(err)
    })
  let params = processParams(req)
  console.log(params)
})
app.listen(3000)