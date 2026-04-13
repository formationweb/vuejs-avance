import type { InjectionKey } from "vue";
import type { UsersService } from "./services/users";

export const usersServiceToken: InjectionKey<UsersService> = Symbol('UsersService')