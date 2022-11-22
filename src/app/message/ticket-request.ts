export interface TicketRequest {
    TicketId: number
    Title: string;
    FullDescription: string;
    Organization: string;
    Project: string;
    AppModule: string;
    AppVersion: string;
    PriorityId: number;
    StatusId: number;
    ImageFilePath: string;
    AssignUserId: number;
    CreateUserId: number;
    UpdateUserId: number;
    CreateDate: Date;
    UpdateDate: Date;
}