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
}

const initialMessageState: IMessage = {
  message: "",
  mathEquation: "",
  files: [],
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
        url: URL.createObjectURL(file),
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

    await Promise.all(
      files.map(async (file, index) => {
        try {
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

// import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

// const messageAtom = atom<string>("");
// const mathEquationAtom = atom<string>("");
// const submitContentAtom = atom(
//   (get) => get(mathEquationAtom) || get(messageAtom) || "",
// );
// const filesAtom = atom<File[]>([]);

// const messageStore = () => {
//   return {
//     store: useAtom(messageAtom),
//     setMessageStore: useSetAtom(messageAtom),
//     getMessage: useAtomValue(messageAtom),
//   };
// };

// const mathEquationStore = () => {
//   return {
//     store: useAtom(mathEquationAtom),
//     setMathEquation: useSetAtom(mathEquationAtom),
//     getMathEquation: useAtomValue(mathEquationAtom),
//   };
// };

// const submitContentStore = () => {
//   return useAtomValue(submitContentAtom);
// };

// const filesStore = () => {
//   return {
//     store: useAtom(filesAtom),
//     setFiles: useSetAtom(filesAtom),
//     getFiles: useAtomValue(filesAtom),
//   };
// };

// export { messageStore, mathEquationStore, submitContentStore, filesStore };
