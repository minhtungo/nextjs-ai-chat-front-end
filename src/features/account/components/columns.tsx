"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type Payment = {
  id: string;
  name: string;
  type: string;
  size: number;
  date: string;
};

export const data = [
  {
    id: "1",
    name: "File 1",
    type: "PDF",
    size: 1024,
    date: "2023-01-01",
  },
  {
    id: "2",
    name: "File 2",
    type: "PDF",
    size: 2048,
    date: "2023-01-02",
  },
  {
    id: "3",
    name: "File 3",
    type: "PDF",
    size: 4096,
    date: "2023-01-03",
  },
];

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
