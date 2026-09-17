"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Loading from "../../loading";
import ErrorRoute from "./error";
import NoteDetailsClientPage from "./NoteDetails";

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

  // Обробник закриття модального вікна (повернення на попередню сторінку)
  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorRoute error={error} />;

  return (
    note && (
      /* Бекдроп (затемнення фону) модального вікна */
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={handleClose} // Закриття при кліку на фон
      >
        /* Контейнер модального вікна */
        <div 
          className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl dark:bg-gray-900"
          onClick={(e) => e.stopPropagation()} // Запобігаємо закриттю при кліку всередині вікна
        >
          {/* Видима кнопка закриття для користувача */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Закрити модальне вікно"
            >
              Закрити
            </button>
          </div>
          
          {/* Контент самої нотатки */}
          <NoteDetailsClientPage note={note} />
        </div>
      </div>
    )
  );
}
