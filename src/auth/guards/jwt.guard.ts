import { AuthGuard } from "@nestjs/passport";

export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context) {
        return super.canActivate(context);
    }
}