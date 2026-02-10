const Prof = require("../models/Prof");

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const profService = {

    create: async (prof) => {
        try {

            const existeProf = await Prof.findOne(
                { matricula: prof.matricula }
            )

            if (existeProf) {
                return {
                    error: true,
                    msg: "Matrícula já existente"
                }
            }

            const hashSenha = await bcrypt.hash(prof.senha, 10)

            const data = {
                nome: prof.nome,
                matricula: prof.matricula,
                senha: hashSenha
            }

            console.log(data);

            return await Prof.create(data)
        } catch (error) {

            console.error(error);

            throw new Error('Ocorreu um erro ao criar prof');
        }
    },

    update: async (id, profToUpdate) => {
        try {

            const valid = await Prof.findById(id)

            const hashSenha = await bcrypt.hash(profToUpdate.senha, 10)

            const data = {
                nome: profToUpdate.nome,
                senha: hashSenha
            }

            console.log(data);


            if (valid) {
                return await Prof.findByIdAndUpdate(id, data)
            }

            if (valid) {
                return await Prof.findByIdAndUpdate(id, profToUpdate)
            }

            return null;

        } catch (error) {
            throw new Error('Ocorreu um erro ao Atulizar prof')
        }
    },

    getById: async (id) => {
        try {

            const prof = await Prof.findById(id)

            if (!prof) {
                return null;
            }

            return prof;

        } catch (error) {
            throw new Error('Ocorreu um erro.') // throw jogar pra cima, de acordo com a camada
        }
    },

    getAll: async () => {
        try {

            return await Prof.find();

        } catch (error) {

            console.error(error);

            throw new Error('Ocorreu um erro.')
        }
    },

    delete: async (id) => {
        try {

            const valid = await Prof.findById(id)

            if (valid) {
                return await Prof.findOneAndDelete(id);
            }

            return null;

        } catch (error) {
            throw new Error('Ocorreu um erro ao deletar o prof')
        }
    },

    login: async (matricula, senha) => {
        try {

            const prof = await Prof.findOne(
                { matricula: matricula }
            )

            if (!prof) {
                return null
            }

            const isValid = await bcrypt.compare(senha, prof.senha);

            if (!isValid) {
                return null
            }

            const token = jwt.sign({
                matricula: prof.matricula,
                id: prof.id
            }, process.env.SECRETE, { expiresIn: '1h' })


            return {
                success: true,
                msg: "Login bem-sucedido.",
                data: {
                    token,
                    prof: {
                        id: prof.id,
                        nome: prof.nome,
                        matricula: prof.matricula,
                    },
                },
            };
        } catch (error) {
            console.error("Erro no serviço de login:", error);
            throw new Error("Erro interno no servidor. Contate o suporte.");
        }

    }

}

module.exports = profService;