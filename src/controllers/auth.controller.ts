import type { Request, Response } from "express";
import { AuthService, PHONE_REGEX } from "../services/auth.service.js";
import { signToken } from "../utils/jwt.js";
import { toNonEmptyString } from "../utils/parsers.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 24 * 60 * 60 * 1000,
};
export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const { username, password, phone, name, last_name } = req.body ?? {};

    if (typeof username !== "string" || username.trim() === "") {
      res.status(400).json({ message: "Username is required" });
      return;
    }
    if (PHONE_REGEX.test(username.trim())) {
      res.status(400).json({ message: "Username cannot be a phone number" });
      return;
    }
    if (typeof password !== "string" || password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
      return;
    }
    if (
      phone !== undefined &&
      (typeof phone !== "string" || !PHONE_REGEX.test(phone))
    ) {
      res.status(400).json({ message: "Phone must look like 09123456789" });
      return;
    }
    const result = await this.authService.register({
      username: username.trim(),
      password,
      phone,
      name: toNonEmptyString(name),
      last_name: toNonEmptyString(last_name),
    });

    if (!result.ok) {
      const message =
        result.reason === "username_taken"
          ? "Username is already taken"
          : "Phone number is already registered";
      res.status(409).json({ message });
      return;
    }

    res.status(201).json(result.user);
  };

  login = async (req: Request, res: Response) => {
    const { identifier, password } = req.body ?? {};

    if (!toNonEmptyString(identifier) || !toNonEmptyString(password)) {
      res.status(400).json({ message: "Identifier and password are required" });
      return;
    }
    const user = await this.authService.login(identifier.trim(), password);
    if (!user) {
      res.status(401).json({ message: "Invalid username/phone or password" });
      return;
    }

    res.cookie("token", signToken(user.id), COOKIE_OPTIONS);
    res.json(user);
  };
  logout = (_req: Request, res: Response) => {
    res.clearCookie("token", COOKIE_OPTIONS);
    res.status(204).end();
  };

  me = async (req: Request, res: Response) => {
    const user = await this.authService.findById(req.userId!);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  };
}
