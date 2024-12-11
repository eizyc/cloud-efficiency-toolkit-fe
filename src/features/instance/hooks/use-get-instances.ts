import { Instance } from "@/features/types";
import { useQuery } from "@tanstack/react-query";

export type ResponseType =  Array<Instance>
export const useGetInstances = (provider?: string) => {
  const query = useQuery<ResponseType ,Error>({
    queryKey: ["instance-list", { provider }],
    queryFn: async () => {
      const params = new URLSearchParams(
        {
          provider:provider??''
        }
      ).toString();

      const response = await fetch(`/api/statistic/list?${params}`)

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await response.json();
      return data.instance_list
    },
  });

  return query;
};
