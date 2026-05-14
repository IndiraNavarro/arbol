import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Leaf } from "./Leaf";

export interface TreeI {
  id?: number;
  species: string;
  estimated_age: number;
  height: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Tree extends Model {
  public id!: number;
  public species!: string;
  public estimated_age!: number;
  public height!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Tree.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Species cannot be empty",
        },
        len: {
          args: [2, 100],
          msg: "Species must be between 2 and 100 characters",
        },
      },
    },
    estimated_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Estimated age must be an integer",
        },
        min: {
          args: [0],
          msg: "Estimated age must be greater than or equal to 0",
        },
      },
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: "Height must be a valid number",
        },
        min: {
          args: [0],
          msg: "Height must be greater than or equal to 0",
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ACTIVE",
      validate: {
        isIn: {
          args: [["ACTIVE", "INACTIVE"]],
          msg: "Status must be ACTIVE or INACTIVE",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Tree",
    tableName: "trees",
    timestamps: false,
  }
);

Tree.hasMany(Leaf, {
  foreignKey: "tree_id",
  sourceKey: "id",
});

Leaf.belongsTo(Tree, {
  foreignKey: "tree_id",
  targetKey: "id",
});