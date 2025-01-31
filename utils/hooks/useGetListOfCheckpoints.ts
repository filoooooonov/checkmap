import { getCheckpoints } from "@/actions/getCheckpoints";
import { useQuery } from "@tanstack/react-query";

export const useGetListOfCheckpoints = (eventId: string) => {
  return useQuery({
    queryKey: ["get-list-of-checkpoints", eventId],
    queryFn: () => getCheckpoints(eventId),
  });
};