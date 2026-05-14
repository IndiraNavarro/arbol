import { Request, Response } from "express";
import { Tree, TreeI } from "../models/Tree";

export class TreeController {
  public async getAllTrees(req: Request, res: Response) {
    try {
      const trees: TreeI[] = await Tree.findAll({
        where: { status: "ACTIVE" },
      });

      res.status(200).json({ trees });
    } catch (error) {
      res.status(500).json({ error: "Error fetching trees" });
    }
  }

  public async getTreeById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const tree = await Tree.findOne({
        where: {
          id: pk,
          status: "ACTIVE",
        },
      });

      if (tree) {
        res.status(200).json({ tree });
      } else {
        res.status(404).json({ error: "Tree not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching tree" });
    }
  }

  public async createTree(req: Request, res: Response) {
    const { species, estimated_age, height, status } = req.body;

    try {
      const body: TreeI = {
        species,
        estimated_age,
        height,
        status,
      };

      const newTree = await Tree.create({ ...body });

      res.status(201).json(newTree);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateTree(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { species, estimated_age, height, status } = req.body;

    try {
      const body: TreeI = {
        species,
        estimated_age,
        height,
        status,
      };

      const treeExist = await Tree.findOne({
        where: {
          id: pk,
          status: "ACTIVE",
        },
      });

      if (treeExist) {
        await treeExist.update(body);

        res.status(200).json(treeExist);
      } else {
        res.status(404).json({ error: "Tree not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteTree(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const treeToDelete = await Tree.findOne({
        where: { id: pk },
      });

      if (treeToDelete) {
        await treeToDelete.destroy();

        res.status(200).json({ message: "Tree deleted successfully" });
      } else {
        res.status(404).json({ error: "Tree not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting tree" });
    }
  }

  public async deleteTreeAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const treeToUpdate = await Tree.findOne({
        where: {
          id: pk,
          status: "ACTIVE",
        },
      });

      if (treeToUpdate) {
        await treeToUpdate.update({ status: "INACTIVE" });

        res.status(200).json({ message: "Tree marked as inactive" });
      } else {
        res.status(404).json({ error: "Tree not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking tree as inactive" });
    }
  }
}