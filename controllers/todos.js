let express = require('express');
let router = express.Router();
let todos = require('../data/todos');

router.get("/", function (req, res) {
  res.render("todos", {
    todos: todos,
  });
});

router.post("/", function (req, res) {
  let todo = {
    id: Math.floor(Math.random() * 100),
    title: req.body.title,
    completed: false,
  };

  todos.push(todo);

  res.redirect("/todos");
});

router.put("/:id", function (req, res) {
  let id = req.params.id;

  todos.forEach(function (todo) {
    if (todo.id == id) {
      todo.completed = req.body.hasOwnProperty("todo");
    }
  });

  return res.redirect("/todos");
});

router.delete("/:id", function (req, res) {
  let id = req.params.id;
  todos = todos.filter(function (todo) {
    if (todo.id == req.params.id) {
      return false;
    } else {
      return true;
    }
  });

  res.redirect("/todos");
});

module.exports = router;