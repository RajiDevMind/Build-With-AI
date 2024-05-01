const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}...`);
});
