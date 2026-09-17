"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Loading from "../../loading";
import ErrorRoute from "./error";
import NoteDetailsClientPage from "./NoteDetails";
// Припустимо, що компонент Modal імпортується з вашої папки компонентів
import Modal from "@/components/Modal"; 

export default function NoteDetails() {
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

  if (isLoading) return <Loading />;
  if (error) return <ErrorRoute error={error} />;

  return (
    note && (
      <Modal onClose={handleClose}>
        {}
        <div className="flex justify-end p-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors"
            aria-label="Закрити модальне вікно"
          >
            Закрити
          </button>
        </div>
        
        {}
        <NoteDetailsClientPage note={note} />
      </Modal>
    )
  );
}
