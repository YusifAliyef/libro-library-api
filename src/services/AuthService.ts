import { AppDataSource } from "../config/database";
import { User, UserRole } from "../entities/User";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { RegisterDto, LoginDto, AuthResponseDto } from "../dtos/AuthDto";
import { AppError } from "../errors/AppError";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, role } = registerDto;

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new AppError("Bu email artıq istifadə olunur!", 400);
    }

    const hashedPassword = await hashPassword(password);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role: role || UserRole.USER,
    });

    await this.userRepository.save(user);

    const token = generateToken({ userId: user.id, role: user.role });

    return {
      message: "Qeydiyyat uğurla tamamlandı",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new AppError("Email və ya şifrə yanlışdır!", 401);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Email və ya şifrə yanlışdır!", 401);
    }

    const token = generateToken({ userId: user.id, role: user.role });

    return {
      message: "Giriş uğurla icra olundu",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}