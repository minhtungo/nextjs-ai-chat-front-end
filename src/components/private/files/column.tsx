"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  name: string;
  type: string;
  size: number;
  date: string;
};

export const columns: ColumnDef<Payment>[] = [
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
