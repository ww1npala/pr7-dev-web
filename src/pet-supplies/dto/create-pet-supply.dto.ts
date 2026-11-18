import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { PetCategory } from '../entities/pet-supply.entity';

export class CreatePetSupplyDto {
  @IsString({ message: 'Назва товару (title) має бути рядком' })
  @IsNotEmpty({ message: 'Назва товару (title) є обовʼязковою' })
  @MaxLength(150, { message: 'Максимальна довжина title — 150 символів' })
  title: string;

  @IsNumber({}, { message: 'Ціна (price) має бути числом' })
  @IsPositive({ message: 'Ціна (price) повинна бути більшою за 0' })
  price: number;

  @IsEnum(PetCategory, {
    message: 'petCategory має бути одним із значень: CAT, DOG, BIRD, FISH',
  })
  petCategory: PetCategory;

  @IsNumber({}, { message: 'Вага упаковки (packageWeightKg) має бути числом' })
  @Min(0.1, {
    message: 'Вага упаковки (packageWeightKg) має бути не менше 0.1 кг',
  })
  packageWeightKg: number;

  @IsString({ message: 'Бренд (brand) має бути рядком' })
  @IsNotEmpty({ message: 'Бренд (brand) є обовʼязковим' })
  @MaxLength(80, { message: 'Максимальна довжина brand — 80 символів' })
  brand: string;
}
