'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productos.init({
    Id: { allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
    NombreProducto: {
      allowNull: false,
      type: DataTypes.STRING
    },
    Existencias: DataTypes.INTEGER,
    Precio: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'productos',
  });
  return productos;
};