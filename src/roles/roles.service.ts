import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./models/roles.model";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RoleExists } from "../exceptions/role-exists";
import { AssignRoleDto } from "./dto/assign-role.dto";
import { RoleDoesNotExists } from "../exceptions/role-does-not-exists";
import { AccountsService } from "../accounts/accounts.service";
import { AccountDoesNotExists } from "../exceptions/account-does-not-exists";

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleRepository: typeof Role, @Inject(forwardRef(() => AccountsService)) private accountsService: AccountsService) {
    (async () => {
      const defaultRole = await this.roleRepository.findOne({ where: { role: "user" } });
      if (!defaultRole) {
        const role: CreateRoleDto = { role: "user" };
        await this.roleRepository.create(role).then();
      }
    })();
  }

  async findRole(role: string) {
    const roleFromDB = await this.roleRepository.findOne({ where: { role: role } });
    return roleFromDB;
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const roleFromDB = await this.roleRepository.findOne({ where: { role: createRoleDto.role } });
    if (!roleFromDB) {
      await this.roleRepository.create(createRoleDto);
      return;
    }
    throw new RoleExists();
  }

  async assignRole(assignRoleDto: AssignRoleDto) {
    const roleFromDB = await this.findRole(assignRoleDto.role);
    if (!roleFromDB) {
      throw new RoleDoesNotExists();
    }
    const account = await this.accountsService.findAccountByEmail(assignRoleDto.email);
    if (!account) {
      throw new AccountDoesNotExists();
    }
    await account.$set("roles", roleFromDB.id);
  }

}
