import mapCategory from "@/lib/utils";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface FilterProps {
  params: Promise<{ slug: string[] }>;
}
export default async function Filter({ params }: FilterProps) {
  const { slug } = await params;
  const category = slug[0];
  const param = mapCategory(category);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", param],
    queryFn: () => fetchNotes({ tag: param }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={param} />
    </HydrationBoundary>
  );
}
