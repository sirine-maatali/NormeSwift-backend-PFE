const express = require('express');
const app = express();
const mongoose = require('mongoose');
cors = require('cors');
bodyParser = require('body-parser');

let url = 'mongodb+srv://projetpfe:projetpfe@projetpfe.ii4ex.mongodb.net/evaluation?retryWrites=true&w=majority'
    //connecting to database
mongoose.connect(url, (err, done) => {
    if (err) {
        console.log(err);
    }
    if (done) {
        console.log("base de donnees connecté avec succes !");
    }
});
const authRoute = require('./routes/auth.routes');
const solutionRoute = require('./routes/solution.routes');
const banqueRoute = require('./routes/banque.routes');
const risqueRoute = require('./routes/risque.routes');
const auditeurRoute = require('./routes/auditeur.routes');
const architectureRoute = require('./routes/architecture.routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
app.use('/auth', authRoute);
app.use('/banque', banqueRoute);
app.use('/solution', solutionRoute);
app.use('/risque', risqueRoute);
app.use('/auditeur', auditeurRoute);
app.use('/architecture', architectureRoute)
    // for mounting static files to express server
    // app.use(express.static(__dirname + 'public/'));

// 404 Handler
// app.use((req, res, next) => {
//     next();
// });

// Base Route
app.get('/', (req, res, next) => {
    res.send('invaild endpoint');
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/angular-mean-crud-tutorial/index.html'));
// });

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


app.listen(5000, () => console.log("serveur en marche"));