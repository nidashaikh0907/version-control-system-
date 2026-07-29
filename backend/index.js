const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pushRepo } = require("./controllers/push.js");
const { pullRepo } = require("./controllers/pull.js");
const { revertRepo } = require("./controllers/revert.js");

yargs(hideBin(process.argv))
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
    (argv)=>{
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commited Successfully",
    (yargs) => {
      yargs.positional("message", {
        describe: "commit message",
        type: "string",
      });
    },
    commitRepo,
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
    revertRepo,
  )
  .demandCommand(1, "You need atleast one command")
  .help().argv;
