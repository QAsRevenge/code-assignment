import {
  Table,
  Column,
  Model,
  ForeignKey,
  AutoIncrement,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import {Product} from './Product';
import {Colour} from './Colour';
import {SCHEMA_NAME} from '../constants';

@Table({schema: SCHEMA_NAME.DATA})
class ProductColour extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @ForeignKey(() => Colour)
  @Column
  colourId!: number;
}

export {ProductColour};
