import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtRefreshTokensModule } from "../jwt-refresh-tokens/jwt-refresh-tokens.module";
import { AccountsModule } from "../accounts/accounts.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [JwtRefreshTokensModule, AccountsModule]
})
export class AuthModule {}
