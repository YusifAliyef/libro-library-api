import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "members" })
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  fullName: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @CreateDateColumn({ type: "timestamp" })
  membershipDate: Date;
}