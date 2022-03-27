const express = require('express');
const app = express();

const solutionRoute = express.Router();
let solution = require('../models/solution.model.js');


//add solution
solutionRoute.route('/add').post((req, res, next) => {
    solution.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all solution
solutionRoute.route('/list').get((req, res, next) => {
    solution.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get solution
solutionRoute.route('/read/:id').get((req, res, next) => {
    solution.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update solution
solutionRoute.route('/update/:id').put((req, res, next) => {
        solution.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                return next(error);
                console.log(error)
            } else {
                res.json(data)
                console.log('solution updated successfully!')
            }
        })
    })
    // Delete solution
solutionRoute.route('/delete/:id').delete((req, res, next) => {
    solution.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = solutionRoute;