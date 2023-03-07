import jwt from "jsonwebtoken"

interface UserProps {
  id: string,
  name: string,
  email: string,
  unique: string,
  password: string,
}

export function generateAccessToken(user: UserProps) {
  return (
    jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: '8h',
    })
  )
}

export function generateRefreshToken(user: UserProps, jti: string) {
  return jwt.sign({
    userId: user.id,
    jti
  }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '8h',
  });
}

export function generateTokens(user: UserProps, jti: string) {
  
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}