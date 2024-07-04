"use client";
import { deleteCat } from "@/actions/cat";
import { TrashIcon } from "@heroicons/react/24/outline";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteCatButton({ catId }: { catId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const deleteCatMutation = useMutation({
    mutationFn: async () => {
      return await deleteCat(catId);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      router.refresh();
    },
  });

  return (
    <>
      <IconButton
        type="button"
        onClick={() => setIsModalOpen(!isModalOpen)}
        sx={{
          position: "absolute",
        }}
        className="text-white rounded p-2 absolute top-6 right-2 border-2"
      >
        <TrashIcon className="h-6 w-6" />
      </IconButton>
      <Dialog
        fullScreen
        open={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
        <DialogTitle>Delete Cat?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is probably{" "}
            <span className="text-white">irreversible </span>but your cat will
            be unharmed.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            onClick={() => setIsModalOpen(!isModalOpen)}
            variant="contained"
          >
            Cancel
          </Button>
          <LoadingButton
            loading={deleteCatMutation.isPending}
            variant="outlined"
            onClick={() => deleteCatMutation.mutate()}
            color="error"
            size="small"
          >
            Delete Cat
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
