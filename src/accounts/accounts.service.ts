import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Account } from "./models/accounts.model";
import { CreateAccountDto } from "./dto/create-account.dto";
import { AccountBusy } from "../exceptions/account-busy";
import * as bcrypt from "bcrypt";
import { RolesService } from "../roles/roles.service";
import { Role } from "../roles/models/roles.model";
import { JwtRefreshTokensService } from "../jwt-refresh-tokens/jwt-refresh-tokens.service";

@Injectable()
export class AccountsService {

  constructor(@InjectModel(Account) private accountRepository: typeof Account,
    private rolesService: RolesService, private tokensService: JwtRefreshTokensService) {}

  async createAccount(createUserDto: CreateAccountDto) {
    const accountFromDB: Account = await this.accountRepository.findOne({ where: { email: createUserDto.email } });
    if (accountFromDB) {
      throw new AccountBusy();
    }
    const hash = await bcrypt.hash(createUserDto.password, 3);
    const account: Account = await this.accountRepository.create({
      ...createUserDto,
      password: hash
    }, { include: { all: true } });
    const roleFromDB: Role = await this.rolesService.findRole("user");
    if (roleFromDB) {
      await account.$set("roles", roleFromDB.id);
    }
    account.roles = [roleFromDB];
    const tokens = await this.tokensService.generateTokens(account);
    await this.tokensService.saveRefreshToken(account.id, tokens.refresh_token);
    return {
      account: account,
      tokens: tokens
    };
  }

  async findAccountById(id: number) {
    const accountFromDB = await this.accountRepository.findByPk(id, { include: { all: true } });
    return accountFromDB;
  }

  async findAccountByEmail(email: string) {
    const accountFromDB = await this.accountRepository.findOne({ where: { email: email }, include: { all: true } });
    return accountFromDB;
  }

}
