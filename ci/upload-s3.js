import { S3 } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const uploadList = [];

const findFiles = async (path) => {
  const files = await fs.promises.readdir(path);
  for (const file of files) {
    const filePath = `${path}/${file}`;
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      await findFiles(filePath);
    } else {
      uploadList.push(filePath);
    }
  }
};

const uploadFilesToS3 = async () => {
  const distDir = `${process.env.PWD}/dist`;

  await findFiles(distDir);

  const uploadPromises = uploadList.map(async (filePath) => {
    const key = filePath.replace(`${distDir}/`, "");
    const fileStream = fs.createReadStream(filePath);

    return new Promise((resolve, reject) => {
      fileStream.on("error", reject);
      fileStream.on("open", () => {
        const contentType = getContentType(filePath);
        s3.putObject(
          {
            Bucket: "komatzip",
            Key: key,
            Body: fileStream,
            ContentType: contentType,
          },
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
    });
  });

  await Promise.all(uploadPromises);
};

const getContentType = (filePath) => {
  // 파일 확장자에 따라 Content-Type 값을 결정
  const extension = filePath.split(".").pop();
  switch (extension) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "application/javascript";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "ico":
      return "image/vnd.microsoft.icon";
    case "txt":
    case "manifest":
      return "text/plain";
    case "svg":
      return "image/svg+xml";
    // 필요한 확장자와 해당하는 Content-Type을 추가로 처리
    default:
      return "application/octet-stream";
  }
};

uploadFilesToS3()
  .then(() => {
    console.log("Upload completed successfully.");
  })
  .catch((err) => {
    console.error("Upload failed:", err);
  });
