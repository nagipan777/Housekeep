export interface User{
    id: string;
    email: string;
}
export interface Payments{
    id: string;
    user_id: string;
    earning: string;
    time: string;
    cash: number;
    item: string;
}
export interface Total{
    total: number;
}
