import jwt from "jsonwebtoken";
export const dynamic = "force-dynamic";

export const AuthUser = async (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  console.log(token);
  if (!token) return null;
  try {
    const extratAuthUserInfo = jwt.verify(token, "default_secret_key");
    console.log(extratAuthUserInfo);
    if (extratAuthUserInfo) return extratAuthUserInfo;
  } catch (error) {
    return null;
  }
};
