let express = require("express");
let path = require("path");
let methodOverride = require("method-override");

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

let todos = [
  {
    id: Math.floor(Math.random() * 100),
    title: "Pick up milk",
    completed: false,
  },
  {
    id: Math.floor(Math.random() * 100),
    title: "Learn templating",
    completed: false,
  },
  {
    id: Math.floor(Math.random() * 100),
    title: "Learn loops",
    completed: false,
  },
  {
    id: Math.floor(Math.random() * 100),
    title: "Learn about extending layouts",
    completed: false,
  },
  {
    id: Math.floor(Math.random() * 100),
    title: "Refactor route handlers to controller",
    completed: false,
  },
  {
    id: Math.floor(Math.random() * 100),
    title: "Refactor route handlers to a controller",
    completed: false,
  },
  {
    id: Math.floor(Math.random() * 100),
    title: "Use Twitter Bootstrap to make things look a little better",
    completed: false,
  },
];

app.get("/todos", function(req, res) {
  res.render("todos", {
    todos: todos,
  });
});

app.post("/todos", function(req, res) {
  let todo = {
    id: Math.floor(Math.random() * 100),
    title: req.body.title,
    completed: false,
  };

  todos.push(todo);

  res.redirect("/todos");
});

app.put("/todos/:id", function(req, res) {
  let id = req.params.id;

  todos.forEach(function(todo) {
    if (todo.id == id) {
      todo.completed = req.body.hasOwnProperty("todo");
    }
  });

  return res.redirect("/todos");
});

app.delete("/todos/:id", function(req, res) {
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

app.listen(3000);
