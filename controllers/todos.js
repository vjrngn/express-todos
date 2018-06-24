let Todo = require("../models/Todo");

module.exports = {
  index: function(req, res) {
    Todo.find(function(err, todos) {
      // node style callback
      res.render("todos", {
        todos: todos,
      });
    });
  },

  store: function(req, res) {
    Todo.create(
      {
        title: req.body.title,
        completed: false,
      },
      function(err, todo) {
        res.redirect("/todos");
      }
    );
  },

  update: function(req, res) {
    let id = req.params.id;

    // Todo.findById(id, function(err, todo) {
    //   todo.update({ completed: req.body.completed === "on" }, function(err) {
    //     res.redirect("/todos");
    //   });
    // });

    Todo.updateOne(
      { _id: id },
      { completed: req.body.completed === "on" },
      function(err) {
        res.redirect("/todos");
      }
    );

    // Todo.findById(id, function(err, todo) {
    //   todo.set({ completed: req.body.completed === "on" });
    //   todo.save(function(err, updatedTodo) {
    //     res.redirect("/todos");
    //   });
    // });
  },

  destroy: function(req, res) {
    let id = req.params.id;

    Todo.deleteOne({ _id: id }, function(err) {
      if (err) {
        res.send("Something went wrong");
      }

      res.redirect("/todos");
    });

    // Todo.findById(id, function(err, todo) {
    //   todo.remove(function(err) {
    //     res.redirect("/todos");
    //   });
    // });
  },
};
