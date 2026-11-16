import bcrypt from "bcryptjs";
import { User } from "../models/users.js";

export const PHONE_REGEX = /^09\d{9}$/;

export interface RegisterInput {
  username: string;
  password: string;
  phone?: string;
  name?: string;
  last_name?: string;
}

export type RegisterResult =
  | { ok: true; user: User }
  | { ok: false; reason: "username_taken" | "phone_taken" };

export class AuthService {
  async findById(id: number): Promise<User | undefined> {
    return await User.query().findById(id);
  }
  async register(data: RegisterInput): Promise<RegisterResult> {
    if (await User.query().findOne({ username: data.username })) {
      return { ok: false, reason: "username_taken" };
    }
    if (data.phone && (await User.query().findOne({ phone: data.phone }))) {
      return { ok: false, reason: "phone_taken" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.query().insert({
      ...data,
      password: hashedPassword,
    });
    return { ok: true, user };
  }

  async login(identifier: string, password: string): Promise<User | null> {
    const column = PHONE_REGEX.test(identifier) ? "phone" : "username";
    const user = await User.query().findOne({ [column]: identifier });
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }
}
