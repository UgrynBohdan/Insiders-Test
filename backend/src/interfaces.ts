import { Request } from "express";
export interface IUser {
    id: number;
    name: string;
    email: string;
    role: 'User' | 'Admin';
}
