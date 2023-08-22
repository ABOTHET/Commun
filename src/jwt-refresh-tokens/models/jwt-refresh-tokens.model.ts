import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "../../accounts/models/accounts.model";

@Table({ tableName: "jwt_refresh_tokens", updatedAt: false, createdAt: false, deletedAt: false })
export class JwtRefreshToken extends Model<InferAttributes<JwtRefreshToken, {
  omit: "id"
}>, InferCreationAttributes<JwtRefreshToken>> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Account)
  @Column({ type: DataType.INTEGER, allowNull: false })
  account_id: number;
  @Column({ type: DataType.TEXT, allowNull: false })
  refresh_token: string;
  @BelongsTo(() => Account)
  account: Account;
}
