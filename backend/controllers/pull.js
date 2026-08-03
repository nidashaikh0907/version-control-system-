const fs = require("fs").promises;
const path = require("path");
const { s3, s3_BUCKET } = require("../config/aws-config");

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".hiddenGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const data = await s3
      .listObjectsV2({ Bucket: s3_BUCKET, Prefix: "commits/" }) //read the commits folder in s3 bucket
      .promise();

    const objects = data.Contents; //store the list of objects in the commits folder

    for (const object of objects) {
      //read each folder in the commits folder
      const key = object.Key;
      const commitDir = path.join(
        commitsPath,
        path.dirname(key).split("/").pop(),
      );

      await fs.mkdir(commitDir, { recursive: true });

      const params = {
        //read the file from s3 bucket
        Bucket: s3_BUCKET,
        Key: key,
      };

      const fileContent = await s3.getObject(params).promise(); //read the file content from s3 bucket
      await fs.writeFile(path.join(repoPath, key), fileContent.Body); //write the file content to the local .hiddenGit folder
    }
     console.log("All commits pulled successfully from S3.");
  } catch (err) {
    console.error("Error occurred while pulling commits from S3:", err);
  }
}

module.exports = { pullRepo };
