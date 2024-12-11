import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Instance } from "@/features/types";
import {
  generateRandomPrivateIP,
  generateRandomPublicIP,
  ramdomString,
  randomOneOf,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { CopyTool } from "@/components/copy-tool";
import { usePanel } from "@/features/instance/store/use-panel";

const mockData: Array<Instance> = new Array(16).fill({}).map(() => ({
  disabled:true,
  id: ramdomString(),
  name: `MOCK-${ramdomString()}`,
  privateIpAddress: generateRandomPrivateIP(),
  publicIpAddress: generateRandomPublicIP(),
  platform: randomOneOf(["windows", "linux", "mac"]),
  status: randomOneOf(["running", "stopped", "pending"]),
  createdAt: new Date().toISOString(),
  provider: "-",
  instanceType: ramdomString(),
  tags: [
    {
      Key: "ENV",
      Value: randomOneOf(["DEV", "TEST", "PROD"]),
    },
  ],
}));

interface InstanceTableProps {
  data?: Array<Instance&{
    disabled?:boolean
  }>;
}

export const InstanceTable = ({ data }: InstanceTableProps) => {
  const { onSelect } = usePanel();
  const list = useMemo(() => {
    if (!data) {
      return mockData;
    }
    const new_list = [...data, ...mockData];

    return new_list;
  }, [data]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Private IP</TableHead>
          <TableHead>Public IP</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead>InstanceType</TableHead>
          <TableHead className="text-right">Tags</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list?.map((items: Instance) => (
          <TableRow key={items.id} onClick={() => (!items?.disabled) && onSelect(items.id)}>
            <TableCell className="font-medium]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-ellipsis line-clamp-3 break-all overflow-hidden">
                      {items.id}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[20vw] break-all">
                    {items.id}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className="font-medium">{items.name}</TableCell>
            <TableCell className="font-medium">{items.provider}</TableCell>
            <TableCell>
              <CopyTool text={items.privateIpAddress}>
                {items.privateIpAddress}
              </CopyTool>
            </TableCell>
            <TableCell>
              <CopyTool text={items.publicIpAddress}>
                {items.publicIpAddress}
              </CopyTool>
            </TableCell>
            <TableCell>{items.status}</TableCell>
            <TableCell>{items.platform}</TableCell>
            <TableCell>{items.instanceType}</TableCell>
            <TableCell className="text-right">
              {items.tags.map((tag) => {
                return (
                  <Badge key={tag.Key} className="text-right">
                    {tag.Key}: {tag.Value}
                  </Badge>
                );
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10}>Total: {list?.length}</TableCell>
          {/* <TableCell className="text-right">$2,500.00</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
};
