let express = require("express");
let router = express.Router();
let todos = require("../data/todos");
let Todo = require("../models/Todo");

router.get("/", function(req, res) {
  Todo.find(function(err, todos) {
    // node style callback
    res.render("todos", {
      todos: todos,
    });
  });
});

router.post("/", function(req, res) {
  Todo.create(
    {
      title: req.body.title,
      completed: false,
    },
    function(err, todo) {
      res.redirect("/todos");
    }
  );
});

router.put("/:id", function(req, res) {
  let id = req.params.id;

  Todo.findById(id, function(err, todo) {
    todo.set({ completed: req.body.completed === "on" });
    todo.save(function(err, updatedTodo) {
      res.redirect("/todos");
    });
  });
});

router.delete("/:id", function(req, res) {
  let id = req.params.id;

  Todo.findById(id, function(err, todo) {
    todo.remove(function(err) {
      res.redirect("/todos");
    });
  });
});

module.exports = router;
