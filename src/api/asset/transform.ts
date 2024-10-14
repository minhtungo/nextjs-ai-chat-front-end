import { UploadedFileDTO } from "@/api/asset/dto";
import { UploadedFile } from "@/domain/asset";

export const dtoToUploadedFile = (dto: UploadedFileDTO): UploadedFile => {
  return {
    url: dto.img_urls[0].url,
  };
};
