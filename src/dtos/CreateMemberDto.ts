import { IsNotEmpty, IsString, Length, IsEmail } from "class-validator";

export class CreateMemberDto {
  @IsNotEmpty({ message: "Üzvün adı və soyadı boş ola bilməz!" })
  @IsString({ message: "Üzvün adı və soyadı mətn tipində olmalıdır!" })
  @Length(3, 60, { message: "Üzvün adı və soyadı minimum 3, maksimum 60 simvol olmalıdır!" })
  fullName: string;

  @IsNotEmpty({ message: "E-poçt ünvanı boş ola bilməz!" })
  @IsEmail({}, { message: "Düzgün bir e-poçt ünvanı daxil edin! (Məs: elvin@mail.com)" })
  email: string;
}