import { Instance } from "@/features/types";
import { useQuery } from "@tanstack/react-query";

const getInfo = (id: string,provider: string): Promise<unknown> => {
  return fetch(`/api/statistic/memory?id=${id}&provider=${provider}`).then(res=>res.json())
}

export type ResponseType =  Array<Instance>
export const useGetInstancesMem = () => {
  const query = useQuery<ResponseType ,Error>({
    queryKey: ["instance-list", "mem"],
    queryFn: async () => {

      const response = await fetch(`/api/statistic/list`)

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await response.json();

      const infos = data.instance_list.map((item: Instance) => ({id: item.id, provider: item.provider}))

      const data_list = await Promise.all(infos.map(({id, provider}: {id: string, provider: string})=> getInfo(id, provider)))

      const result = data.instance_list.map((item: Instance)=>({
        ...item,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        list: data_list.find((ele: any)=>ele.id===item.id)?.memory_utilization
      }))

      return result
    },
  });

  return query;
};
