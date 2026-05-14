import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface LeafI {
  id?: number;
  color_state: string;
  length: number;
  tree_id: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Leaf extends Model {
  public id!: number;
  public color_state!: string;
  public length!: number;
  public tree_id!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Leaf.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    color_state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Color state cannot be empty",
        },
        len: {
          args: [2, 100],
          msg: "Color state must be between 2 and 100 characters",
        },
      },
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: "Length must be a valid number",
        },
        min: {
          args: [0],
          msg: "Length must be greater than or equal to 0",
        },
      },
    },
    tree_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Tree id is required",
        },
        isInt: {
          msg: "Tree id must be an integer",
        },
        min: {
          args: [1],
          msg: "Tree id must be greater than 0",
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
    modelName: "Leaf",
    tableName: "leaves",
    timestamps: false,
  }
);