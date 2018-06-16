let express = require("express");
let path = require("path");

let app = express();
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const users = [
  {
    name: "vijay",
  },
  {
    name: "arun",
  },
  {
    name: "abhi",
  },
  {
    name: "suhas",
  },
  {
    name: "banu",
  },
  {
    name: "ankur",
  },
];

app.get("/", function(request, response) {
  response.render("index", {
    message: `Hey ${users[0].name}`,
    foo: request.query.foo,
    bar: request.query.bar,
    baz: request.query.baz,
  });
});

app.get("/users", function(req, res) {
  res.json(users);
});

app.post("/users", function(req, res) {
  users.push({
    name: req.body.name,
  });

  res.json(users);
});

app.listen(3000);
