"use strict";
const app = require("./main");
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server is listening on port ${port}.`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}.`));
