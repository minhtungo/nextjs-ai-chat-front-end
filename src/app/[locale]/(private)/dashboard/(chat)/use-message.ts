import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const messageAtom = atom<string>("");
const mathEquationAtom = atom<string>("");

const submitContentAtom = atom(
  (get) => get(mathEquationAtom) || get(messageAtom) || "",
);

export function useMessage() {
  return useAtom(messageAtom);
}

export function useSetMessage() {
  return useSetAtom(messageAtom);
}

export function useGetMessage() {
  return useAtomValue(messageAtom);
}

export function useMathEquation() {
  return useAtom(mathEquationAtom);
}

export function useSetMathEquation() {
  return useSetAtom(mathEquationAtom);
}

export function useGetMathEquation() {
  return useAtomValue(mathEquationAtom);
}

export function useGetSubmitContent() {
  return useAtomValue(submitContentAtom);
}
