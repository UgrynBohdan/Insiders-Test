export interface ІUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'User' | 'Admin';
    created_at: Date;
}