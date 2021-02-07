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
let pokemonCache = {}
// return a Promise<PokemonModel>
let get_mongoose_connection = () => {
  return mongoose.connect("mongodb://localhost:27017/my-db", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    auth: {
      "authSource": "admin"
    },
    user: "username",
    pass: "password"
  }).then(mongo_connection => {
    // add the needed attributes and more schemas if needed
    let pokemon_schema = new mongo_connection.Schema( { name: String }, { strict: false })
    // let pokemon_schema = new mongo_connection.Schema( { name: String })
    return Promise.resolve(mongo_connection.model('Pokemon', pokemon_schema))
  })
}
function init_endpoints(pokemonModelPromise) {


  // handle properly the endpoint for doing the lab correctly
  app.post('/getpokemon/:pokemonName', async (req, res) =>{
    //http://localhost:3000/pikachu
    let pokeName = req.params.pokemonName
    axios.get("pokeapiurl.com")
      .then((resp) => {
        // handle the resp
        pokemonModelPromise.then(PokemonModel => {
          return PokemonModel(resp.data).save()
        }).then(pokemon => {
          res.send(pokemon)
        })
      })
    let params = processParams(req)
    console.log(params)
  })
  
  
}
get_mongoose_connection()
.then(pokemonModelPromise => {
  init_endpoints(pokemonModelPromise)
  app.listen(3000)
})