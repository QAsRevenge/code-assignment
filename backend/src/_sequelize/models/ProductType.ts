import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import {SCHEMA_NAME} from '../constants';

@Table({schema: SCHEMA_NAME.DATA})
class ProductType extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @NotEmpty
  @Column({type: DataType.STRING, unique: true})
  declare productType: string;
}

export {ProductType};
