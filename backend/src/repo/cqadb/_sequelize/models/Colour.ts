import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import {Product} from './Product';
import {ProductColour} from './ProductColour';
import {SCHEMA_NAME} from '../constants';

@Table({schema: SCHEMA_NAME.DATA})
class Colour extends Model {
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  declare name: string;

  @BelongsToMany(() => Product, () => ProductColour)
  declare products: Product[];
}

export {Colour};
