import { fetchAuth } from "@/lib/fetch";
import { ZSAError } from "zsa";
import sharp from "sharp";

type UploadFileResponse = {
  img_urls: [
    {
      url: string;
      filename: string;
    },
  ];
  thumbnail: string;
};

export const uploadFileUseCase = async (
  file: File,
  userId: string,
): Promise<UploadFileResponse | undefined> => {
  try {
    const formData = new FormData();
    let thumbnail;

    if (file.type.startsWith("image")) {
      const buffer = await file.arrayBuffer();

      const thumbnailBuffer = await sharp(Buffer.from(buffer))
        .blur(1)
        .resize(10)
        .toBuffer();

      thumbnail = thumbnailBuffer.toString("base64");
    }

    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("type_upload", "users");

    const data = await fetchAuth({
      path: "/assets/v1/auth/upload",
      method: "POST",
      formData,
    });

    if (data.success) {
      return {
        ...data.data.data,
        ...(thumbnail && {
          thumbnail,
        }),
      };
    } else if (data.error) {
      throw new ZSAError("ERROR", "Failed to upload file");
    }
  } catch (error) {
    throw new ZSAError("ERROR", "Failed to upload file");
  }
};
