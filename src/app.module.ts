import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountsModule } from "./accounts/accounts.module";
import { env } from "process";
import { RolesModule } from "./roles/roles.module";
import { Account } from "./accounts/models/accounts.model";
import { Role } from "./roles/models/roles.model";
import { RolesRelationship } from "./roles/models/roles-relationship.model";
import { JwtRefreshTokensModule } from "./jwt-refresh-tokens/jwt-refresh-tokens.module";
import { JwtRefreshToken } from "./jwt-refresh-tokens/models/jwt-refresh-tokens.model";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth/auth.guard";
import { RolesGuard } from "./guards/roles/roles.guard";
import { PhotosModule } from "./photos/photos.module";
import { Photo } from "./photos/models/photos.model";
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/models/posts.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: env["POSTGRES_HOST"],
      port: Number(env["POSTGRES_PORT"]),
      username: env["POSTGRES_USER"],
      password: env["POSTGRES_PASSWORD"],
      database: env["POSTGRES_DB"],
      models: [Account, Role, RolesRelationship, JwtRefreshToken, Photo, Post],
      autoLoadModels: true,
      synchronize: true
    }),
    AccountsModule,
    RolesModule,
    JwtRefreshTokensModule,
    AuthModule,
    PhotosModule,
    PostsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
