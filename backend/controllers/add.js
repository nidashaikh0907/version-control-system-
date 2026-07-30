const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
  const repoPath = path.resolve(process.cwd(), ".hiddenGit"); //inside current working directory path creats a path of hiddengit
  const stagingPath = path.join(repoPath, "staging");//create stagingPath's path inside .hiddenGit 

  try {
    await fs.mkdir(stagingPath, { recursive: true });//create stagingPath folder inside .hiddenGit
    const fileName = path.basename(filePath);//extrating FileName from the path
    await fs.copyFile(filePath, path.join(stagingPath, fileName));//Making copy of the file in stagingPath
    console.log(`File ${fileName} added to the staging area!`);
  } catch (err) {
    console.error("error while adding file:", err);
  }
}

module.exports = { addRepo };
