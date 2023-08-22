import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtRefreshToken } from "./models/jwt-refresh-tokens.model";
import { Account } from "../accounts/models/accounts.model";
import { JwtService } from "@nestjs/jwt";
import { Payload } from "./payload/payload";
import { env } from "process";
import { CreateRefreshTokenDto } from "./dto/create-refresh-token.dto";

@Injectable()
export class JwtRefreshTokensService {

  constructor(@InjectModel(JwtRefreshToken) private tokensRepository: typeof JwtRefreshToken, private jwtService: JwtService) {}

  async generateTokens(account: Account) {
    const payload = { ...new Payload(account) };
    const tokens = {
      access_token: await this.jwtService.signAsync(payload, {
        secret: env["PRIVATE_KEY"],
        expiresIn: env["EXPIRESIN_ACCESS"]
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: env["PRIVATE_KEY_REFR"],
        expiresIn: env["EXPIRESIN_REFRESH"]
      })
    };
    return tokens;
  }

  async saveRefreshToken(account_id: number, refresh_token: string) {
    const tokenFromDB = await this.tokensRepository.findOne({ where: { account_id: account_id } });
    if (!tokenFromDB) {
      const dto = { ...new CreateRefreshTokenDto(account_id, refresh_token) };
      await this.tokensRepository.create(dto);
      return;
    }
    tokenFromDB.refresh_token = refresh_token;
    await tokenFromDB.save();
  }

  async removeRefreshToken(account_id: number) {
    await this.tokensRepository.destroy({ where: { account_id: account_id } });
  }

  async verifyAccessToken(access_token: string) {
    try {
      const data: Payload = await this.jwtService.verifyAsync(access_token, { secret: env["PRIVATE_KEY"] });
      return data;
    } catch (e) {
      return null;
    }
  }

  async verifyRefreshToken(refresh_token: string) {
    try {
      const data: Payload = await this.jwtService.verifyAsync(refresh_token, { secret: env["PRIVATE_KEY_REFR"] });
      return data;
    } catch (e) {
      return null;
    }
  }

}
