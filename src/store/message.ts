import { uploadFileAction } from "@/actions/storage";
import { nanoid } from "@/lib/utils";
import { atom, useAtom } from "jotai";
import { toast } from "sonner";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_COUNT = 10;

export interface IFile {
  id: string;
  name: string;
  url?: string;
  preview?: string;
  type: "image" | "document" | "pdf";
  isUploading?: boolean;
  size: number;
}

interface IMessage {
  message: string;
  mathEquation: string;
  files: IFile[];
  isPending: boolean;
}

const initialMessageState: IMessage = {
  message: "",
  mathEquation: "",
  files: [],
  isPending: false,
};

const messageAtom = atom<IMessage>(initialMessageState);

// Helper hooks for interacting with the message state
const useMessageStore = () => {
  const [messageStore, setMessageStore] = useAtom(messageAtom);

  const { files: currentFiles } = messageStore;

  const setMessage = (message: string) =>
    setMessageStore((prev) => ({ ...prev, message }));
  const setMathEquation = (mathEquation: string) =>
    setMessageStore((prev) => ({ ...prev, mathEquation }));
  const setIsUploading = (isUploading: boolean) =>
    setMessageStore((prev) => ({ ...prev, isUploading }));
  const setIsPending = (isPending: boolean) =>
    setMessageStore((prev) => ({ ...prev, isPending }));

  const setFiles = (update: IFile[] | ((prevFiles: IFile[]) => IFile[])) =>
    setMessageStore((prev) => ({
      ...prev,
      files: typeof update === "function" ? update(prev.files) : update,
    }));

  const addFiles = async (files: File[]) => {
    if (!files || files.length === 0) {
      return;
    }

    let totalFilesSize = currentFiles.reduce((acc, file) => acc + file.size, 0);

    const totalFilesCount = currentFiles.length;

    let validFiles = [] as IFile[];

    for (let file of files) {
      totalFilesSize += file.size;
      if (
        totalFilesCount + validFiles.length <= MAX_FILE_COUNT &&
        totalFilesSize <= MAX_FILE_SIZE_MB * 1024 * 1024
      ) {
        validFiles.push({
          id: nanoid(),
          name: file.name,
          type: file.type.startsWith("image")
            ? "image"
            : file.type.includes("pdf")
              ? "pdf"
              : "document",
          preview: file.type.startsWith("image")
            ? URL.createObjectURL(file)
            : undefined,
          size: file.size,
          isUploading: true,
        });
      } else {
        toast.error(
          `You can only upload ${MAX_FILE_COUNT} files and ${MAX_FILE_SIZE_MB}MB of files at a time.`,
        );
        return;
      }
    }

    setMessageStore((prev) => ({
      ...prev,
      files: [...prev.files, ...validFiles],
    }));

    await Promise.all(
      files.map(async (file, index) => {
        try {
          setIsPending(true);

          const formData = new FormData();
          formData.append("file", file);
          formData.append("name", file.name);

          const [data, error] = await uploadFileAction(formData);

          if (error) {
            throw new Error(error.message);
          }

          const url = data.img_urls[0].url;

          setMessageStore((prev) => ({
            ...prev,
            files: prev.files.map((f) =>
              f.id === validFiles[index].id
                ? { ...f, url, isUploading: false }
                : f,
            ),
          }));
        } catch (error) {
          toast.error(`Upload failed for ${file.name}`);
          // Mark file as not uploading in state on failure
          setMessageStore((prev) => ({
            ...prev,
            files: prev.files.filter((f) => f.id !== validFiles[index].id),
          }));
        } finally {
          setIsPending(false);
        }
      }),
    );
  };

  const removeFile = (fileId: string) => {
    setMessageStore((prev) => ({
      ...prev,
      files: prev.files.filter((file) => file.id !== fileId),
    }));
  };

  const clearMessageStore = () => setMessageStore(initialMessageState);

  return {
    messageStore,
    setMessage,
    setMathEquation,
    setFiles,
    setIsUploading,
    clearMessageStore,
    addFiles,
    removeFile,
  };
};

export { useMessageStore };
