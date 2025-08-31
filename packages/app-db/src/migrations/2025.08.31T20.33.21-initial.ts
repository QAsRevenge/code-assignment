/* eslint-disable camelcase */
import type {Migration} from '../migrate-cli';
import {DataTypes} from 'sequelize';

export const up: Migration = async ({context: sequelize}) => {
  const transaction = await sequelize.sequelize.transaction();

  //  ProductType table
  await sequelize.createTable(
    {tableName: 'product_types', schema: 'data'},
    {
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      product_type: {type: DataTypes.STRING, allowNull: false, unique: true},
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {transaction},
  );

  // Product table
  await sequelize.createTable(
    {tableName: 'products', schema: 'data'},
    {
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      name: {type: DataTypes.STRING},
      product_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {tableName: 'product_types', schema: 'data'},
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {transaction},
  );

  // Colour table
  await sequelize.createTable(
    {tableName: 'colours', schema: 'data'},
    {
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      name: {type: DataTypes.STRING, allowNull: false, unique: true},
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      transaction,
    },
  );

  // ProductColour join table
  await sequelize.createTable(
    {tableName: 'product_colours', schema: 'data'},
    {
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {tableName: 'products', schema: 'data'},
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      colour_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {tableName: 'colours', schema: 'data'},
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {transaction},
  );

  await transaction.commit();
};

export const down: Migration = async ({context: sequelize}) => {
  const transaction = await sequelize.sequelize.transaction();

  await sequelize.dropTable(
    {tableName: 'product_colours', schema: 'data'},
    {transaction},
  );
  await sequelize.dropTable(
    {tableName: 'colours', schema: 'data'},
    {transaction},
  );
  await sequelize.dropTable(
    {tableName: 'products', schema: 'data'},
    {transaction},
  );
  await sequelize.dropTable(
    {tableName: 'product_types', schema: 'data'},
    {transaction},
  );

  await transaction.commit();
};
