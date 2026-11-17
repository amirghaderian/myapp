import fs from "node:fs";
import path from "node:path";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";

const specPath = path.join(process.cwd(), "docs", "openapi.yaml");
const spec = YAML.parse(fs.readFileSync(specPath, "utf8"));

const router = Router();
router.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(spec, {
    swaggerOptions: { withCredentials: true, persistAuthorization: true },
  }),
);

export default router;
