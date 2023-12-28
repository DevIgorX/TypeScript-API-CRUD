import jwt from 'jsonwebtoken'
import  {knex} from '../bancodedados/conexao'
import {Request , Response} from  'express'
import {TipoUsuario} from  '../tipos'

interface tokenPayload {
    id: number
}


export const verificarUsuariologado = async (req: Request , res: Response, next)=> {

    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({mensagem: 'Usuario Não Autorizado'})
    }

    const token = authorization.split(' ')[1]

    try {
        
        const {id} = jwt.verify(token,'1234') as tokenPayload
        

        const usuariolog = await knex<TipoUsuario>('usuarios').where({id}).first()

        if(!usuariolog){
            return res.status(401).json({mensagem: 'Usuario Não Autorizado'})
        }

        next()


    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do Servidor'})
    }


}
