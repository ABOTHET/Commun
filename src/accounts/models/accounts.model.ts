import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { RolesRelationship } from "../../roles/models/roles-relationship.model";
import { Role } from "../../roles/models/roles.model";
import { JwtRefreshToken } from "../../jwt-refresh-tokens/models/jwt-refresh-tokens.model";
import { Photo } from "../../photos/models/photos.model";
import { Post } from "../../posts/models/posts.model";

@Table({ tableName: "accounts", updatedAt: false, createdAt: true, deletedAt: false })
export class Account extends Model<InferAttributes<Account, {}>, InferCreationAttributes<Account>> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;
  @Column({ type: DataType.SMALLINT, allowNull: false })
  age: number;
  @ForeignKey(() => Photo)
  @Column({ type: DataType.INTEGER, allowNull: true })
  avatar_id: number;
  @BelongsToMany(() => Role, () => RolesRelationship)
  roles: Role[];
  @HasOne(() => JwtRefreshToken)
  refresh_token: JwtRefreshToken;
  @HasMany(() => Photo)
  photos: Photo[];
  @HasMany(() => Post)
  posts: Post[];
  @BelongsTo(() => Photo)
  avatar: number;
}
