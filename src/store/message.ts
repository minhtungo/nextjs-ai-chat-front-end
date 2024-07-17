import { atom, useAtom } from "jotai";

export interface IFile {
  name: string;
  url?: string;
  type: "image" | "document";
  file: File;
}

interface IMessage {
  message: string;
  mathEquation: string;
  files: IFile[];
}

const messageAtom = atom<IMessage>({
  message: "",
  mathEquation: "",
  files: [],
});

// Helper hooks for interacting with the message state
const useMessageStore = () => {
  const [messageStore, setMessageStore] = useAtom(messageAtom);

  const setMessage = (message: string) =>
    setMessageStore((prev) => ({ ...prev, message }));
  const setMathEquation = (mathEquation: string) =>
    setMessageStore((prev) => ({ ...prev, mathEquation }));

  const setFiles = (update: IFile[] | ((prevFiles: IFile[]) => IFile[])) =>
    setMessageStore((prev) => ({
      ...prev,
      files: typeof update === "function" ? update(prev.files) : update,
    }));

  const addFile = (newFile: IFile) =>
    setFiles((prevFiles) => [...prevFiles, newFile]);

  const clearMessageStore = () =>
    setMessageStore({ message: "", mathEquation: "", files: [] });

  return {
    messageStore,
    setMessage,
    setMathEquation,
    setFiles,
    clearMessageStore,
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
