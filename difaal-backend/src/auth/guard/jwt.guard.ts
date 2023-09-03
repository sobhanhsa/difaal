import { AuthGuard } from "@nestjs/passport";

export class CookieJwtGuard extends AuthGuard('cookie-jwt') {
    constructor(){super()}
}