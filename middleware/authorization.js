// check-auth.js 
// const jwt = require("jsonwebtoken");
// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const decodedToken = jwt.verify(
//             token,
//             "secret_this_should_be_longer"
//         );
//         req.auditeurData = {
//             email: decodedToken.email,
//             auditeurId: decodedToken.auditeurId
//         };
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Auth failed!" });
//     }
// };
//  ////////////////////////////////////////////

exports.authMiddleware = function(req, res, next) {
    const json_token = req.headers.authorization
    try {
        if (json_token) {
            const auditeur = parseToken(json_token)
            auditeur.findById(user.auditeurId, function(err, user) {
                if (err) {
                    return res.status(422).json({
                        'error': 'Oops! Something went wrong'
                    })
                }
                if (auditeur) {
                    res.locals.auditeur = auditeur
                    next()
                } else {
                    return res.status(422).json({ 'error': 'Not authorized auditeur' })
                }
            })
        } else {
            return res.status(422).json({ 'error': 'Not authorized auditeur' })
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], env.secret)
}


//  ///////////////////

const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;
        // console.log(req.userData);
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Authentification Failed"
        });
    }
};