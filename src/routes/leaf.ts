import { Application } from "express";
import { LeafController } from "../controllers/leaf.controller";

export class LeafRoutes {
  public controller = new LeafController();

  public routes(app: Application): void {
    app.route("/api/leaf/public")
      .get(this.controller.getAllLeaves)
      .post(this.controller.createLeaf);

    app.route("/api/leaf/public/:id")
      .get(this.controller.getLeafById)
      .patch(this.controller.updateLeaf)
      .delete(this.controller.deleteLeaf);

    app.route("/api/leaf/public/:id/logic")
      .delete(this.controller.deleteLeafAdv);
  }
}