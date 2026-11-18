import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { PetSupplyEntity } from './entities/pet-supply.entity';
import { CreatePetSupplyDto } from './dto/create-pet-supply.dto';
import { UpdatePetSupplyDto } from './dto/update-pet-supply.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class PetSuppliesService {
  constructor(
    @InjectRepository(PetSupplyEntity)
    private readonly petSupplyRepo: Repository<PetSupplyEntity>,
  ) {}

  async create(dto: CreatePetSupplyDto): Promise<PetSupplyEntity> {
    const entity = this.petSupplyRepo.create(dto);
    return await this.petSupplyRepo.save(entity);
  }

  async findAll(query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<PetSupplyEntity> = {};

    if (query.search) {
      where.title = ILike(`%${query.search}%`);
    }

    if (query.petCategory) {
      where.petCategory = query.petCategory;
    }

    const [data, total] = await this.petSupplyRepo.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<PetSupplyEntity> {
    const supply = await this.petSupplyRepo.findOneBy({ id });
    if (!supply) {
      throw new NotFoundException(`Зоотовар з ID ${id} не знайдено`);
    }
    return supply;
  }

  async update(id: string, dto: UpdatePetSupplyDto): Promise<PetSupplyEntity> {
    const supply = await this.findOne(id);
    Object.assign(supply, dto);
    return await this.petSupplyRepo.save(supply);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.petSupplyRepo.softDelete(id);
  }

  async restore(id: string): Promise<{ message: string; data: PetSupplyEntity }> {
    const restoreResult = await this.petSupplyRepo.restore(id);
    if (!restoreResult.affected) {
      throw new NotFoundException(`Зоотовар з ID ${id} не знайдено для відновлення`);
    }
    const restored = await this.findOne(id);
    return {
      message: 'Сутність успішно відновлена',
      data: restored,
    };
  }
}
