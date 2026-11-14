import knex from "knex";
import config from "./database/knexfile.js";
import { Model } from "objection";
export const db = knex(config);
Model.knex(db);
