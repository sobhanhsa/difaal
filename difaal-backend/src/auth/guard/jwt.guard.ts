import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard("cookie-jwt") {
    constructor(){super()}
}