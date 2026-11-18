import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PetCategory } from '../entities/pet-supply.entity';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page має бути цілим числом' })
  @Min(1, { message: 'page має бути не менше 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit має бути цілим числом' })
  @Min(1, { message: 'limit має бути не менше 1' })
  @Max(100, { message: 'limit має бути не більше 100' })
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(PetCategory, {
    message: 'petCategory має бути одним із значень: CAT, DOG, BIRD, FISH',
  })
  petCategory?: PetCategory;
}
