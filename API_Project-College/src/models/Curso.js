const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({

    materiaId: {
        type: String,
        required: true
    },

    alunoId: {
        type: String,
        required: true
    },

},
    { timestamps: true }
);

module.exports = mongoose.model("Cursos", cursoSchema);