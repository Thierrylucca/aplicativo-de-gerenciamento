const Aluno = require("../models/Aluno");

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const validar = require('../middlewares/verifications')

const alunoService = {

    create: async (aluno) => {
        try {

            const existeAluno = await Aluno.findOne(
                { ra: aluno.ra }
            )

            if (existeAluno) {
                return {
                    error: true,
                    msg: "RA já existente"
                }
            }

            const hashSenha = await bcrypt.hash(aluno.senha, 10)

            const data = {
                nome: aluno.nome,
                ra: aluno.ra,
                senha: hashSenha
            }

            console.log(data);


            return await Aluno.create(data)

        } catch (error) {

            console.error(error);

            throw new Error('Ocorreu um erro ao criar aluno');
        }
    },

    update: async (id, alunoToUpdate) => {
        try {

            const valid = await Aluno.findById(id)

            const hashSenha = await bcrypt.hash(alunoToUpdate.senha, 10)

            const data = {
                nome: alunoToUpdate.nome,
                senha: hashSenha
            }

            console.log(data);


            if (valid) {
                return await Aluno.findByIdAndUpdate(id, data)
            }

            return null;

        } catch (error) {
            throw new Error('Ocorreu um erro ao Atulizar aluno')
        }
    },

    getById: async (id) => {
        try {

            const aluno = await Aluno.findById(id)

            if (!aluno) {
                return null;
            }

            return aluno;

        } catch (error) {
            throw new Error('Ocorreu um erro.') // throw jogar pra cima, de acordo com a camada
        }
    },

    getAll: async () => {
        try {
            return await Aluno.find();
        } catch (error) {
            throw new Error('Ocorreu um erro.')
        }
    },

    delete: async (id) => {
        try {

            const valid = await Aluno.findById(id)

            if (valid) {
                return await Aluno.findOneAndDelete(id);
            }

            return null;

        } catch (error) {
            throw new Error('Ocorreu um erro ao deletar o aluno')
        }
    },

    // login: async (ra, senha) => {
    //     try {

    //         const aluno = await Aluno.findOne(
    //             { ra: ra }
    //         )

    //         if (aluno) {
    //             console.log("Login efetuado com sucesso");
    //         }

    //         if (!aluno) {
    //             return null
    //         }

    //         const isValid = await bcrypt.compare(senha, aluno.senha);

    //         console.log(isValid);

    //         if (!isValid) {
    //             return null
    //         }

    //         const token = jwt.sign({
    //             ra: aluno.ra,
    //             id: aluno.id
    //         }, process.env.SECRETE, { expiresIn: '1h' })

    //         return token

    //     } catch (error) {
    //         console.error(error);
    //         throw new Error("Erro, contate o suporte!!!");

    //     }
    // }

    login: async (ra, senha) => {
        try {

            const aluno = await Aluno.findOne(
                { ra: ra }
            )

            if (!aluno) {
                return null
            }

            const isValid = await bcrypt.compare(senha, aluno.senha);

            if (!isValid) {
                return null
            }

            const token = jwt.sign({
                ra: aluno.ra,
                id: aluno.ra
            }, process.env.SECRETE, { expiresIn: '1h' })


            return {
                success: true,
                msg: "Login bem-sucedido.",
                data: {
                    token,
                    aluno: {
                        id: aluno.id,
                        nome: aluno.nome,
                        ra: aluno.ra,
                    },
                },
            };
        } catch (error) {
            console.error("Erro no serviço de login:", error);
            throw new Error("Erro interno no servidor. Contate o suporte.");
        }

    }

}

module.exports = alunoService;