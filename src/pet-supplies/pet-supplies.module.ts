import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetSuppliesController } from './pet-supplies.controller';
import { PetSuppliesService } from './pet-supplies.service';
import { PetSupplyEntity } from './entities/pet-supply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetSupplyEntity])],
  controllers: [PetSuppliesController],
  providers: [PetSuppliesService],
})
export class PetSuppliesModule {}
