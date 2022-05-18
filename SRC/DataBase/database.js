// const mongoose = require("mongoose");

// const newLocal = "mongodb://localhost:27017/BackendProject";
// mongoose
//   .connect(newLocal, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("db created successfully");
//   })
//   .catch((e) => {
//     console.log("db creation failed");
//   });

//__________________________________________Creating a MONGODB DATABASE._____________________________________ //

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/BackendProject")
  .then(() => {
  console.log("db created successfully");
  })
  .catch(() => {
  console.log("db creation failed");
})