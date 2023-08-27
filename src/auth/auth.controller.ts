import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ApprovedData } from "../accounts/approved-data/approved-data";
import { Request, Response } from "express";
import { JwtRefreshTokensService } from "../jwt-refresh-tokens/jwt-refresh-tokens.service";
import { Payload } from "../jwt-refresh-tokens/payload/payload";
import { Public } from "../decorators/public/public.decorator";

@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService, private tokensService: JwtRefreshTokensService) {}

  @Post("login")
  @Public()
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(loginDto);
    const approvedData = new ApprovedData(data.account);
    res.cookie("refresh_token", data.tokens.refresh_token, { maxAge: 60 * 24 * 60 * 60, httpOnly: true });
    return {
      ...approvedData,
      access_token: data.tokens.access_token
    };
  }

  @Post("logout")
  @Public()
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const payload: Payload = await this.tokensService.verifyRefreshToken(req.cookies["refresh_token"]);
    if (!payload) {
      return;
    }
    await this.authService.logout(payload.id);
    res.clearCookie("refresh_token", { httpOnly: true  });
  }

  @Post("refresh")
  @Public()
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.refresh(req.cookies["refresh_token"]);
    res.cookie("refresh_token", tokens.refresh_token, { maxAge: 60 * 24 * 60 * 60, httpOnly: true });
    return {
      access_token: tokens.access_token
    }
  }

}
