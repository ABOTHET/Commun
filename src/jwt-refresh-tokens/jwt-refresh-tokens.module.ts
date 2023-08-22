import { Module } from "@nestjs/common";
import { JwtRefreshTokensService } from "./jwt-refresh-tokens.service";
import { JwtRefreshTokensController } from "./jwt-refresh-tokens.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtRefreshToken } from "./models/jwt-refresh-tokens.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [JwtRefreshTokensService],
  controllers: [JwtRefreshTokensController],
  imports: [SequelizeModule.forFeature([JwtRefreshToken]), JwtModule],
  exports: [JwtRefreshTokensService]
})
export class JwtRefreshTokensModule {}
