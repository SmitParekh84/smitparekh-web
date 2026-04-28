"use client";

import { useState } from "react";
import { Loader2, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypedConfirmModal } from "@/components/admin/TypedConfirmModal";
import { toast } from "@/lib/toast";

export interface TrashRow {
  _id: string;
  title: string;
  imageUrl?: string;
  subtitle?: string;
  deletedAt?: string | null;
}

interface TrashTableProps<T extends TrashRow> {
  data: T[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRefetch: () => void;
  onRestore: (id: string) => Promise<unknown>;
  onPermanentDelete: (id: string) => Promise<unknown>;
  /** Singular noun, e.g. "project", "blog". */
  noun: string;
}

export function TrashTable<T extends TrashRow>({
  data,
  isLoading,
  isError,
  onRefetch,
  onRestore,
  onPermanentDelete,
  noun,
}: TrashTableProps<T>) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmRow, setConfirmRow] = useState<T | null>(null);

  async function handleRestore(id: string) {
    setBusyId(id + ":restore");
    try {
      await onRestore(id);
      toast.success(`${capitalize(noun)} restored`);
    } catch {
      toast.error("Restore failed", `Could not restore the ${noun}.`);
    } finally {
      setBusyId(null);
    }
  }

  async function handlePermanentDelete(id: string) {
    setBusyId(id + ":delete");
    try {
      await onPermanentDelete(id);
      toast.success(`${capitalize(noun)} permanently deleted`);
      setConfirmRow(null);
    } catch {
      toast.error(
        "Delete failed",
        `Could not permanently delete the ${noun}.`,
      );
    } finally {
      setBusyId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-6 py-12 text-center">
        <p className="mb-3 text-sm text-muted-foreground">
          Could not load trash.
        </p>
        <Button variant="outline" size="sm" onClick={onRefetch}>
          Retry
        </Button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Trash is empty.
      </p>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Deleted</TableHead>
            <TableHead className="w-[1%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {row.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={row.imageUrl}
                      alt=""
                      className="h-9 w-9 shrink-0 rounded-lg border border-border object-cover opacity-60"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-medium">{row.title}</p>
                    {row.subtitle && (
                      <p className="line-clamp-1 max-w-[260px] text-xs text-muted-foreground">
                        {row.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                {row.deletedAt
                  ? new Date(row.deletedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "-"}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-xs"
                    disabled={busyId === row._id + ":restore"}
                    onClick={() => handleRestore(row._id)}
                  >
                    {busyId === row._id + ":restore" ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <RotateCcw className="h-3 w-3" />
                    )}
                    Restore
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setConfirmRow(row)}
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {confirmRow && (
        <TypedConfirmModal
          title={`Permanently delete ${noun}?`}
          description={
            <>
              This will permanently remove{" "}
              <span className="font-medium text-foreground">
                {confirmRow.title}
              </span>
              . This action cannot be undone.
            </>
          }
          confirmText={confirmRow.title}
          confirmLabel="Delete permanently"
          isPending={busyId === confirmRow._id + ":delete"}
          onConfirm={() => handlePermanentDelete(confirmRow._id)}
          onCancel={() => setConfirmRow(null)}
        />
      )}
    </>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
