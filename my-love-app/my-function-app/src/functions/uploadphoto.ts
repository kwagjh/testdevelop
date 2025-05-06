import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import Busboy from "busboy";
import { Readable } from "stream"; // 추가


// 환경 변수에서 연결 문자열을 읽음
const AZURE_STORAGE_CONNECTION_STRING = process.env.AzureWebJobsStorage!;
const CONTAINER_NAME = "uploaded-images";

export async function uploadphoto(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  if (request.method !== "POST") {
    return { status: 405, body: "Only POST method is allowed" };
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.startsWith("multipart/form-data")) {
    return { status: 400, body: "Content-Type must be multipart/form-data" };
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

  // 컨테이너가 없다면 생성
  await containerClient.createIfNotExists();

  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: Object.fromEntries(request.headers.entries()) });

    let uploadSuccess = false;

    busboy.on("file", async (fieldname, file, filename) => {
      const blockBlobClient = containerClient.getBlockBlobClient(filename);
      try {
        await blockBlobClient.uploadStream(file);
        uploadSuccess = true;
        resolve({ status: 200, body: `File "${filename}" uploaded successfully.` });
      } catch (error) {
        context.log("Upload error", error);
        reject({ status: 500, body: "Upload failed." });
      }
    });

    busboy.on("error", (err) => {
      reject({ status: 500, body: "Error parsing form." });
    });

    if (request.body) {
        const nodeReadable = Readable.fromWeb(request.body as any); // 타입 단언 추가
        nodeReadable.pipe(busboy);
      }
      
  });
};

app.http("uploadphoto", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: uploadphoto,
});
