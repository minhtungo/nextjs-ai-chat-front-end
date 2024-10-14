import { UploadedFileDTO } from "@/api/asset/dto";
import { chatApi } from "@/lib/api";

const uploadFile = async (file: File): Promise<UploadedFileDTO> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("name", file.name);
  formData.append("type_upload", "users");

  const response = await chatApi.post("/assets/v1/auth/upload", formData, {
    type: "formData",
  });

  if (!response.success) {
    throw new Error("Failed to upload file");
  }

  return response.data.data;
};

const getUserUploadedFiles = async (userId: string) => {
  const response = await chatApi.get(
    `/assets/v1/auth/admin/assets/list?page=1&page_size=10?path=/users/${userId}/`,
  );

  if (!response.success) {
    throw new Error("Failed to get user uploaded files");
  }

  return response.data;

  // const assets = data.data.assets.map((asset: any) => ({
  //   id: asset._id,
  //   name: asset.name,
  //   type: asset.type_asset,
  //   url: asset.url_img,
  // }));

  // console.log(assets);

  // if (data.success) {
  //   return {
  //     assets: data.data,
  //   };
  // } else {
  //   console.log("Failed to get user uploaded files");
  // }
};

export default {
  uploadFile,
  getUserUploadedFiles,
};
