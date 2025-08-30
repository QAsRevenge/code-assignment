import {Column, DataType, Model, NotEmpty, Table} from 'sequelize-typescript';
import {SCHEMA_NAME} from '../constants';

@Table({schema: SCHEMA_NAME.DATA})
class ProductType extends Model {
  @NotEmpty
  @Column({type: DataType.STRING, unique: true})
  declare productType: string;
}

export {ProductType};
