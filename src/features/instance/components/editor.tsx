import { Button } from "@/components/ui/button";
import { Loader, X } from "lucide-react";
import ReactJson from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { useGetInstance } from "@/features/instance/hooks/use-get-instance";
import { usePanel } from "@/features/instance/store/use-panel";

interface EditorProps {
    id: string
    provider: string
}

export const Editor = (
    {
        id,
        provider
    }: EditorProps
) => {
  const {data:json, isLoading} = useGetInstance(provider, id);
  const { onClose } = usePanel();

  const Loading = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center h-32">
          <Loader className="size-6 text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col ">
      <Button size="icon" onClick={()=>onClose()}>
        <X />
      </Button>
      {
        isLoading?Loading():
        <div className="w-full flex-1 overflow-scroll">
          <ReactJson src={json} />
        </div>
      }
    </div>
  );
};
