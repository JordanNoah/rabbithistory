import { HeadersDto } from "./headers.dto";

export class PropertiesDto {
    private constructor(
        public contentType: string,
        public contentEncoding: string | undefined,
        public headers: HeadersDto | undefined,
        public deliveryMode: number | undefined,
        public priority: number | undefined,
        public correlationId: number | undefined,
        public replyTo: string | undefined,
        public expiration: string | undefined, 
        public messageId: string | undefined,    
        public timestamp: number, 
        public type: string,
        public userId: string | undefined,     
        public appId: string,
        public clusterId: string | undefined
    ){}
}