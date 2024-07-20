import { Card } from "@/components/ui/card";
import { FC } from "react";

interface DocPreviewProps {
  name: string;
}

const DocPreview: FC<DocPreviewProps> = ({ name }) => {
  return (
    <Card className="h-14 w-full max-w-[450px] overflow-hidden border-border bg-muted/40 p-2 pr-4 sm:p-2 sm:pr-6">
      <div className="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
        {name}
      </div>
      <div className="text-xs text-muted-foreground">Document</div>
    </Card>
  );
};

export default DocPreview;
