const fs = require("fs").promises;
const path = require("path"); //node.js module to work with files and folders path

async function initRepo() {
  const repoPath = path.resolve(process.cwd(), ".hiddenGit"); //inside current working directory path creats a path of hiddengit
  const commitPath = path.join(repoPath, "commits"); //creats a path for the commits folder inside .hiddengit

  try {
    await fs.mkdir(repoPath, { recursive: true }); //recursive means can create nesting folder,also create parent folder
    await fs.mkdir(commitPath, { recursive: true }); //create commit folder inside .hiddengit
    await fs.writeFile(
      path.join(repoPath, "config.js"), //inside .hiddengit folder create new file config.js
      JSON.stringify({ bucket: process.env.S3_BUCKET }), //S3 bucket details
    );
    console.log("repository initalized");
  } catch (err) {
    console.error("error while initialising repository", err);
  }
}

module.exports = { initRepo };
 