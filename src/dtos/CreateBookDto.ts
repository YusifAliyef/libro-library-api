import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBookDto {
  @IsNotEmpty({ message: "Kitabın adı boş ola bilməz!" })
  @IsString({ message: "Kitabın adı mətn tipində olmalıdır!" })
  @Length(2, 100, { message: "Kitabın adı minimum 2, maksimum 100 simvol olmalıdır!" })
  title: string;

  @IsNotEmpty({ message: "ISBN sahəsi boş ola bilməz!" })
  @IsString({ message: "ISBN mətn tipində olmalıdır!" })
  @Length(10, 20, { message: "ISBN nömrəsi düzgün uzunluqda olmalıdır (10-20 simvol)!" })
  isbn: string;
}