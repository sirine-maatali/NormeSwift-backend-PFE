const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auditeurRoute = express.Router();
let auditeur = require('../models/auditeur.model.js');



// Add 
//auditeurRoute.route('/add').post((req, res, next) => {
//   auditeur.create(req.body, (error, data) => {
//      if (error) {
//          return next(error)
//      } else {
//           res.json(data)
//       }
// })
//});
//function control add auditeur
//let url = 'mongodb+srv://projetpfe:projetpfe@projetpfe.ii4ex.mongodb.net/evaluation?retryWrites=true&w=majority'
//auditeurRoute.route('/add').post((nom, prenom, email, mdp, pays) => {
//  return new promise((resolve, reject) => {
//    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//      .then(() => {
//        return auditeurSchema.findOne({ email: email })
//  }).then((doc) => {
//             if (doc) {
//               mongoose.disconnect()
//             reject('this email exist')
//       } else {
//         bcrypt.hash(mdp, 10).then((hashedmdp) => {
//           let auditeur = new auditeur({
//             email: email,
//           mdp: hashedmdp
//     })
//   auditeur.save().then((auditeur) => {
//         mongoose.disconnect()
//       resolve(auditeur)
// })
//.catch((err) => {
//   mongoose.disconnect()
// reject(err)
//                             })
//                     }).catch((err) => {
//                         mongoose.disconnect()
//                         reject(err)
//                     })
//                 }
//             })
//     })
// })

// Get all auditeur
auditeurRoute.route('/list').get((req, res, next) => {
    auditeur.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get auditeur
auditeurRoute.route('/read/:id').get((req, res, next) => {
    auditeur.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Update auditeur
auditeurRoute.route('/update/:id').put((req, res, next) => {
    auditeur.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('auditeur updated successfully!')
        }
    })
})


// Delete auditeur
auditeurRoute.route('/delete/:id').delete((req, res, next) => {
    auditeur.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = auditeurRoute;