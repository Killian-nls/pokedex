const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded({extended:true }));
app.use(express.json());
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pokedex')
    .then(()=> console.log('Connexion à MongoDB réussie !'))
    .catch((err)=> console.log(err))

const pokemonRouter = require('./src/routes/pokemon');
const userRouter = require('./src/routes/user');

// app.use('/pokemon',pokemonRouter);
// app.use('/type',typeRouter);
app.use('/users', userRouter);


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})