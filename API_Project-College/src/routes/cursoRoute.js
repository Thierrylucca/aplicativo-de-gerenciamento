const { Router } = require('express');

const cursoController = require("../controller/cursoController");

const router = Router();

router.post('/', cursoController.create);

// // pegar todas as matrículas de todos os cursos
router.get('/', cursoController.getAll);

// // pegar todas as matriculas de um curso
router.get('/:id', cursoController.getAllWhere);

router.get('/aluno/:id', cursoController.getAllCursos);

// rota para deletar matricula do curso
router.delete('/:id', cursoController.delete);



module.exports = router;