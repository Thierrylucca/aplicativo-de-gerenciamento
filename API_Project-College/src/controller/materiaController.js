const materiaService = require("../services/materiaService");

const materiaController = {

    // função admin
    create: async (req, res) => {
        try {
            const materia = await materiaService.create(req.body);
            return res.status(201).json({
                msg: 'Matéria criada com sucesso',
                materia
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao tentar criar a matéria'
            })
        }
    },

    // para enviar para -> cusos
    update: async (req, res) => {
        try {

            const materia = await materiaService.update(req.params.id, req.body);

            if (!materia) {
                return res.status(400).json({
                    msg: 'matéria não encontrado'
                })
            }

            return res.status(200).json({
                msg: 'materia atualizado com sucesso',
            });

        } catch (error) {
            return res.status(500).json({
                msg: ' Erro ao tentar atualizar a matéria'
            })
        }
    },

    // função admin
    delete: async (req, res) => {
        try {

            const { id } = req.params;

            const materia = await materiaService.delete(id);

            if (!materia) {
                return res.status(400).json({
                    msg: "Matéria não encontrado"
                })
            }

            return res.status(200).json({
                msg: "Matéria deletada com sucesso",
                materia
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao deletar os materias"
            })
        }
    },

    // para listar tela de professor
    getAll: async (req, res) => {
        try {
            const materias = await materiaService.getAll();

            return res.status(200).json({
                msg: "Matérias cadastradas: ",
                materias
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao listar os materias"
            })
        }
    },

    getOne: async (req, res) => {
        try {

            const { id } = req.params;

            const materia = await materiaService.getById(id);

            if (!materia) {
                return res.status(400).json({
                    msg: "materia não encontrado"
                })
            }

            return res.status(200).json({
                msg: "materia: ",
                materia
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Erro ao listar o materia"
            })
        }
    },

    getAllCursos: async (req, res) => {
        try {

            const { id } = req.params
            const cursos = await materiaService.getAllCursos(id);

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


}


module.exports = materiaController;