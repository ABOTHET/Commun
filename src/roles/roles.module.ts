import { forwardRef, Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./models/roles.model";
import { AccountsModule } from "../accounts/accounts.module";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role]), forwardRef(() => AccountsModule)],
  exports: [RolesService]
})
export class RolesModule {}
