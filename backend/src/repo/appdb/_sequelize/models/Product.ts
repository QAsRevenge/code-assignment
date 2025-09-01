import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import {ProductType} from './ProductType';
import {Colour} from './Colour';
import {ProductColour} from './ProductColour';
import {SCHEMA_NAME} from '../constants';

@Table({schema: SCHEMA_NAME.DATA})
class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({type: DataType.STRING, allowNull: false})
  declare name: string;

  @ForeignKey(() => ProductType)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare productTypeId: number;

  @BelongsTo(() => ProductType)
  declare productType: ProductType;

  @BelongsToMany(() => Colour, () => ProductColour)
  declare colours: Colour[];
}

enum PRODUCT_ATTRIBUTES {
  NAME = 'name',
  PRODUCT_TYPE_ID = 'productTypeId',
}

export {Product, PRODUCT_ATTRIBUTES};
