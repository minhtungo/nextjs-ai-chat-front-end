import { FC, useEffect, useRef } from "react";

interface EditChatTitleProps {
  title: string;
  setTitle: (value: string) => void;
  onUpdateTitle: (e: any) => void;
}

const EditChatTitle: FC<EditChatTitleProps> = ({
  title,
  setTitle,
  onUpdateTitle,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref.current]);

  return (
    <input
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      onBlur={onUpdateTitle}
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onUpdateTitle(e);
        }
      }}
      className="flex h-9 w-full flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
    />
  );
};

export default EditChatTitle;
