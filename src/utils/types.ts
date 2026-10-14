export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export type Role = 'respo' | 'agent';
