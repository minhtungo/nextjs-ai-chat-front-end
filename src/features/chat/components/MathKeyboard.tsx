import { useMessage } from "@/features/chat/store/use-message";
import { MathfieldElement } from "mathlive";
import { RefObject, useEffect, useMemo, useRef } from "react";

interface MathKeyboardProps {
  formRef: RefObject<HTMLFormElement>;
  inputRef: RefObject<HTMLTextAreaElement>;
}

const MathKeyboard = ({ formRef, inputRef }: MathKeyboardProps) => {
  const mathRef = useRef<HTMLDivElement>(null);

  const mf = useMemo(
    () =>
      new MathfieldElement({
        mathVirtualKeyboardPolicy: "manual",
        letterShapeStyle: "upright",
      }),
    [],
  );

  useEffect(() => {
    console.log("useEffect MathKeyboard");
    if (!mathRef.current || !mf) return;

    // mfe.value = "f(x)=\\frac{x}{2}";
    // @ts-ignore
    mathRef.current.appendChild(mf);

    mf.focus();

    mf.onfocus = (evt: any) => {
      window.mathVirtualKeyboard.show();
    };

    mf.onbeforeinput = (e: any) => {
      if (e.inputType === "insertLineBreak") {
        if (inputRef.current) {
          inputRef.current.value += e.target.value;
        }
        formRef.current?.requestSubmit();
        e.preventDefault();
      }
    };

    // mf.oninput = (e: any) => {
    //   console.log("on input", e.key);
    //   console.log("on input", e.target.value);
    //   if (inputRef.current) {
    //     inputRef.current.value += e.target.value;
    //   }
    //   // setMessage(e.target.value);
    // };

    window.mathVirtualKeyboard.container =
      document.getElementById("math-keyboard");

    window.mathVirtualKeyboard.addEventListener("geometrychange", () => {
      const mathKeyboard = document.getElementById("math-keyboard");

      if (!mathKeyboard) return;

      mathKeyboard.style.height =
        window.mathVirtualKeyboard.boundingRect.height + "px";
    });

    window.mathVirtualKeyboard.show();

    return () => {
      window.mathVirtualKeyboard.container = null;
    };
  }, []);

  // useEffect(() => {
  //   if (mf) {
  //     mf.value = content;
  //   }
  // }, [content]);

  return <div className="mathKeyboard" ref={mathRef} />;
};

export default MathKeyboard;
