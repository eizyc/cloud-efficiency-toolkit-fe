import { ProviderList } from "./provider-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator"

import { capitalize } from "@/lib/utils";

type Params = Promise<{
  provider: string;
}>;

export default async function ProviderPageProps({
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { provider } = await params;

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Cloud Providers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                {capitalize(provider)}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>AWS</DropdownMenuItem>
                <DropdownMenuItem>Azure</DropdownMenuItem>
                <DropdownMenuItem>GCP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator orientation="horizontal" className="my-4"/>
      <ProviderList provider={provider} />
    </>
  );
}
