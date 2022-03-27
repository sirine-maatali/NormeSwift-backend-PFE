const express = require('express');
const app = express();

const risqueRoute = express.Router();
let risque = require('../models/risque.model.js');


//add risque
risqueRoute.route('/add').post((req, res, next) => {
    risque.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all risque
risqueRoute.route('/list').get((req, res, next) => {
    risque.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get risque
risqueRoute.route('/read/:id').get((req, res, next) => {
    risque.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update risque
risqueRoute.route('/update/:id').put((req, res, next) => {
        risque.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                return next(error);
                console.log(error)
            } else {
                res.json(data)
                console.log('risque updated successfully!')
            }
        })
    })
    // Delete risque
risqueRoute.route('/delete/:id').delete((req, res, next) => {
    risque.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})


module.exports = risqueRoute;