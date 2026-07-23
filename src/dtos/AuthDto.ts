import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../entities/User";


export class RegisterDto {
  @IsEmail({}, { message: "Düzgün email ünvanı daxil edin" })
  @IsNotEmpty({ message: "Email boş ola bilməz" })
  email!: string;

  @IsString()
  @MinLength(6, { message: "Şifrə ən azı 6 simvoldan ibarət olmalıdır" })
  password!: string;

  @IsOptional()
  @IsEnum(UserRole, { message: "Rollar yalnız USER və ya ADMIN ola bilər" })
  role?: UserRole;
}


export class LoginDto {
  @IsEmail({}, { message: "Düzgün email ünvanı daxil edin" })
  @IsNotEmpty({ message: "Email boş ola bilməz" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "Şifrə boş ola bilməz" })
  password!: string;
}


export interface AuthResponseDto {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    role: UserRole;
  };
}