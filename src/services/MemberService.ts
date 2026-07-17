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
    return members.map((member) => MemberResponseDto.fromEntity(member));
  }

  async getMemberById(id: number): Promise<MemberResponseDto> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new Error("Üzv tapılmadı!");
    }
    return MemberResponseDto.fromEntity(member);
  }

  async updateMember(
    id: number,
    dto: CreateMemberDto,
  ): Promise<MemberResponseDto> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new Error("Yenilənmək istənən üzv tapılmadı!");
    }

    member.fullName = dto.fullName;
    member.email = dto.email;

    const updated = await this.memberRepository.save(member);
    return MemberResponseDto.fromEntity(updated);
  }

  async deleteMember(id: number): Promise<void> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new Error("Silinmək istənən üzv tapılmadı!");
    }
    await this.memberRepository.remove(member);
  }
}
