import { Application } from "express";
import { TreeController } from "../controllers/tree.controller";

export class TreeRoutes {
  public controller = new TreeController();

  public routes(app: Application): void {
    app.route("/api/tree/public")
      .get(this.controller.getAllTrees)
      .post(this.controller.createTree);

    app.route("/api/tree/public/:id")
      .get(this.controller.getTreeById)
      .patch(this.controller.updateTree)
      .delete(this.controller.deleteTree);

    app.route("/api/tree/public/:id/logic")
      .delete(this.controller.deleteTreeAdv);
  }
}