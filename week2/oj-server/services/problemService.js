var problemModel = require('../models/problemModel');

//get all problems
var getProblems = function () {
    return new Promise((resolve, reject) => {
        problemModel.find({}, function (err, prblems) {
            if (err) {
                reject(err);
            } else {
                resolve(prblems);
            }
          });
    });
};

//get single problem by id
var getProblem = function (id) {
    return new Promise((resolve, reject) => {
        problemModel.findOne({id: id}, function (err, problem) {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
};

//add new problem
var addProblem = function (newProblem) {
    return new Promise((resolve, reject) => {
        problemModel.findOne({name: newProblem.name}, function (err, problem) {
            if (problem) {
                reject("Problem name already exists!");
            } else {
                problemModel.count({}, function (err, num) {
                    newProblem.id = num + 1;
                    var mongoProblem = new problemModel(newProblem);
                    mongoProblem.save();
                    resolve(newProblem);
                });
            }
        });
    });
}

module.exports = {
    getProblems: getProblems,
    getProblem: getProblem,
    addProblem: addProblem
}