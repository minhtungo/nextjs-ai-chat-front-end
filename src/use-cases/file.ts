import assetApi from "@/api/asset/api";
import { dtoToUploadedFile } from "@/api/asset/transform";
import { UploadedFile } from "@/domain/asset";

export const uploadFileUseCase = async (
  file: File,
): Promise<UploadedFile | undefined> => {
  const uploadedFileDTO = await assetApi.uploadFile(file);
  return dtoToUploadedFile(uploadedFileDTO);
};

export const getUserUploadedFilesUseCase = async (userId: string) => {
  const userUploadedFilesDTO = await assetApi.getUserUploadedFiles(userId);

  return userUploadedFilesDTO.data.assets.map((asset: any) => ({
    id: asset._id,
    name: asset.name,
    type: asset.type_asset,
    url: asset.url_img,
  }));
};
