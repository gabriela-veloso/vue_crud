const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

let pessoas = []

app.use(express.json())
app.use(cors())

app.post('/create', (req, res) => {
  const body = req.body
  const id = pessoas.length + 1

  pessoas.push({ id, ...body})

  res.send({ ok: "A pessoa foi inserida com sucesso" })
})

app.get('/list', (req, res) => {
  res.send(pessoas)
})

app.put('/update', (req, res) => {
  const body = req.body // { id: 1, nome: "fulano de tal", idade: 32323 }
  const pessoa = pessoas.filter((e) => e.id === body.id)
  
  if (pessoa.length > 0) {
    const index = pessoas.findIndex((e) => e.id === body.id)
    pessoas[index] = body
    
    res.send(pessoas[index])     
  } else {
    res.send({ error: "O id da pessoa informada não foi localizado" })
  }
})

app.delete('/delete', (req, res) => {
  const body = req.body
  pessoas = pessoas.filter((e) => e.id !== body.id)
  res.send({ ok: "A pessoa foi apagada com sucesso" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})