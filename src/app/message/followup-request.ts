export interface FollowupRequest {
    FollowupId: number,
    TicketId: number
    Title: string;
    FullDescription: string;
    PriorityId: number;
    StatusId: number;
    AssignUserId: number;
    CreateUserId: number;
    UpdateUserId: number;
    CreateDate: Date;
    UpdateDate: Date;
}