const Curso = require("../models/Curso");

const Aluno = require("../models/Aluno");

const Materia = require("../models/Materias")

const materiaService = require("../services/materiaService");

const alunoService = require("../services/alunoService");


const cursoService = {

    create: async (matricula) => {
        try {

            const isValidMateria = await materiaService.getById(matricula.materiaId);

            if (!isValidMateria) {
                return {
                    error: true,
                    msg: "Matéria inexistente!"
                }
            }


            const isValidAluno = await alunoService.getById(matricula.alunoId)

            if (!isValidAluno) {
                return {
                    error: true,
                    msg: "Aluno inexistente!"
                }
            }

            const matriculas = await cursoService.getAll();

            const alunoMatriculado = matriculas.filter(cursos => cursos.alunoId === matricula.alunoId);

            const validation = alunoMatriculado.find(ver => ver.materiaId === matricula.materiaId);

            if (validation) {

                return {
                    error: true,
                    msg: "Aluno com matrícula ativa!",
                    validation
                }

            }

            return await Curso.create(matricula);

        } catch (error) {
            console.error(error);

            throw new Error('Ocorreu um erro ao se matricular')
        }
    },

    getAll: async () => {
        try {
            return await Curso.find();
        } catch (error) {
            throw new Error('Ocorreu um erro.')
        }
    },

    getAllWhere: async (id) => {
        try {

            const cursos = await cursoService.getAll();

            // filtrando todos os alunos desse curso
            const cursosFiltrados = cursos.filter(curso => curso.materiaId === id)

            const alunoIds = cursosFiltrados.map(curso => curso.alunoId);

            let alunos = [];

            for (i = 0; i < alunoIds.length; i++) {

                const ids = alunoIds[i]

                const aluno = await Aluno.findById(ids)

                alunos.push(aluno);
            }
            const materia = await Materia.findById(id);

            const data = {
                Curso: materia,
                Alunos: alunos
            }

            return data;

        } catch (error) {
            throw new Error('Ocorreu um erro.')
        }
    },

    getById: async (id) => {
        try {

            const matricula = await Curso.findById(id)

            if (!matricula) {
                return null;
            }

            return matricula;

        } catch (error) {
            throw new Error('Ocorreu um erro.') // throw jogar pra cima, de acordo com a camada
        }
    },

    delete: async (id) => {
        try {
            const valid = await Curso.findById(id)

            if (valid) {
                return await Curso.findOneAndDelete(id);
            }

            return null;

        } catch (error) {
            throw new Error('Ocorreu um erro ao deletar o prof')
        }
    },

    getAllCursos: async (id) => {
        try {

            const cursos = await cursoService.getAll();

            // filtrando todos os alunos desse curso
            const cursosFiltrados = cursos.filter(curso => curso.alunoId === id)

            const materiaIds = cursosFiltrados.map(curso => curso.materiaId);

            let materias = [];

            for (i = 0; i < materiaIds.length; i++) {

                const ids = materiaIds[i]

                const materia = await Materia.findById(ids)

                materias.push(materia);
            }
            const aluno = await Aluno.findById(id);

            const data = {
                Aluno: aluno,
                Cursos: materias
            }

            return data;

        } catch (error) {
            throw new Error('Ocorreu um erro.')
        }
    },


};

module.exports = cursoService