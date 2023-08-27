import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtRefreshTokensService } from "../../jwt-refresh-tokens/jwt-refresh-tokens.service";
import { Request } from "express";
import { Payload } from "../../jwt-refresh-tokens/payload/payload";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private tokensService: JwtRefreshTokensService, private reflector: Reflector) {}

  async canActivate(
    context: ExecutionContext
  ) {
    const isPublic: boolean = this.reflector.get<boolean>("public", context.getHandler());
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED,"Вы не авторизованы");
    }
    const isValid: Payload = await this.tokensService.verifyAccessToken(token);
    if (!isValid) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, "Вы не авторизованы");
    }
    req.payloadAccount = isValid;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

}
