const express = require('express');
const app = express();

const banqueRoute = express.Router();
let banque = require('../models/banque.model.js');

// Add banque
banqueRoute.route('/add').post((req, res, next) => {
    banque.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all banque
banqueRoute.route('/list').get((req, res, next) => {
    banque.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get banque
banqueRoute.route('/read/:id').get((req, res, next) => {
    banque.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Update banque
banqueRoute.route('/update/:id').put((req, res, next) => {
    banque.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('banque updated successfully!')
        }
    })
})


// Delete banque
banqueRoute.route('/delete/:id').delete((req, res, next) => {
    banque.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = banqueRoute;