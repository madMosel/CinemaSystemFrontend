import { Observable } from "rxjs";

export interface Login {
    username: string,
    type: UserType,
    token: string
}

export enum UserType {
    ADMIN = "ADMIN",
    USER = "USER"
}
