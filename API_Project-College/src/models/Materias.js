const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
    materia: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    duracao: {
        type: String,

    },
    profID: {
        type: String,

    },
    dias: {
        type: String,

    },
    sala: {
        type: String,

    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Materias", materiaSchema);