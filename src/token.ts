import type { InjectionKey } from "vue";
import type { UsersService } from "./services/users";
import type { AuthService } from "./services/auth";

export const usersServiceToken: InjectionKey<UsersService> = Symbol('UsersService')
export const authToken: InjectionKey<AuthService> = Symbol('AuthService')