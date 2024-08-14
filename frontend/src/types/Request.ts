export interface Request{
    id: number;
    user_email: string;
    request_date: string;
    amount_due?: number;
    status: string;
}