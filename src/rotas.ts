import { Router } from "express";
import{ atualizarCarros, cadastrarCarros, detalharCarros, exlcuirCarros, listarCarros } from   './controladores/carros'

const rotas = Router()


rotas.get('/carros', listarCarros)
rotas.get('/carros/:id',detalharCarros)
rotas.post('/carros', cadastrarCarros)
rotas.put('/carros/:id',atualizarCarros)
rotas.delete('/carros/:id',exlcuirCarros)


export default rotas