export interface Instance {
    disabled?: boolean;
    id: string;
    name: string;
    provider: string;
    platform: string;
    privateIpAddress: string;
    publicIpAddress: string;
    status: string;
    createdAt: string;
    instanceType:string;
    tags: Array<{
        Key: string;
        Value: string;
    }>;
}