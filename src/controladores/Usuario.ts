import { knex } from '../bancodedados/conexao'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'
import { TipoUsuario } from '../TipoUsuario'



export const cadastrarUsuario = async (req: Request, res: Response) => {

    const { nome, email, senha } = req.body

    try {

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'todos os campos são obrigatórios' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)


        const usuario = await knex<TipoUsuario>('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning('*').first()


        return res.status(200).json(usuario)



    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor ' })
    }

}

