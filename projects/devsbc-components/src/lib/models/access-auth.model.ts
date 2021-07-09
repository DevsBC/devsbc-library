export interface AccessAuthModel {
    sessionName: string;
    multiSession: boolean; // if multiSession -> User saves in sessionStorage else localStorage
}
