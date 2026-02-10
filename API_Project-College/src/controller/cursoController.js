const cursoService = require("../services/cursoService");

const cursoController = {

    create: async (req, res) => {
        try {
            const curso = await cursoService.create(req.body);

            if (curso.error) {
                return res.status(401).json({
                    msg: curso.msg
                })
            }

            return res.status(201).json({
                msg: 'Matrícula vínculada ao curso com sucesso!'
            })

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                msg: 'Erro ao tentar criar o curso'

            })
        }
    },

    getAll: async (req, res) => {
        try {
            const cursos = await cursoService.getAll();

            return res.status(200).json({
                msg: "Matrículas cadastrados: ",
                cursos
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao listar as matriculas"
            })
        }
    },

    getAllWhere: async (req, res) => {
        try {

            const { id } = req.params
            const cursos = await cursoService.getAllWhere(id);

            return res.status(200).json({
                msg: "Matrículas cadastrados: ",
                cursos
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao listar as matriculas"
            })
        }
    },

    getOne: async (req, res) => {
        try {

            const { id } = req.params;

            const matricula = await cursoService.getById(id);

            if (!matricula) {
                return res.status(400).json({
                    msg: "matricula não encontrada"
                })
            }

            return res.status(200).json({
                msg: "Matricula: ",
                matricula
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao listar o aluno"
            })
        }
    },

    delete: async (req, res) => {
        try {

            const { id } = req.params;

            const curso = await cursoService.delete(id);

            if (!curso) {
                return res.status(400).json({
                    msg: "Curso não encontrado"
                })
            }

            return res.status(200).json({
                msg: "Matrícula deletada com sucesso",
                curso
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao deletar a matricula"
            })
        }
    },


    getAllCursos: async (req, res) => {
        try {

            const { id } = req.params
            const cursos = await cursoService.getAllCursos(id);

            return res.status(200).json({
                msg: "Matrículas cadastrados: ",
                cursos
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao listar as matriculas"
            })
        }
    },



};

module.exports = cursoController;