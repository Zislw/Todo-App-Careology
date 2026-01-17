export interface User {
    id: number;
    name: string;
    email: string;
}

export interface DatabaseConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    port?: number;
}