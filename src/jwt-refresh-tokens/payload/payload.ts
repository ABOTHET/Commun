import { Role } from "../../roles/models/roles.model";
import { Account } from "../../accounts/models/accounts.model";

export class Payload {
  id: number;
  email: string;
  roles: { id: number, role: string }[] = [];

  constructor(account: Account) {
    this.id = account.id;
    this.email = account.email;
    account.roles.forEach((element) => {
      const { id, role }: Role = element;
      this.roles.push({ id: id, role: role });
    });
  }
}