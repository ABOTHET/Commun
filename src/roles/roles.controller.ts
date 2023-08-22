import { Body, Controller, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Roles } from "../decorators/roles/roles.decorator";
import { AssignRoleDto } from "./dto/assign-role.dto";

@Controller("roles")
export class RolesController {

  constructor(private rolesService: RolesService) {}

  @Post()
  @Roles("admin")
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.rolesService.createRole(createRoleDto);
    return role;
  }

  @Post("assign")
  @Roles("admin")
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    await this.rolesService.assignRole(assignRoleDto);
  }

}
