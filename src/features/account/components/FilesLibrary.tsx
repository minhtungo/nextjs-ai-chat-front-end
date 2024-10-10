import { DataTable } from "@/components/common/DataTable";
import { columns } from "@/features/account/components/columns";
import { data } from "@/components/files/data";

interface FilesLibraryProps {}

const FilesLibrary = ({}: FilesLibraryProps) => {
  return <DataTable columns={columns} data={data} />;
};

export default FilesLibrary;
