import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Payload } from "../../jwt-refresh-tokens/payload/payload";
import { AccessDenied } from "../../exceptions/access-denied";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic: boolean = this.reflector.get<boolean>("public", context.getHandler());
    if (isPublic) {
      return true;
    }
    const roles: string[] = this.reflector.getAllAndOverride("roles", [context.getHandler(), context.getClass()]);
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const payload: Payload = req.payloadAccount;
    const allowed = payload.roles.some(role => roles.includes(role.role));
    if (!allowed) {
      throw new AccessDenied();
    }
    return true;
  }
}
