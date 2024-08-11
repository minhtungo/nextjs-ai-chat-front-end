import { FC, useEffect, useRef } from "react";

interface EditChatTitleProps {
  newTitle: string;
  onTitleChange: (e: any) => void;
  setNewTitle: (value: string) => void;
}

const EditChatTitle: FC<EditChatTitleProps> = ({
  newTitle,
  onTitleChange,
  setNewTitle,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref.current]);

  return (
    <input
      value={newTitle}
      onChange={(e) => {
        setNewTitle(e.target.value);
      }}
      onBlur={onTitleChange}
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onTitleChange(e);
        }
      }}
      className="flex h-9 w-full flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
    />
  );
};

export default EditChatTitle;
