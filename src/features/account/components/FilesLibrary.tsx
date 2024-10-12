import { DataTable } from "@/components/common/DataTable";
import { columns, data } from "@/features/account/components/columns";

interface FilesLibraryProps {}

const FilesLibrary = ({}: FilesLibraryProps) => {
  return <DataTable columns={columns} data={data} />;
};

export default FilesLibrary;
