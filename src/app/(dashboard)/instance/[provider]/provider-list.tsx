"use client";
import { InstanceTable } from "@/features/instance/components/table";
import { useGetInstances } from "@/features/instance/hooks/use-get-instances";
import { Loader } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { usePanel } from "@/features/instance/store/use-panel";
import { Editor } from "@/features/instance/components/editor";

export const ProviderList = ({ provider }: { provider: string }) => {
  const { data, isLoading } = useGetInstances(provider);
  const { instanceId } = usePanel();

  const showPanel = !!instanceId;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center h-32">
          <Loader className="size-6 text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  return (
      <ResizablePanelGroup
        direction="horizontal"
        autoSaveId="ca-workspace-layout"
      >
        <ResizablePanel defaultSize={100} minSize={50}>
          <InstanceTable data={data} />
        </ResizablePanel>
        {showPanel && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={20} defaultSize={29} className="overflow-scroll">
              <Editor key={instanceId} id={instanceId} provider={provider} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
  );
};
