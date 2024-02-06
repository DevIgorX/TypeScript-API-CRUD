import { knex } from '../bancodedados/conexao'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'
import { TipoUsuario } from '../tipos'
import dotenv from 'dotenv'
dotenv.config()




export const cadastrarUsuario = async (req: Request, res: Response) => {

    const { nome, email, senha } = req.body


    try {

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'todos os campos são obrigatórios' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)


        const usuario = await knex<TipoUsuario>('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning('*')

        const { senha: _, ...usuariologado } = usuario[0]

        return res.status(200).json(usuariologado)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor ' })

    }

}

export const login = async (req: Request, res: Response) => {

    const { email, senha } = req.body

    if(!email || !senha){
        return res.status(404).json({mensagem: 'Todos os campos são obrigatórios '})
    }


    try {

        const usuario = await knex<TipoUsuario>('usuarios').where({ email }).first()

        if (!usuario) {
            return res.status(404).json({ mensagem: 'E-mail ou Senha invalido' })
        }

        const verificarSenha = await bcrypt.compare(senha, usuario.senha)

        if (!verificarSenha) {
            return res.status(404).json({ mensagem: 'E-mail ou Senha invalido' })
        }


        const token = jwt.sign({ id: usuario.id }, process.env.SenhaJWT, { expiresIn: '8h' })

        const { senha: _, ...usuariologado } = usuario

        return res.json({ usuario: usuariologado, token })

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
    }


}


export const excluirUsuario = async (req: Request , res: Response) =>{

    const {id} = req.params

    try {

        const usuarioexistente = await knex<TipoUsuario>('usuarios').where({id: Number(id)}).first()

        if(!usuarioexistente){
            return res.status(404).json({mensagem: 'Usuario não encontrado'})
        }

        const usuariodeletado = await knex<TipoUsuario>('usuarios').where({id: Number(id)}).del().returning('*')

        const {senha: _, ...usuario} = usuariodeletado[0]

        return res.status(201).json({mensagem:'Usuario deletado com sucesso!', Usuario: usuario})
        
    } catch (error) {
        return res.status(500).json({mensagem: `Erro interno do Servidor: ${error.message}`})
    }


}


