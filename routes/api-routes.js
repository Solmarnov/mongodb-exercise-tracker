const db = require("../models");
const mongojs = require("mongojs");

module.exports = function(app) {
  // route for API.getLastWorkout
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });

  // route for API.createWorkout
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });

  // route for API.addExercise
  app.put("/api/workouts/:id", (req, res) => {
    const { body } = req;
    db.Workout.findOneAndUpdate(
      // Find document with _id of id
      { _id: mongojs.ObjectId(req.params.id) }, 
      // Push added exercises's _id into the located Workout
      { $push: { exercises: body } }, 
      // Return dbWorkout after update is applied
      { new: true }
    )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });
};