import { useAtomValue, useSetAtom } from "jotai";
import {
  messageAtom,
  pendingAtom,
  docsAtom,
  imagesAtom,
  initialMessageAtom,
  isWithinTokenLimitAtom,
  filesUploadAtom,
  fileRemovalAtom,
  filesAtom,
} from "@/atoms/message";

export const useMessage = () => {
  return {
    message: useAtomValue(messageAtom),
    setMessage: useSetAtom(messageAtom),
    pending: useAtomValue(pendingAtom),
    docs: useAtomValue(docsAtom),
    images: useAtomValue(imagesAtom),
    files: useAtomValue(filesAtom),
    addFiles: useSetAtom(filesUploadAtom),
    removeFile: useSetAtom(fileRemovalAtom),
    inTokenLimit: useAtomValue(isWithinTokenLimitAtom),
    setInTokenLimit: useSetAtom(isWithinTokenLimitAtom),
    resetMessageState: useSetAtom(initialMessageAtom),
  };
};
