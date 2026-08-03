import { AppDataSource } from "../config/database";
import { Member } from "../entities/Member";
import { CreateMemberDto } from "../dtos/CreateMemberDto";
import { MemberResponseDto } from "../dtos/MemberResponseDto";
import { AppError } from "../errors/AppError";

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
      throw new AppError("Üzv tapılmadı!", 404);
    }
    return MemberResponseDto.fromEntity(member);
  }

  async updateMember(
    id: number,
    dto: CreateMemberDto
  ): Promise<MemberResponseDto> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new AppError("Yenilənmək istənən üzv tapılmadı!", 404);
    }

    member.fullName = dto.fullName;
    member.email = dto.email;

    const updated = await this.memberRepository.save(member);
    return MemberResponseDto.fromEntity(updated);
  }

  async deleteMember(id: number): Promise<void> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new AppError("Silinmək istənən üzv tapılmadı!", 404);
    }
    await this.memberRepository.remove(member);
  }
}