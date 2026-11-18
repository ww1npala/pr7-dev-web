import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { PetCategory } from '../entities/pet-supply.entity';

export class UpdatePetSupplyDto {
  @IsOptional()
  @IsString({ message: 'Назва товару (title) має бути рядком' })
  @IsNotEmpty({ message: 'Назва товару (title) не може бути порожньою' })
  @MaxLength(150)
  title?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Ціна (price) має бути числом' })
  @IsPositive({ message: 'Ціна (price) повинна бути більшою за 0' })
  price?: number;

  @IsOptional()
  @IsEnum(PetCategory, {
    message: 'petCategory має бути одним із значень: CAT, DOG, BIRD, FISH',
  })
  petCategory?: PetCategory;

  @IsOptional()
  @IsNumber({}, { message: 'Вага упаковки (packageWeightKg) має бути числом' })
  @Min(0.1, {
    message: 'Вага упаковки (packageWeightKg) має бути не менше 0.1 кг',
  })
  packageWeightKg?: number;

  @IsOptional()
  @IsString({ message: 'Бренд (brand) має бути рядком' })
  @IsNotEmpty({ message: 'Бренд (brand) не може бути порожнім' })
  @MaxLength(80)
  brand?: string;
}
