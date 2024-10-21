export type User = {
    username: string;
    email: string;
    verified: boolean;
    avatar?: string;
    plan: 'free' | 'premium' | 'enterprise';
};
