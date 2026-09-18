"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import Loading from "../../loading";
import ErrorRoute from "./error";
import NoteDetails from "./NoteDetails";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorRoute error={error} />;
  }

  if (!note) {
    return null;
  }

  return <NoteDetails note={note} />;
}