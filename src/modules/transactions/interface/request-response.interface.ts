import { ItemRequests } from "@prisma/client";

export interface StockRequestResponse {
    request_id: string,
    status: string,
    description: string,
    records: ItemRequests[]
}