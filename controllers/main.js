//check username,password in post(login) request
//if exist create new JWT
//send back to front-end

//setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken");
//directly gets from index.js file
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  //options for data validation
  //db validation for user values(mongoose model has required set)
  //Joi - middleware
  //manual check in the controller
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }

  //normally we send id in payload
  //create fake id
  const id = new Date().getDate();

  //jwt sign takes (payload,secret,options)
  //dont send password in payload
  //provide resources of user in payload
  //send small payloads
  //for secret in production use long complex strings
  //secret kept in server and used to sign our jwt token
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //we send message with token on register/sign in
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  //   console.log(req.user);

  const lucky = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello,${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${lucky}`,
  });
};

module.exports = { login, dashboard };
