import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const messageAtom = atom<string>("");
const mathEquationAtom = atom<string>("");
const submitContentAtom = atom(
  (get) => get(mathEquationAtom) || get(messageAtom) || "",
);
const filesAtom = atom<File[]>([]);

const useMessage = () => {
  return {
    message: useAtom(messageAtom),
    setMessage: useSetAtom(messageAtom),
    getMessage: useAtomValue(messageAtom),
  };
};

const useMathEquation = () => {
  return {
    mathEquation: useAtom(mathEquationAtom),
    setMathEquation: useSetAtom(mathEquationAtom),
    getMathEquation: useAtomValue(mathEquationAtom),
  };
};

const useGetSubmitContent = () => {
  return useAtomValue(submitContentAtom);
};

const useFiles = () => {
  return {
    files: useAtom(filesAtom),
    setFiles: useSetAtom(filesAtom),
    getFiles: useAtomValue(filesAtom),
  };
};

export { useMessage, useMathEquation, useGetSubmitContent, useFiles };
