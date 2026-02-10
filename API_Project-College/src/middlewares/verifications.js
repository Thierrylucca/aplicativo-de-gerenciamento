const validateUser = async (user) => {

    const nome = user.nome;

    const idRegistro = user.ra || user.matricula;

    const senha = user.senha;

    if (!nome || !idRegistro || !senha) {

        console.log('Campos inválidos');

        return false
    };

    // pode avançar
    return true;
};


module.exports = { validateUser };