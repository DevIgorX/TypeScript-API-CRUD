import { Router } from "express";
import{ atualizarCarros, cadastrarCarros, detalharCarros, exlcuirCarros, listarCarros } from   './controladores/carros'
import { cadastrarUsuario, excluirUsuario, login } from "./controladores/Usuario";
import {verificarUsuariologado} from './intermediarios/autenticacao'

const rotas = Router()

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/usuario/login',login)


rotas.use(verificarUsuariologado)


rotas.get('/carros', listarCarros)
rotas.get('/carros/:id',detalharCarros)
rotas.post('/carros', cadastrarCarros)
rotas.put('/carros/:id',atualizarCarros)
rotas.delete('/carros/:id',exlcuirCarros)
rotas.delete('/deletar/:id', excluirUsuario)







export default rotas