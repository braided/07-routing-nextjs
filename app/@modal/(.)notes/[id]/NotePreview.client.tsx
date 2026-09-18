"use client";

import Loading from "@/app/loading";
import ErrorRoute from "@/app/notes/error";
import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/components/NoteDetailsClient/NoteDetailsClient";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorRoute error={error} />;
  }

  if (!note) {
    return null;
  }

  return (
    <Modal onClose={handleClose}>
      <button
        type="button"
        onClick={handleClose}
        aria-label="Закрити модальне вікно"
      >
        Закрити
      </button>

      <NoteDetailsClient note={note} />
    </Modal>
  );
}