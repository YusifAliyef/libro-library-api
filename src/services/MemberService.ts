import { AppDataSource } from "../config/database";
import { Member } from "../entities/Member";
import { CreateMemberDto } from "../dtos/CreateMemberDto";
import { MemberResponseDto } from "../dtos/MemberResponseDto";
import { AppError } from "../errors/AppError";
import { CacheService } from "../utils/cacheService";

export class MemberService {
  private memberRepository = AppDataSource.getRepository(Member);

  async createMember(dto: CreateMemberDto): Promise<MemberResponseDto> {
    const member = new Member();
    member.fullName = dto.fullName;
    member.email = dto.email;

    const saved = await this.memberRepository.save(member);

    CacheService.invalidatePattern("members");

    return MemberResponseDto.fromEntity(saved);
  }

  async getAllMembers(): Promise<MemberResponseDto[]> {
    const cacheKey = "members_all";
    const cachedData = CacheService.get<MemberResponseDto[]>(cacheKey);

    if (cachedData) {
      console.log("[CACHE HIT] Üzvlər keşdən gətirildi.");
      return cachedData;
    }

    const members = await AppDataSource.getRepository(Member)
      .createQueryBuilder("member")
      .leftJoinAndSelect("member.borrowings", "borrowings")
      .getMany();

    const result = members.map((member) =>
      MemberResponseDto.fromEntity(member),
    );

    CacheService.set(cacheKey, result, 300);

    return result;
  }

  async getMemberById(id: number): Promise<MemberResponseDto> {
    const cacheKey = `members_id_${id}`;
    const cachedData = CacheService.get<MemberResponseDto>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new AppError("Üzv tapılmadı!", 404);
    }

    const result = MemberResponseDto.fromEntity(member);
    CacheService.set(cacheKey, result, 300);

    return result;
  }

  async getAllMembersWithBorrowings(): Promise<MemberResponseDto[]> {
    const cacheKey = "members_all_borrowings";
    const cachedData = CacheService.get<MemberResponseDto[]>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const members = await AppDataSource.getRepository(Member)
      .createQueryBuilder("member")
      .leftJoinAndSelect("member.borrowings", "borrowings")
      .getMany();

    const result = members.map((member) =>
      MemberResponseDto.fromEntity(member),
    );
    CacheService.set(cacheKey, result, 300);

    return result;
  }

  async updateMember(
    id: number,
    dto: CreateMemberDto,
  ): Promise<MemberResponseDto> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new AppError("Yenilənmək istənən üzv tapılmadı!", 404);
    }

    member.fullName = dto.fullName;
    member.email = dto.email;

    const updated = await this.memberRepository.save(member);

    CacheService.invalidatePattern("members");

    return MemberResponseDto.fromEntity(updated);
  }

  async deleteMember(id: number): Promise<void> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new AppError("Silinmək istənən üzv tapılmadı!", 404);
    }

    await this.memberRepository.remove(member);

    CacheService.invalidatePattern("members");
  }
}
