import { useAtomValue, useSetAtom } from "jotai";
import {
  messageAtom,
  pendingAtom,
  docsAtom,
  imagesAtom,
  initialMessageAtom,
  isWithinTokenLimitAtom,
  uploadFileAtom,
  removeFileAtom,
  filesAtom,
  mathModeAtom,
} from "@/atoms/message";

export const useMessage = () => {
  return {
    message: useAtomValue(messageAtom),
    setMessage: useSetAtom(messageAtom),
    pending: useAtomValue(pendingAtom),
    docs: useAtomValue(docsAtom),
    images: useAtomValue(imagesAtom),
    files: useAtomValue(filesAtom),
    addFiles: useSetAtom(uploadFileAtom),
    removeFile: useSetAtom(removeFileAtom),
    inTokenLimit: useAtomValue(isWithinTokenLimitAtom),
    setInTokenLimit: useSetAtom(isWithinTokenLimitAtom),
    mathMode: useAtomValue(mathModeAtom),
    setMathMode: useSetAtom(mathModeAtom),
    resetMessageState: useSetAtom(initialMessageAtom),
  };
};
