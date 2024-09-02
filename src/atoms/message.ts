import { uploadFileAction } from "@/actions/file";
import {
  MAX_UPLOAD_FILE_COUNT,
  MAX_UPLOAD_FILE_SIZE,
  MAX_UPLOAD_FILE_SIZE_IN_MB,
} from "@/app-config";
import { getImageDimensions, nanoid } from "@/lib/utils";
import { NewMessage } from "@/types/chat";
import { FileAtom } from "@/types/file";
import { atom } from "jotai";
import { toast } from "sonner";

const initialMessageState: NewMessage = {
  content: "",
  mathEquation: "",
};

export const messageAtom = atom<NewMessage>(initialMessageState);

export const initialMessageAtom = atom(null, (get, set) => {
  set(messageAtom, initialMessageState);
  set(filesAtom, []);
  set(pendingAtom, false);
});

export const pendingAtom = atom(false);

export const filesAtom = atom<FileAtom[]>([]);

export const filesUploadAtom = atom(null, async (get, set, files: File[]) => {
  if (!files || files.length === 0) {
    return;
  }

  let totalFilesSize = get(filesAtom).reduce(
    (acc, file) => acc + file.size!,
    0,
  );
  let totalFilesCount = get(filesAtom).length;

  const validFiles = [] as FileAtom[];

  for (let file of files) {
    if (
      totalFilesCount + validFiles.length <= MAX_UPLOAD_FILE_COUNT &&
      totalFilesSize <= MAX_UPLOAD_FILE_SIZE
    ) {
      console.log("inside file", file);
      let originalWidth = undefined;
      let originalHeight = undefined;

      if (file.type.startsWith("image")) {
        const { width, height } = await getImageDimensions(file);
        originalWidth = width;
        originalHeight = height;
      }

      validFiles.push({
        id: nanoid(),
        name: file.name,
        type: file.type.startsWith("image")
          ? "image"
          : file.type.includes("pdf")
            ? "pdf"
            : "document",
        preview: file.type.startsWith("image")
          ? URL.createObjectURL(file)
          : undefined,
        size: file.size,
        isUploading: true,
        ...(originalWidth ? { originalWidth } : {}),
        ...(originalHeight ? { originalHeight } : {}),
      });
    } else {
      toast.error(
        `You can only upload ${MAX_UPLOAD_FILE_COUNT} files and ${MAX_UPLOAD_FILE_SIZE_IN_MB}MB of files at a time.`,
      );
      return;
    }
  }

  set(filesAtom, (prev) => [...prev, ...validFiles]);

  await Promise.all(
    files.map(async (file, index) => {
      try {
        set(pendingAtom, true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);

        const [data, error] = await uploadFileAction(formData);

        if (error) {
          throw new Error(error.message);
        }

        const url = data?.img_urls[0].url;
        const thumbnail = data?.thumbnail;

        set(filesAtom, (prev) =>
          prev.map((f) =>
            f.id === validFiles[index].id
              ? { ...f, url, thumbnail, isUploading: false }
              : f,
          ),
        );
      } catch (error) {
        toast.error(`Upload failed for ${file.name}`);
        set(filesAtom, (prev) =>
          prev.filter((f) => f.id !== validFiles[index].id),
        );
      } finally {
        set(pendingAtom, false);
      }
    }),
  );
});

export const fileRemovalAtom = atom(null, async (_, set, fileId?: string) => {
  set(filesAtom, (prev) => prev.filter((f) => f.id !== fileId));
});

export const imagesAtom = atom((get) =>
  get(filesAtom)
    .filter((f) => f.type === "image")
    .map((f) => ({
      url: f.url,
      name: f.name,
      type: f.type,
      preview: f.preview,
      originalWidth: f.originalWidth,
      originalHeight: f.originalHeight,
      size: f.size,
    })),
);

export const docsAtom = atom((get) =>
  get(filesAtom)
    .filter((f) => f.type !== "image")
    .map((f) => ({
      url: f.url,
      name: f.name,
      type: f.type,
    })),
);

export const isWithinTokenLimitAtom = atom<number | false>(1);
