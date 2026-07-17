import { AppDataSource } from "../config/database";
import { Member } from "../entities/Member";
import { CreateMemberDto } from "../dtos/CreateMemberDto";
import { MemberResponseDto } from "../dtos/MemberResponseDto";

export class MemberService {
  private memberRepository = AppDataSource.getRepository(Member);

  async createMember(dto: CreateMemberDto): Promise<MemberResponseDto> {
    const member = new Member();
    member.fullName = dto.fullName;
    member.email = dto.email;

    const saved = await this.memberRepository.save(member);
    return MemberResponseDto.fromEntity(saved);
  }

  async getAllMembers(): Promise<MemberResponseDto[]> {
    const members = await this.memberRepository.find();
    return members.map(MemberResponseDto.fromEntity);
  }
}