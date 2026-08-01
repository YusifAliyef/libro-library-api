import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto{
    @IsNotEmpty({message:"Kateqoriya adı boş ola bilməz!"})
    @IsString({message:"Kateqoriya adı mətn tipində olmalıdır!"})
    @Length(2, 50, { message: "Kateqoriya adı minimum 2, maksimum 50 simvol olmalıdır!"})
    name: string;
}