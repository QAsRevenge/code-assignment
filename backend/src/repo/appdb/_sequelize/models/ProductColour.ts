import {Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import {Product} from './Product';
import {Colour} from './Colour';
import {SCHEMA_NAME} from '../constants';

@Table({schema: SCHEMA_NAME.DATA})
class ProductColour extends Model {
  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @ForeignKey(() => Colour)
  @Column
  colourId!: number;
}

export {ProductColour};
