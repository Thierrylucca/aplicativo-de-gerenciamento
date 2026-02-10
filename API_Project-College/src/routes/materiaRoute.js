const { Router } = require('express');

const materiaController = require("../controller/materiaController");

const router = Router();

router.post('/admin/', materiaController.create);

router.get('/:id', materiaController.getOne);

router.get('/', materiaController.getAll);

router.put('/:id', materiaController.update);

router.delete('/admin/:id', materiaController.delete);

router.get('/prof/:id', materiaController.getAllCursos);

module.exports = router;