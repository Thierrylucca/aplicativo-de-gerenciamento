const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization

    jwt.verify(token, process.env.SECRET, (err, adm) => {
        if (err) {
            return res.status(403).json({
                msg: "Acesso negado!"
            })
        }

        req.adm = adm;
    })

    console.log(token);

    return next();

}

module.exports = authenticateToken;