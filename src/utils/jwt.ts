import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not set in .env");
}

export function signToken(userId: number): string {
  return jwt.sign({ sub: String(userId) }, secret!, { expiresIn: "1d" });
}

export function verifyToken(token: string): number | null {
  try {
    const payload = jwt.verify(token, secret!);
    if (typeof payload === "string" || payload.sub === undefined) {
      return null;
    }
    return Number(payload.sub);
  } catch {
    return null;
  }
}
