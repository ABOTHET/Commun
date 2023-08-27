import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "../../accounts/models/accounts.model";

@Table({ tableName: "photos", updatedAt: false, createdAt: false, deletedAt: false })
export class Photo extends Model<InferAttributes<Photo, {}>, InferCreationAttributes<Photo>> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Account)
  @Column({ type: DataType.INTEGER, allowNull: false })
  account_id: number;
  @Column({ type: DataType.TEXT, allowNull: false })
  path: string;
  @BelongsTo(() => Account)
  account: Account;
  @HasOne(() => Account)
  accountAvatar: Account;
}
