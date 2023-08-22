import { forwardRef, Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Account } from "./models/accounts.model";
import { RolesModule } from "../roles/roles.module";
import { JwtRefreshTokensModule } from "../jwt-refresh-tokens/jwt-refresh-tokens.module";

@Module({
  providers: [AccountsService],
  controllers: [AccountsController],
  imports: [SequelizeModule.forFeature([Account]), forwardRef(() => RolesModule), JwtRefreshTokensModule],
  exports: [AccountsService]
})
export class AccountsModule {}
