import { Model, type Pojo } from "objection";

export class User extends Model {
  static tableName = "users";

  id!: number;
  username!: string;
  phone!: string | null;
  password!: string;
  name!: string | null;
  last_name!: string | null;

  $formatJson(json: Pojo): Pojo {
    const result = super.$formatJson(json);
    console.log(result);
    delete result.password;
    return result;
  }
}
