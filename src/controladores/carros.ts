import { Request, Response } from 'express'
import {knex} from '../bancodedados/conexao'
import {Carro} from '../tipos'


export const listarCarros = async (req:Request , res: Response ) => {

    try {

        const carros = await knex<Carro>('carros')
        return res.json(carros)
        
    } catch  {
        return res.status(500).json({mensagem: 'Erro interno do Servidor.'})
    }

}

export const detalharCarros = async (req:Request , res: Response ) => {

    const {id} = req.params

    try {

        const carro = await knex<Carro>('carros').where({id: Number(id)}).first()

        if(!carro){
            return res.status(404).json({mensagem: 'Carro não encontrado'})
        }
        return res.json(carro)
        
    } catch  {
        return res.status(500).json({mensagem: 'Erro interno do Servidor.'})
    }


}
export const cadastrarCarros = async (req:Request , res: Response ) => {

}
export const atualizarCarros = async (req:Request , res: Response ) => {

}
export const exlcuirCarros = async (req:Request , res: Response ) => {

}


