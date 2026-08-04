const fs = require("fs");
const path = require("path");
const { promisify } = require("util"); //allow us to check for the existing things

const readdir = promisify(fs.readdir); //craete modified version of readdir
const copyFile = promisify(fs.copyFile); //craete modified version of copyFile

async function revertRepo(commitID) {
  const repoPath = path.resolve(process.cwd(), ".hiddenGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitsPath, commitID); //creats a path of commitID inside commits
    const files = await readdir(commitDir); //read  all files from commitID folder
    const parentDir = path.resolve(repoPath, ".."); //get the parent directory of .hiddenGit

    for (const file of files) {
      //read each file
      await copyFile(path.join(commitDir, file), path.join(parentDir, file)); //transfer the file from commitID folder to parent directory of .hiddenGit
    }
    console.log(`Reverted to commit ${commitID}`);
  } catch (err) {
    console.error("Error reverting commit:", err);
  }
}

module.exports = { revertRepo };
