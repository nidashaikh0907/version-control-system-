const jwt = require("jsonwebtoken"); //gives us a token for user login
const bcrypt = require("bcryptjs"); //encrypt our password
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;

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
        message: "User with this username exists",
      }); //if exists then send status code 400
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
    console.error("error during signup:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("githubclone");
    const userCollection = db.collection("users");
    const currUser = await userCollection.findOne({ email });

    if (!currUser) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, currUser.password); //check actual and current password
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: currUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, userId: currUser._id });
  } catch (err) {
    console.error("error during login in:", err.message);
    res.status(500).send("Server error!");
  }
}

// crud operation

async function getAllusers(req, res) {
  try {
    await connectClient();
    const db = client.db("githubclone");
    const userCollection = db.collection("users");

    const users = await userCollection.find({}).toArray(); //converted to array
    res.json(users);
  } catch (err) {
    console.error("error during fetching:", err.message);
    res.status(500).send("Server error!");
  }
}

async function getUserProfile(req, res) {
  const currentId = req.params.id;
  try {
    await connectClient();
    const db = client.db("githubclone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({
      _id: new ObjectId(currentId)//convert into mongodb object id
    });
    if (!user) {
      await res.status(400).json({ message: "User by this id not found" });
    }
    res.send(user);
  } catch (err) {
    console.error("error during fetching", err.message);
    res.status(500).send("server error!");
  }
}

async function updateUserProfile(req, res) {
 const currentId=req.params.id;
 const {email,password}=req.body;
 try{
 let upadateEmail={email};
 
 }catch (err) {
    console.error("error during fetching", err.message);
    res.status(500).send("server error!");
  }
}

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
