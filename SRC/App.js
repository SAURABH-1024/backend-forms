const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const hbs = require("hbs");
const { doesNotMatch } = require("assert");
const { urlencoded } = require("express");
const bcrypt = require("bcryptjs");

require("./DataBase/database");
// const userModel = require("./Models(Collections)/UserRegistrationCollection");
const Userregistrationmodel = require("./Models(Collections)/Userregistrationmodel");

const static_path = path.join(__dirname, "../PUBLIC/Css/Style.css");
// console.log(path.join(__dirname, "../PUBLIC/Css/Style.css"));
const template_path = path.join(__dirname, "../Templates/Views/");
const partial_path = path.join(__dirname, "../Templates/Partials");

app.set("view engine", "hbs"); // for using views folder we need to set the view engine first
app.set("views", template_path);
hbs.registerPartials(partial_path);
app.use(express.static(static_path));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
); // to get the data entered in form

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

//all the entered details in the registration page will enter the database thru the POST method

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, number, password, confirmpassword } =
      req.body;

    //validation for filling in the spaces
    if (
      !firstname ||
      !lastname ||
      !email ||
      !number ||
      !password ||
      !confirmpassword
    ) {
      res.status(400).json({
        error: "Please fill all details",
      });
    }

    // validation for email
    const emailExists = await Userregistrationmodel.findOne({
      email: email,
    });
    if (emailExists) {
      res.status(409).json({
        error: "EmailId already exists",
      });
      window.alert("Email already Exists");
    }

    const numberExist = await Userregistrationmodel.findOne({
      number: number,
    }); // validation for phone number
    if (numberExist) {
      res.status(422).json({
        error: "Phone number already exists",
      });
      window.alert("Phone number already exists");
    }

    if (password === confirmpassword) {
      const newUser = new Userregistrationmodel({
        firstname,
        lastname,
        email,
        number,
        password,
        confirmpassword,
      });

      //password hashing done here in betwn..after data is recieved and before it is saved

      const registered = await newUser.save();
      if (registered) {
        res.status(201).render("Home");
        console.log(registered);
        window.alert("Registration Successfull");
      } else {
        res.status(500).json({
          error: "something went wrong",
        });
      }
    } else {
      res.send("passwords do not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// LOGIN

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;
  const { email, password } = req.body;

  // this is to make sure the user has entered details in both fields//
  if (!email || !password) {
    res.status(400).json({
      error: "Fill in the details",
    });
    window.alert("Fill in the details");
  }

  try {
    const useremail = await Userregistrationmodel.findOne({
      email: email,
    });
    if (useremail) {
      const isMatch = await bcrypt.compare(password, useremail.password);
      if (isMatch) {
        res.status(201).render("home1");
      } else {
        res.send("error");
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log("server active");
});

//-----------------------------------------------------Practice--------------------------------------------------//

// const express = require("express");
// const app = express();
// const port = process.env.PORT || 8000;
// const path = require("path");
// const hbs = require("hbs");
// const { doesNotMatch } = require("assert");
// const { urlencoded } = require("express");
// const bcrypt = require("bcryptjs");

// const Userregistrationmodel = require("./Models(Collections)/Userregistrationmodel");
// require("./DataBase/database");

// const template_path = path.join(__dirname, "../Templates/Views");
// const partial_path = path.join(__dirname, "../Templates/Partials");

// app.set("view engine", "hbs");
// app.set("views", template_path);
// hbs.registerPartials(partial_path);
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// //------------------------------------------------Registraion---------------------------------------//

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/register", (req, res) => {
//   res.render("register");
// });

// app.post("/register", async (req, res) => {
//   const { name, email, phone, work, password, confirmpassword } = req.body; // obj destructuring
//validation
//  if (!name || !email || !phone || !work || !password || !confirmpassword) {
//   return res.status(422).json({ error: "Please fill all details" });
// }

// try {
//     const password = req.body.password;
//     const cpassword = req.body.confirpassword;

//     if (password === cpassword) {
//       const registrationDetails = new Userregistrationmodel({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         number: req.body.number,
//         password: password, // (req.body.password)
//         confirmpassword: cpassword, // (req.body.Cpassword)
//       });

//       const registered = await registrationDetails.save();
//       res.status(201).render("Home");
//     } else {
//       res.send("invalid login details");
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// //---------------------------------------------------LOGIN----------------------------------------------//

// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.post("/login", async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     const useremail = await Userregistrationmodel.findOne({ email: email });

//     const isMatching = await bcrypt.compare(password, useremail.password);

//     // if (useremail)
//     if (isMatching) {
//       res.status(201).render("home1");
//     } else {
//       res.send("error");
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// app.listen(port, () => {
//   console.log("server active");
// });
