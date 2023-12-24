import 'dotenv/config' //utilizada para carregar variáveis de ambiente definidas no arquivo .
import express from 'express'
import rotas from './rotas'


const app = express()
app.use(express.json())
app.use(rotas)


app.listen(3000)
