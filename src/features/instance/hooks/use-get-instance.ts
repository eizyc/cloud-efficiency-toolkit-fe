import { useQuery } from "@tanstack/react-query";

export type ResponseType =  Array<JSON>
export const useGetInstance = (provider?: string, id?: string) => {
  const query = useQuery({
    enabled: provider && id ? true : false,
    queryKey: ["instance", { provider },  { id }],
    queryFn: async () => {
      if (!id) throw new Error("Failed to fetch project");
      const params = new URLSearchParams(
        {
          id:id??'',
          provider:provider??''
        }
      ).toString();
      const response = await fetch(`/api/statistic/instance?${params}`)

      console.log(response)

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await response.json();
      return data;
    },
  });

  return query;
};
