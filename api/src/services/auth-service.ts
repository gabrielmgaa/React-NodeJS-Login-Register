import { db } from './../utils/db';
import { hashToken } from './../utils/hashToken';

interface TokenProps{
  jti: string,
  refreshToken: string,
  userId: string
}

export function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: TokenProps) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId
    },
  });
}

export function findRefreshTokenById(id: string) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

export function deleteRefreshToken(id: string) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

export function revokeTokens(userId: string) {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}