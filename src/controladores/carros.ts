import { Request, Response } from 'express'
import { knex } from '../bancodedados/conexao'
import { Carro } from '../tipos'


export const listarCarros = async (req: Request, res: Response) => {

    try {

        const carros = await knex<Carro>('carros') //<Carro> Indica o tipo de dados que se espera obter do banco de dados. ('carros') especifica a tabela do banco de dados que será consultada.
        return res.json(carros)

    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do Servidor.' })
    }

}

export const detalharCarros = async (req: Request, res: Response) => {

    const { id } = req.params

    try {

        const carro = await knex<Carro>('carros').where({ id: Number(id) }).first()

        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado' })
        }
        return res.json(carro)

    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do Servidor.' })
    }


}
export const cadastrarCarros = async (req: Request, res: Response) => {
    const { marca, modelo, cor, ano, valor } = req.body

    try {

        const carro = await knex<Omit<Carro, 'id'>>('carros').insert({ marca, modelo, cor, ano, valor }).returning('*')

        return res.status(201).json(carro[0])

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do Servidor' })

    }


}
export const atualizarCarros = async (req: Request, res: Response) => {

    const { id } = req.params
    const { marca, modelo, cor, ano, valor } = req.body

    try {

        const carro = await knex<Carro>('carros').where({ id: Number(id) }).first()

        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado' })
        }

        await knex<Carro>('carros').where({ id: Number(id) }).update({ marca, modelo, cor, ano, valor })

        return res.status(204).send()

    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do Servidor.' })
    }

}
export const exlcuirCarros = async (req: Request, res: Response) => {

    const { id } = req.params


    try {

        const carro = await knex<Carro>('carros').where({ id: Number(id) }).first()

        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado' })
        }

        await knex<Carro>('carros').where({ id: Number(id) }).del()

        return res.status(204).send()

    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do Servidor.' })
    }

}


