import { MathfieldElement } from "mathlive";
import { FC, RefObject, useEffect, useMemo, useRef } from "react";
import { useMathEquation } from "../../../../../../store/message";
import "./MathKeyboard.css";

interface MathKeyboardProps {
  formRef: RefObject<HTMLFormElement>;
}

const MathKeyboard: FC<MathKeyboardProps> = ({ formRef }) => {
  // const setMathEquation = useSetMathEquation();
  const {
    mathEquation: [mathEquation, setMathEquation],
  } = useMathEquation();

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
    if (mf) {
      // mfe.value = "f(x)=\\frac{x}{2}";
      if (containerRef.current) {
        // @ts-ignore
        containerRef.current.appendChild(mf);
      }
    }

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
      setMathEquation(evt.target.value);
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
      setMathEquation("");
      window.mathVirtualKeyboard.hide();
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
