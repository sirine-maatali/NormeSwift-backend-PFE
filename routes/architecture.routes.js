const express = require('express');
const app = express();

const architectureRoute = express.Router();
let architecture = require('../models/architecture.model.js');

// Add architecture
architectureRoute.route('/add').post((req, res, next) => {
    architecture.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all architecture
architectureRoute.route('/list').get((req, res, next) => {
    architecture.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get architecture
architectureRoute.route('/read/:id').get((req, res, next) => {
    architecture.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Delete architecture
architectureRoute.route('/delete/:id').delete((req, res, next) => {
    architecture.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});
// Update architecture
architectureRoute.route('/update/:id').put((req, res, next) => {
    architecture.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('architecture updated successfully!')
        }
    })
})


module.exports = architectureRoute;