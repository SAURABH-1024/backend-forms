const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//__________________________________________Setting userSchema._____________________________________ //

const userRegistrationDetails = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
  required: true,
  },
});

userRegistrationDetails.pre("save", async function (next) {
  // const securepassword = await bcrypt.hash(password, 10)

  if (this.isModified("password")) {
    // console.log(this.password);
    this.password = await bcrypt.hash(this.password, 10);

    this.confirmpassword = undefined;
  }
  next();
});

const Userregistrationmodel = new mongoose.model(
  "Userregistrationmodel",
  userRegistrationDetails
);

module.exports = Userregistrationmodel;


//__________________________________________________________________________________________________________________//

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");


//__________________________________________setting userSchema._____________________________________ //

// const userRegistrationDetails = new mongoose.Schema({
//   firstname: {
//     type: String,
//     required: true,
//   },
//   lastname: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   number: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   confirmpassword: {
//     type: String,
//     required: true,
//   },
// });

// userRegistrationDetails.pre("save", async function (next) {
//    const securepassword = await bcrypt.hash(password, 10) // of no use

//   if (this.isModified("password")) {
//     // console.log(this.password);
//     this.password = await bcrypt.hash(this.password, 10);
  
//     this.confirmpassword = undefined;
//   }
//   next();

// });


// const Userregistrationmodel = new mongoose.model(
//   "Userregistrationmodel",
//   userRegistrationDetails
// );

// module.exports = Userregistrationmodel;
