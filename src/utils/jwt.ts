import jwt from "jsonwebtoken";
import { UserRole } from "../entities/User";


interface TokenPayload{
    userId:number;
    role:UserRole;
}

export const generateToken= (payload:TokenPayload): string=>{
    const secret=process.env.JWT_SECRET|| "default_secret";
    const expiresIn=process.env.JWT_EXPIRES_IN || "1h";

    return jwt.sign(payload,secret, {expiresIn:expiresIn as any});
}
