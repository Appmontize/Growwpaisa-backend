// models/campaignModel.js
module.exports = (sequelize, DataTypes) => {
    const Campaign = sequelize.define('Campaign', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coins: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
      }
    }, {
      timestamps: false, // This ensures `createdAt` and `updatedAt` fields are added
    });
  
    return Campaign;
  };
  