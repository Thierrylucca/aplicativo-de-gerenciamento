const alunoService = require("../services/alunoService")

const validar = require("../middlewares/verifications");

const idRegistro = require('../services/createIdRegistro');

const alunoController = {
    create: async (req, res) => {
        try {

            const resgistro = await idRegistro();

            const user = req.body;

            console.log(resgistro + ' ra');


            const verificarUser = {

                nome: user.nome,
                ra: resgistro,
                senha: user.senha
            }

            const isValid = await validar.validateUser(verificarUser);

            if (!isValid) {
                return res.status(500).json({
                    msg: 'Campos inválidos!'
                })
            }

            const aluno = await alunoService.create(verificarUser);

            if (aluno.error) {
                return res.status(401).json({
                    msg: aluno.msg
                })
            }
            return res.status(201).json({
                msg: 'Usuário criado com sucesso',
                aluno
            })

        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao tentar criar o usuário, campos inválidos!'
            })
        }
    },

    update: async (req, res) => {
        try {

            const aluno = await alunoService.update(req.params.id, req.body);

            if (!aluno) {
                return res.status(400).json({
                    msg: 'aluno não encontrado'
                })
            }

            return res.status(200).json({
                msg: 'aluno atualizado com sucesso',
                aluno
            });

        } catch (error) {
            return res.status(500).json({
                msg: ' Erro ao tentar atualizar o usuário'
            })
        }
    },

    delete: async (req, res) => {
        try {

            const { id } = req.params;

            const aluno = await alunoService.delete(id);

            if (!aluno) {
                return res.status(400).json({
                    msg: "Usuario não encontrado"
                })
            }

            return res.status(200).json({
                msg: "Usuario deletado com sucesso",
                aluno
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao deletar os alunos"
            })
        }
    },

    getAll: async (req, res) => {
        try {
            const alunos = await alunoService.getAll();

            return res.status(200).json({
                msg: "Usuarios cadastrados: ",
                alunos
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao listar os alunos"
            })
        }
    },

    getOne: async (req, res) => {
        try {

            const { id } = req.params;

            const aluno = await alunoService.getById(id);

            if (!aluno) {
                return res.status(400).json({
                    msg: "aluno não encontrado"
                })
            }

            return res.status(200).json({
                msg: "aluno: ",
                aluno
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao listar o aluno"
            })
        }
    },

    login: async (req, res) => {
        try {
            const { ra, senha } = req.body;

            const login = await alunoService.login(ra, senha);

            if (!login) {
                return res.status(400).json({
                    msg: "RA ou senha inválidos!"
                })
            }

            console.log(login);

            return res.status(200).json({
                msg: login.msg,
                data: login.data,
            });
        } catch (error) {
            console.error("Erro no controlador de login:", error);

            // Retorno genérico para erros internos
            return res.status(500).json({
                msg: "Erro interno no servidor. Contate o suporte.",
            });
        }
    }

}

module.exports = alunoController;