import { getListOfEvents } from "@/actions/getListOfEvents";
import { useQuery } from "@tanstack/react-query";

export const useGetListOfEvents = (userId: string) => {
  return useQuery({
    queryKey: ["get-list-of-events", userId],
    queryFn: () => getListOfEvents(userId),
  });
};
