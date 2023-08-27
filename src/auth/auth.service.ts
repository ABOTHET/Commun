import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtRefreshTokensService } from "../jwt-refresh-tokens/jwt-refresh-tokens.service";
import { LoginDto } from "./dto/login.dto";
import { AccountsService } from "../accounts/accounts.service";
import { AccountDoesNotExists } from "../exceptions/account-does-not-exists";
import * as bcrypt from "bcrypt";
import { IncorrectPassword } from "../exceptions/incorrect-password";

@Injectable()
export class AuthService {
  constructor(private tokensService: JwtRefreshTokensService, private accountsService: AccountsService) {}

  async login(loginDto: LoginDto) {
    const account = await this.accountsService.findAccountByEmail(loginDto.email);
    if (!account) {
      throw new AccountDoesNotExists();
    }
    const isValid = await bcrypt.compare(loginDto.password, account.password);
    if (!isValid) {
      throw new IncorrectPassword();
    }
    const tokens = await this.tokensService.generateTokens(account);
    await this.tokensService.saveRefreshToken(account.id, tokens.refresh_token);
    return {
      account: account,
      tokens: tokens
    };
  }

  async logout(account_id: number) {
    await this.tokensService.removeRefreshToken(account_id);
  }

  async refresh(refresh_token: string) {
    const isValid = await this.tokensService.verifyRefreshToken(refresh_token);
    if (!isValid) {
      throw new UnauthorizedException(HttpStatus.BAD_REQUEST, "Unauthorized");
    }
    const account = await this.accountsService.findAccountById(isValid.id);
    const tokens = await this.tokensService.generateTokens(account);
    await this.tokensService.saveRefreshToken(account.id, tokens.refresh_token);
    return tokens;
  }

}
