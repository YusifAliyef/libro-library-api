import { IsNotEmpty, IsString, Length, IsNumber } from "class-validator";

export class CreateBookDto {
  @IsNotEmpty({ message: "Kitabın adı boş ola bilməz!" })
  @IsString({ message: "Kitabın adı mətn tipində olmalıdır!" })
  @Length(2, 100, { message: "Kitabın adı minimum 2, maksimum 100 simvol olmalıdır!" })
  title: string;

  @IsNotEmpty({ message: "ISBN sahəsi boş ola bilməz!" })
  @IsString({ message: "ISBN mətn tipində olmalıdır!" })
  @Length(10, 20, { message: "ISBN nömrəsi düzgün uzunluqda olmalıdır (10-20 simvol)!" })
  isbn: string;

  @IsNotEmpty({ message: "Müəllif (authorId) boş ola bilməz!" })
  @IsNumber({}, { message: "Müəllif ID-si rəqəm tipində olmalıdır!" })
  authorId: number; // Xətanı tamamilə həll edən sətir 🎯
}