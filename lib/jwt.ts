import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  name?: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export function refreshToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    // Generate a new token with the same payload
    return generateToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    });
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}