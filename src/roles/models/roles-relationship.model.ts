import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "../../accounts/models/accounts.model";
import { Role } from "./roles.model";

@Table({ tableName: "roles_relationship", updatedAt: false, createdAt: false, deletedAt: false })
export class RolesRelationship extends Model<InferAttributes<RolesRelationship, {
  omit: "id"
}>, InferCreationAttributes<RolesRelationship>> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Account)
  @Column({ type: DataType.INTEGER, allowNull: false })
  account_id: string;
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  role_id: string;
}
