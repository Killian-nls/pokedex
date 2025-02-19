export interface User {
    id: string;
    email: string;
    password: string;
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}