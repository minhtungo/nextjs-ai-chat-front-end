import { Card } from "@/components/ui/card";
import { useChat } from "@/hooks/use-chat";
import { FileText } from "lucide-react";
import { FC } from "react";

interface DocPreviewProps {
  name: string;
  type: "document" | "pdf" | "image";
  url: string;
}

const DocPreview: FC<DocPreviewProps> = ({ name, type, url }) => {
  const { updateDocIndex } = useChat();

  return (
    <Card
      className="flex h-14 w-fit max-w-[450px] items-center gap-2 overflow-hidden border-border bg-muted/40 p-2 hover:cursor-pointer"
      onClick={() => {
        updateDocIndex(url);
      }}
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
        <FileText className="size-4" />
      </div>
      <div>
        <div className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
          {name}
        </div>
        <div className="text-xs uppercase text-muted-foreground">{type}</div>
      </div>
    </Card>
  );
};

export default DocPreview;
