import { DataTable } from "@/components/private/common/DataTable";
import { columns } from "@/components/private/files/columns";
import { data } from "@/components/private/files/data";
import { FC } from "react";

interface FilesLibraryProps {}

const FilesLibrary: FC<FilesLibraryProps> = () => {
  return <DataTable columns={columns} data={data} />;
};

export default FilesLibrary;
