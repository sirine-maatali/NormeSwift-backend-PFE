const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRoute = express.Router();
let auditeur = require('../models/auditeur.model.js');


//SIGNUP ROUTE
authRoute.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.mdp, 10).then(hash => {
        const audit = new auditeur({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            mdp: hash,
            pays: req.body.pays
        });

        auditeur.findOne({ email: req.body.email }).then(audit1 => {
                if (audit1) {
                    return res.status(401).json({
                        message: "auditeur Already Exist"
                    })
                }
                audit.save().then(result => {
                    if (!result) {
                        return res.status(500).json({
                            message: "Error Creating auditeur"
                        })
                    }
                    res.status(201).json({
                        message: "auditeur created!",
                        result: result
                    });
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });;
    })

});

//  LOGIN ROUTE 

authRoute.post('/login', (req, res, next) => {
    let fetchedAuditeur;

    auditeur.findOne({ email: req.body.email }).then(audit => {
            if (!audit) {
                return res.status(401).json({
                    message: "Auth failed no such auditeur"
                })
            }
            fetchedAuditeur = audit;
            return bcrypt.compare(req.body.mdp, audit.mdp);
        }).then(result => {
            console.log(fetchedAuditeur)
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed inccorect mdp"
                })
            }

            // CREATING THE JSON WEBTOKEN WITH SIGNATURE AND KEY

            const token = jwt.sign({ email: fetchedAuditeur.email, auditeurId: fetchedAuditeur._id },
                "secret_this_should_be_longer", { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                auditeurId: fetchedAuditeur._id
            });
        })
        .catch(e => {
            console.log(e)

        })
})
module.exports = authRoute