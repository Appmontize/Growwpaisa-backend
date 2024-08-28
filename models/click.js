// models/click.js
module.exports = (sequelize, DataTypes) => {
  const Click = sequelize.define('Click', {
    click_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'campaigns', // This is the table name
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
  });

  Click.associate = (models) => {
    Click.belongsTo(models.Campaign, {
      foreignKey: 'campaign_id',
      onDelete: 'CASCADE',
    });
  };

  return Click;
};
