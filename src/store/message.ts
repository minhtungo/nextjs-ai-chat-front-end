import { uploadFile } from "@/lib/file";
import { nanoid } from "@/lib/utils";
import { atom, useAtom } from "jotai";
import { toast } from "sonner";

export interface IFile {
  id: string;
  name: string;
  url?: string;
  preview?: string;
  type: "image" | "document";
  isUploading?: boolean;
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
    const newFiles: IFile[] = files.map((file) => {
      return {
        id: nanoid(),
        name: file.name,
        type: file.type.startsWith("image") ? "image" : "document",
        preview: file.type.startsWith("image")
          ? URL.createObjectURL(file)
          : undefined,
        isUploading: true,
      };
    });

    setMessageStore((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));

    // const formData = new FormData();

    // for (const file of files) {
    //   formData.append("file", file);
    //   formData.append("name", file.name);
    // }

    // const [data, error] = await uploadFileAction(formData);

    await Promise.all(
      files.map(async (file, index) => {
        try {
          setIsPending(true);
          const url = await uploadFile(file);
          setMessageStore((prev) => ({
            ...prev,
            files: prev.files.map((f) =>
              f.id === newFiles[index].id
                ? { ...f, url, isUploading: false }
                : f,
            ),
          }));
        } catch (error) {
          toast.error(`Upload failed for ${file.name}`);
          // Mark file as not uploading in state on failure
          setMessageStore((prev) => ({
            ...prev,
            files: prev.files.filter((f) => f.id !== newFiles[index].id),
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
