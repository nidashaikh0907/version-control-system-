const fs = require("fs").promises;
const path = require("path");
const { s3, s3_BUCKET } = require("../config/aws-config");

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".hiddenGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath); //read all commit directories
    for (const commitDir of commitDirs) {
      //iterate through each commit directory
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        //iterate through each file in the commit directory
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        const params = {
          //set the parameters for S3 upload
          Bucket: s3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        };

        await s3.upload(params).promise(); //upload the file to S3
        console.log(`File ${file} from commit ${commitDir} uploaded to S3`);
      }
    }
  } catch (err) {
    console.log("Error while pushing files to S3:", err);
  }
}

module.exports = { pushRepo };
