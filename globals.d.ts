// types/globals.d.ts
export {}; // ensures this file is a module

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      userType?: string;
    };
  }
}
