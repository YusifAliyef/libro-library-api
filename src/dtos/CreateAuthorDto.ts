import { IsNotEmpty, IsString, Length, IsOptional } from "class-validator";

export class CreateAuthorDto {
  @IsNotEmpty({ message: "Yazıçının adı boş ola bilməz!" })
  @IsString({ message: "Yazıçının adı mətn tipində olmalıdır!" })
  @Length(3, 50, { message: "Yazıçının adı minimum 3, maksimum 50 simvol olmalıdır!" })
  name: string;

  @IsOptional()
  @IsString({ message: "Bioqrafiya mətn tipində olmalıdır!" })
  biography?: string;
}