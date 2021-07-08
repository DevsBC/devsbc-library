export interface AccessAuthModel {
    endpoint: string;
    user: any; // Your custom object for User
    sessionName: string;
    multiSession?: boolean; // if multiSession -> User saves in sessionStorage *default localStorage
}
