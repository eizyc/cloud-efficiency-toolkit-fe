"use client";
import { D3Map } from "@/features/data-vis/components/map";
import { useGetInstancesGeo } from "@/features/data-vis/hooks/use-get-instances-geo";
// import { useGetInstancesMem } from "@/features/data-vis/hooks/use-get-instances-mem";
// import { useGetInstancesCPU } from "@/features/data-vis/hooks/use-get-instances-cpu";
import { useClient } from "@/lib/hooks";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
// import { LineChart } from "@/features/data-vis/components/lin-chart";

export const Client = () => {
  const onlyClient = useClient();
  const router = useRouter();
  const { data, isLoading } = useGetInstancesGeo();
//   const { data: memData, isLoading: memLoading } = useGetInstancesMem();
//   const { data: cpuData, isLoading: cpuLoading } = useGetInstancesCPU();

  const onSelect = (d) => {
    const { provider, id } = d;
    router.push(`/instance/${provider}?id=${id}`);
  };

  const loader = (<div className="flex items-center justify-center h-32">
          <Loader className="size-6 text-muted-foreground animate-spin" />
        </div>)

  if (isLoading ) {
    return (
      <div className="space-y-4">
        {loader}
      </div>
    );
  }

  return (
    onlyClient && (
      <div className="flex flex-col w-full h-full">
        <div className="center">
          <D3Map instances={data} onSelect={onSelect} />
        </div>
        {/* <div className="flex-1">
          <div className="h-[25vh]">
            {memLoading ? loader : <LineChart data={memData}/>}
          </div>
          <div className="h-[25vh]">
            {cpuLoading ? loader : <LineChart data={cpuData}/>}
          </div>
        </div> */}
      </div>
    )
  );
};
