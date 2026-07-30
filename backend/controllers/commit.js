const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
  const repoPath = path.resolve(process.cwd(), ".hiddenGit");
  const stagedPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits"); //create commits path inside .hiddenGit

  try {
    const commitID = uuidv4(); //save id in coomitID
    const commitDir = path.join(commitPath, commitID); //create path of commitID inside commits
    await fs.mkdir(commitDir, { recursive: true }); //Create folder by using generated ID name

    const files = await fs.readdir(stagedPath); //read all files from staging folder
    for (const file of files) {
      //read each file
      await fs.copyFile(
        path.join(stagedPath, file),
        path.join(commitDir, file),
      );
    }

    await fs.writeFile(
      path.join(commitDir, "commit.json"), //create file name commit.json inside commits
      JSON.stringify({
        //stores commit msg and timestamp
        message,
        date: new Date().toISOString(),
      }),
    );

    console.log(`Commit ${commitID} created with message:${message}`);
  } catch (err) {
    console.log("Error while commiting files:", err);
  }
}

module.exports = { commitRepo };
