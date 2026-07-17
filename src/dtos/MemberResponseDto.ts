import { Member } from "../entities/Member";

export class MemberResponseDto {
  id: number;
  fullName: string;
  email: string;
  membershipDate: Date;

  static fromEntity(entity: Member): MemberResponseDto {
    const dto = new MemberResponseDto();
    dto.id = entity.id;
    dto.fullName = entity.fullName;
    dto.email = entity.email;
    dto.membershipDate = entity.membershipDate;
    return dto;
  }
}