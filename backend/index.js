const express = require('express');
const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017"
const dbName = "jornada-fullstack-ocean-karen";

//Declaração da função Main()
async function main() {
/*Realizar a conexão com o MongoClient
MongoClient -> MongoDatabase -> MongoCollection

Conexões com o client podem levar um tempo para concluir. Portanto, utilizamos o mecanismo de Promises do JavaScript, que permite aguardar esse tempo. Para isso, vamos usar o async/await.*/

console.log("Conectando com o banco de dados...");

const client = await MongoClient.connect(url);
const db = client.db(dbName);
const collection = db.collection("pontuacoes");

console.log("Banco de dados conectado com sucesso!");

const app = express();

/*Sinalizamos para o express que estamos usando JSON no body das requisições*/
app.use(express.json());

//Nosso backend armazena as pontuações das jogadas
//Criar a lista com as pontuações

//Endpoint READ ALL - [GET] /pontuacoes
app.get("/pontuacoes", async function (req, res) {
  const itens = await collection
    .find()
    .sort({pontos: -1})
    .limit(10)
    .toArray();
  res.send(itens);
});

//Endpoint CREATER - [POST] /pontuacoes
app.post("/pontuacoes", function (req, res) {
  //Peguei o item do corpo da requisição
  const item = req.body;

  collection.insertOne(item);

  res.send(item);
});

app.listen(3000)
}

//Executamos a função Main()
main();
