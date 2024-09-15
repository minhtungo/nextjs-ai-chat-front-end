import Spinner from "@/components/common/Spinner";
import DocPreview from "@/components/private/chat/DocPreview";
import { useMessage } from "@/hooks/use-message";
import { X } from "lucide-react";
import Image from "next/image";

const UploadedFiles = () => {
  const { removeFile, files } = useMessage();
  console.log("files", files);
  return (
    <>
      {files && files.length > 0 && (
        <div className="relative flex w-full flex-nowrap gap-3 overflow-x-auto overflow-y-visible">
          {files.map(({ preview, name, type, isUploading, id, url }) => (
            <div
              className="relative overflow-visible rounded-lg"
              key={`${name}-${type}-${id}`}
            >
              {type === "image" ? (
                <Image
                  src={preview!}
                  alt="Image"
                  width={60}
                  height={60}
                  className="peer aspect-square min-h-14 min-w-14 rounded-sm object-cover"
                />
              ) : (
                <DocPreview name={name} type={type!} url={url!} />
              )}
              <button
                className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-secondary p-1 opacity-70 transition-opacity hover:opacity-100"
                onClick={() => {
                  removeFile(id);
                }}
              >
                <X className="size-3" />
                <span className="sr-only">Remove attached file</span>
              </button>
              {isUploading && (
                <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-background/50 transition duration-300 ease-in-out">
                  <Spinner className="size-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UploadedFiles;
