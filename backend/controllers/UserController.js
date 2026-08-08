const jwt = require("jsonwebtoken"); //gives us a token for user login
const bcrypt = require("bcryptjs"); //encrypt our password
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const url = process.env.MONGODB_URL;

let client;

async function connectClient() {
  //to establish connection with mongodb
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
  }
}

const getAllusers = (req, res) => {
  res.send("All user fetched");
};

async function signup(req, res) {
  const { username, password, email } = req.body;
  console.log(req.body);
  try {
    await connectClient();
    const db = client.db("githubclone"); //specify database name
    const usersCollection = db.collection("users"); //create collection named user in database

    const user = await usersCollection.findOne({ username }); //find if username exists
    if (user) {
      return res.status(400).json({ 
        message: "User with this username exists" }); //if exists then send status code 400
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt); //aquire salt properties and add hashing in password

    const newUser = {
      //create a new user
      username,
      password: hashPassword,
      email,
      repository: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await usersCollection.insertOne(newUser); //insert newUser in database collection named usersCollection

    const token = jwt.sign(
      //create a token by each user id
      { id: result.insertId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.json({ token });
  } catch (err) {
    console.error("error during signup:", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const login = (req, res) => {
  const{email,password}=req.body;
try{
  await connectClient();
  const db=client.db("githubclone");
  const userCollection=db.collection("user");
  const currUser=await userCollection.findOne({username});
  if(currUser){
    res.status(400).json({message:"User with this user name exists"});
  }
}
};

// crud operation

const getUserProfile = (req, res) => {
  res.send("profile fetched");
};

const updateUserProfile = (req, res) => {
  res.send("profile updated");
};

const deleteUserProfile = (req, res) => {
  res.send("profile deleted");
};

//All functionality exported below
module.exports = {
  getAllusers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
