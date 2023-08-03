const express = require("express");
const router = require("./routes");
const app = express();
const port = 3000;
const session = require("express-session");

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(
  session({
    secret: "inirahasiakitabersama",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view emgine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
