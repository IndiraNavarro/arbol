import { Request, Response } from "express";
import { Leaf, LeafI } from "../models/Leaf";

export class LeafController {
  public async getAllLeaves(req: Request, res: Response) {
    try {
      const leaves: LeafI[] = await Leaf.findAll({
        where: { status: "ACTIVE" },
      });

      res.status(200).json({ leaves });
    } catch (error) {
      res.status(500).json({ error: "Error fetching leaves" });
    }
  }

  public async getLeafById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const leaf = await Leaf.findOne({
        where: {
          id: pk,
          status: "ACTIVE",
        },
      });

      if (leaf) {
        res.status(200).json({ leaf });
      } else {
        res.status(404).json({ error: "Leaf not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching leaf" });
    }
  }

  public async createLeaf(req: Request, res: Response) {
    const { color_state, length, tree_id, status } = req.body;

    try {
      const body: LeafI = {
        color_state,
        length,
        tree_id,
        status,
      };

      const newLeaf = await Leaf.create({ ...body });

      res.status(201).json(newLeaf);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateLeaf(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { color_state, length, tree_id, status } = req.body;

    try {
      const body: LeafI = {
        color_state,
        length,
        tree_id,
        status,
      };

      const leafExist = await Leaf.findOne({
        where: {
          id: pk,
          status: "ACTIVE",
        },
      });

      if (leafExist) {
        await leafExist.update(body);

        res.status(200).json(leafExist);
      } else {
        res.status(404).json({ error: "Leaf not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteLeaf(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const leafToDelete = await Leaf.findOne({
        where: { id: pk },
      });

      if (leafToDelete) {
        await leafToDelete.destroy();

        res.status(200).json({ message: "Leaf deleted successfully" });
      } else {
        res.status(404).json({ error: "Leaf not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting leaf" });
    }
  }

  public async deleteLeafAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const leafToUpdate = await Leaf.findOne({
        where: {
          id: pk,
          status: "ACTIVE",
        },
      });

      if (leafToUpdate) {
        await leafToUpdate.update({ status: "INACTIVE" });

        res.status(200).json({ message: "Leaf marked as inactive" });
      } else {
        res.status(404).json({ error: "Leaf not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking leaf as inactive" });
    }
  }
}