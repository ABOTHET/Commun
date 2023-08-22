import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "../../accounts/models/accounts.model";
import { RolesRelationship } from "./roles-relationship.model";

@Table({ tableName: "roles", updatedAt: false, createdAt: false, deletedAt: false })
export class Role extends Model<InferAttributes<Role, { omit: "id" }>, InferCreationAttributes<Role>> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  role: string;
  @BelongsToMany(() => Account, () => RolesRelationship)
  accounts: Account[];
}
