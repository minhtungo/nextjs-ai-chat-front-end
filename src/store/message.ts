import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const messageAtom = atom<string>("");
const mathEquationAtom = atom<string>("");
const submitContentAtom = atom(
  (get) => get(mathEquationAtom) || get(messageAtom) || "",
);
const filesAtom = atom<File[]>([]);

const messageStore = () => {
  return {
    store: useAtom(messageAtom),
    setMessage: useSetAtom(messageAtom),
    getMessage: useAtomValue(messageAtom),
  };
};

const mathEquationStore = () => {
  return {
    store: useAtom(mathEquationAtom),
    setMathEquation: useSetAtom(mathEquationAtom),
    getMathEquation: useAtomValue(mathEquationAtom),
  };
};

const submitContentStore = () => {
  return useAtomValue(submitContentAtom);
};

const filesStore = () => {
  return {
    store: useAtom(filesAtom),
    setFiles: useSetAtom(filesAtom),
    getFiles: useAtomValue(filesAtom),
  };
};

export { messageStore, mathEquationStore, submitContentStore, filesStore };
