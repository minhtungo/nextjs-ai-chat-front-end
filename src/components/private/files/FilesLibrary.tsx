import { columns } from "@/components/private/files/columns";
import { data } from "@/components/private/files/data";
import { DataTable } from "@/components/private/files/DataTable";
import { FC } from "react";

interface FilesLibraryProps {}

const FilesLibrary: FC<FilesLibraryProps> = () => {
  return <DataTable columns={columns} data={data} />;
};

export default FilesLibrary;
