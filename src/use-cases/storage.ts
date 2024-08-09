import { fetchAuth } from "@/lib/fetch";
import { ZSAError } from "zsa";

export const uploadFileUseCase = async (file: File, userId: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("type_upload", "users");

    const data = await fetchAuth({
      path: "/assets/v1/auth/upload",
      method: "POST",
      formData,
    });

    if (data.success) {
      return data.data.data;
    } else if (data.error) {
      throw new ZSAError("ERROR", "Failed to upload file");
    }
  } catch (error) {
    throw new ZSAError("ERROR", "Failed to upload file");
  }
};
