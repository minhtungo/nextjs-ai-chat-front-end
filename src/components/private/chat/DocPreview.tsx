import { Card } from "@/components/ui/card";
import { File } from "lucide-react";
import { FC } from "react";

interface DocPreviewProps {
  name: string;
  type: "document" | "pdf" | "image";
}

const DocPreview: FC<DocPreviewProps> = ({ name, type }) => {
  return (
    <Card className="flex h-14 w-fit max-w-[450px] items-center gap-2 overflow-hidden border-border bg-muted/40 p-2">
      <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
        <File className="size-4" />
      </div>
      <div>
        <div className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
          {name}
        </div>
        <div className="text-xs capitalize text-muted-foreground">{type}</div>
      </div>
    </Card>
  );
};

export default DocPreview;
