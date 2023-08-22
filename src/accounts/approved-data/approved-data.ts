import { Account } from "../models/accounts.model";

export class ApprovedData {

  id: number;
  name: string;
  surname: string;
  age: number;

  constructor(account: Account) {
    this.id = account.id;
    this.name = account.name;
    this.surname = account.surname;
    this.age = account.age;
  }

}