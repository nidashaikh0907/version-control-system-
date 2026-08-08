const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); //when create a custom server, we need to use cors to avoid cross origin error
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //read the body of the request and parse it into json format
const http = require("http");
const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router.js");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pushRepo } = require("./controllers/push.js");
const { pullRepo } = require("./controllers/pull.js");
const { revertRepo } = require("./controllers/revert.js");
const userRouter = require("./routes/user.router.js");

dotenv.config(); //can access .env values using process.env

yargs(hideBin(process.argv))
  .command("start", "Start the server", {}, startServer)
  .command("init", "Initalise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "Add the file to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    },
  )
  .command(
    "commit <message>",
    "Create a commit",
    (yargs) => {
      yargs.positional("message", {
        describe: "commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    },
  )
  .command("push", "push commit to s3", {}, pushRepo)
  .command("pull", "pull commit to s3", {}, pullRepo)
  .command(
    "revert <commitID>",
    "Revert specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit ID to revert",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    },
  )
  .demandCommand(1, "You need atleast one command")
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(express.json());

  const mongoURL = process.env.MONGODB_URL;

  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });

  app.use(cors({ origin: "*" })); //allow frontend to access backend api from any origin

  app.use("/", mainRouter);
  let user = "test";
  const httpServer = http.createServer(app); //create a http server using express app

  const io = new Server(httpServer, {
    //gives continuous connection between client and server, so that server can send data to client without client requesting it
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    //when server enable socket connection, it will listen to the event "connection" and execute the callback function
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("======");
      console.log("User connected:", user);
      console.log("======");
      socket.join(userID); //join the room with the userID
    });
  });

  //Database connection and server start

  const db = mongoose.connection;

  db.once("open", async () => {
    //all requests will continue only after the database connection is established
    console.log("Database connected successfully");
    //crud operations will be performed here
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
