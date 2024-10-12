import { useMessage } from "@/features/chat/store/use-message";
import { MathfieldElement } from "mathlive";
import { RefObject, useEffect, useMemo, useRef } from "react";

interface MathKeyboardProps {
  formRef: RefObject<HTMLFormElement>;
}

const MathKeyboard = ({ formRef }: MathKeyboardProps) => {
  const {
    message: { mathEquation },
    setMessage,
  } = useMessage();

  const containerRef = useRef(null);

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
    if (!containerRef.current || !mf) return;

    // mfe.value = "f(x)=\\frac{x}{2}";
    // @ts-ignore
    containerRef.current.appendChild(mf);

    mf.focus();

    mf.onfocus = (evt: any) => {
      window.mathVirtualKeyboard.show();
    };

    mf.onbeforeinput = (evt: any) => {
      if (evt.inputType === "insertLineBreak") {
        formRef.current?.requestSubmit();
        evt.preventDefault();
      }
    };

    mf.oninput = (evt: any) => {
      setMessage((prev) => ({ ...prev, mathEquation: evt.target.value }));
    };

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
      mf.remove();
      // if (containerRef) {
      //   // @ts-ignore
      //   containerRef?.current = null;
      // }
      setMessage((prev) => ({ ...prev, mathEquation: "" }));
    };
  }, []);

  useEffect(() => {
    if (mf) {
      mf.value = mathEquation;
    }
  }, [mathEquation]);

  return <div className="mathKeyboard" ref={containerRef} />;
};

export default MathKeyboard;
