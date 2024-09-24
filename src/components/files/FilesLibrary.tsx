import { DataTable } from "@/components/common/DataTable";
import { columns } from "@/components/files/columns";
import { data } from "@/components/files/data";
import { FC } from "react";

interface FilesLibraryProps {}

const FilesLibrary: FC<FilesLibraryProps> = () => {
  return <DataTable columns={columns} data={data} />;
};

export default FilesLibrary;
