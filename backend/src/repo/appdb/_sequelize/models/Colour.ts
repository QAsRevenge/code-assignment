import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import {Product} from './Product';
import {ProductColour} from './ProductColour';
import {SCHEMA_NAME} from '../constants';

@Table({schema: SCHEMA_NAME.DATA})
class Colour extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({type: DataType.STRING, allowNull: false, unique: true})
  declare name: string;

  @BelongsToMany(() => Product, () => ProductColour)
  declare products: Product[];
}

export {Colour};
