import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Uploaded:", file.url);

    return {
      uploadedBy: "ChatPilot AI",
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;