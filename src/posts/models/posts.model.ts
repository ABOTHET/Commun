import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "../../accounts/models/accounts.model";

@Table({ tableName: "posts", updatedAt: false, createdAt: false, deletedAt: false })
export class Post extends Model<InferAttributes<Post, {}>, InferCreationAttributes<Post>> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Account)
  @Column({ type: DataType.INTEGER, allowNull: false })
  account_id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;
  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: true })
  photos_id: number[];
  @BelongsTo(() => Account)
  account: Account;
}
