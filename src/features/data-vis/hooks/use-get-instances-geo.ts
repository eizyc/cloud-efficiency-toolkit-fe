import { Instance } from "@/features/types";
import { useQuery } from "@tanstack/react-query";

const getGeo = (ip: string): Promise<unknown> => {
  return fetch(`/api/common/ip?ip=${ip}`).then(res=>res.json())
}

export type ResponseType =  Array<Instance>
export const useGetInstancesGeo = () => {
  const query = useQuery<ResponseType ,Error>({
    queryKey: ["instance-list"],
    queryFn: async () => {

      const response = await fetch(`/api/statistic/list`)

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await response.json();

      const ips = data.instance_list.map((item: Instance) => item.publicIpAddress)


      const geo = await Promise.all(ips.map((ip: string)=> getGeo(ip)))
      console.log(geo)

      const result = data.instance_list.map((item: Instance)=>({
        ...item,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geo: geo.find((geoItem: any)=>geoItem.geo.ip===item.publicIpAddress)?.geo
      }))

      console.log(result)

      return result
    },
  });

  return query;
};
