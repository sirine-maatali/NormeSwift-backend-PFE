var mongoose = require('mongoose');

var auditeurSchema = mongoose.Schema({
    nom: {
        type: String,
        required: 'full name can\'t be empty',
    },
    prenom: {
        type: String,
        required: 'full last name can\'t be empty',
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email field is not provided "],
    },
    mdp: { type: String, required: true, minLength: 6 },
    pays: {
        type: String,
        required: 'pays can\'t be empty',
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('auditeurs', auditeurSchema);

// let url = 'mongodb+srv://projetpfe:projetpfe@projetpfe.ii4ex.mongodb.net/evaluation?retryWrites=true&w=majority'

// auditeurRoute.route('/add').post((email, mdp) => {
//     return new promise((resolve, reject) => {
//         mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//             .then(() => {
//                 return auditeurSchema.findOne({ email: email })
//             }).then((doc) => {
//                 if (doc) {
//                     mongoose.disconnect()
//                     reject('this email exist')
//                 } else {
//                     bcrypt.hash(mdp, 10).then((hashedmdp) => {
//                         let auditeur = new auditeur({

//                             email: email,
//                             mdp: hashedmdp
//                         })
//                         auditeur.save().then((auditeur) => {
//                                 mongoose.disconnect()
//                                 resolve(auditeur)
//                             })
//                             .catch((err) => {
//                                 mongoose.disconnect()
//                                 reject(err)
//                             })
//                     }).catch((err) => {
//                         mongoose.disconnect()
//                         reject(err)
//                     })
//                 }
//             })
//     })
// })