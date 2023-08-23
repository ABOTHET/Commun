import { Body, Controller, Get, Param, Patch, Post, Res } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { ApprovedData } from "./approved-data/approved-data";
import { ChangeDataDto } from "./dto/change-data.dto";
import { Response } from "express";
import { Public } from "../decorators/public/public.decorator";
import { ApiBody } from "@nestjs/swagger";
import { Account } from "./models/accounts.model";

@Controller("accounts")
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post()
  @Public()
  async createAccount(@Body() createUserDto: CreateAccountDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.accountsService.createAccount(createUserDto);
    const approvedData = new ApprovedData(data.account);
    res.cookie("refresh_token", data.tokens.refresh_token, { maxAge: 60 * 24 * 60 * 60, httpOnly: true });
    return {
      ...approvedData,
      access_token: data.tokens.access_token
    };
  }

  @Get("/:id")
  async findAccountById(@Param("id") id: number) {
    const account = await this.accountsService.findAccountById(id);
    const data = new ApprovedData(account);
    return data;
  }

  @Patch()
  async changeDataById(@Body() changeDataDto: ChangeDataDto) {

  }

}
