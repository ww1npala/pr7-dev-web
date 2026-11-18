import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PetCategory {
  CAT = 'CAT',
  DOG = 'DOG',
  BIRD = 'BIRD',
  FISH = 'FISH',
}

@Entity('pet_supplies')
export class PetSupplyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: PetCategory,
    default: PetCategory.CAT,
  })
  petCategory: PetCategory;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  packageWeightKg: number;

  @Column({ type: 'varchar', length: 80 })
  brand: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date | null;
}
