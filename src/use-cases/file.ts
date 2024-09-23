import { fetchAuth } from "@/lib/api";
import { ZSAError } from "zsa";

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

    // if (file.type.startsWith("image")) {
    //   const buffer = await file.arrayBuffer();

    //   const thumbnailBuffer = await sharp(Buffer.from(buffer))
    //     .blur(1)
    //     .resize(10)
    //     .toBuffer();

    //   thumbnail = thumbnailBuffer.toString("base64");
    // }

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
        // ...(thumbnail && {
        //   thumbnail,
        // }),
      };
    } else if (data.error) {
      throw new ZSAError("ERROR", "Failed to upload file");
    }
  } catch (error) {
    throw new ZSAError("ERROR", "Failed to upload file");
  }
};

// type GetUploadedFilesResponse = {
//   assets: [
//     {
//       id: string;
//       name: string;
//       type: string;
//       url: string;
//     },
//   ];
// };

export const getUserUploadedFilesUseCase = async (userId: string) => {
  const data = await fetchAuth({
    path: `/assets/v1/auth/admin/assets/list?page=1&page_size=10?path=/users/${userId}/`,
    method: "GET",
  });

  // const assets = data.data.assets.map((asset: any) => ({
  //   id: asset._id,
  //   name: asset.name,
  //   type: asset.type_asset,
  //   url: asset.url_img,
  // }));

  // console.log(assets);

  if (data.success) {
    return {
      assets: data.data,
    };
  } else if (data.error) {
    console.log("Failed to get user uploaded files: " + data.error);
  }
};
