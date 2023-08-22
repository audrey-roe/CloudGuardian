import { UserController } from "./controller/user.controller"

export const Routes = [
    {
        method: "post",
        route: "/api/users",
        middleware: [],
        controller: UserController,
        action: "create"
    }, {
        method: "post",
        route: "/api/login",
        middleware: [],
        controller: UserController,
        action: "login"
    },
]