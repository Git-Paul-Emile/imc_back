import jwt from "jsonwebtoken";


const getAccessTokenSecret = (): string => {
 const secret = process.env.ACCESS_TOKEN_SECRET;
 if (!secret) {
   throw new Error("JWT secret manquant dans .env");
 }
 return secret;
};


const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "1d";


export const generateToken = (payload: object): string => {
 // Utilisation d'une fonction avec overload sûre
 return jwt.sign(payload, getAccessTokenSecret(), {
   expiresIn: ACCESS_TOKEN_EXPIRY,
 } as jwt.SignOptions);
};


export const verifyToken = (token: string) => {
 return jwt.verify(token, getAccessTokenSecret());
};
