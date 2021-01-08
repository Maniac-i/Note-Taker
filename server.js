const express = require("express");
const path = require("path");
const app = express();

PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(static(path.join(__dirname, "public")));




app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}.`);
})