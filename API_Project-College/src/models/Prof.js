const mongoose = require('mongoose');

const profSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        matricula: {
            type: String,
            required: true,
            unique: true,
        },
        senha: {
            type: String,
            required: true,
        },

        // materias
    },
    { timestamps: true }
);

module.exports = mongoose.model("Prof", profSchema);