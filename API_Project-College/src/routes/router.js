const { Router } = require('express');

const router = Router();

const profRoutes = require('./profRoute');

const alunoRoutes = require('./alunoRoute');

const materiaRoutes = require('./materiaRoute');

const cursoRoutes = require('./cursoRoute');

router.use('/prof', profRoutes);

router.use('/aluno', alunoRoutes);

router.use('/materia', materiaRoutes);

router.use('/curso', cursoRoutes);

module.exports = router;