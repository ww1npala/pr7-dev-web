import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PetSuppliesService } from './pet-supplies.service';
import { CreatePetSupplyDto } from './dto/create-pet-supply.dto';
import { UpdatePetSupplyDto } from './dto/update-pet-supply.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('pet-supplies')
export class PetSuppliesController {
  constructor(private readonly petSuppliesService: PetSuppliesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPetSupplyDto: CreatePetSupplyDto) {
    return this.petSuppliesService.create(createPetSupplyDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.petSuppliesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.petSuppliesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePetSupplyDto: UpdatePetSupplyDto,
  ) {
    return this.petSuppliesService.update(id, updatePetSupplyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.petSuppliesService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.petSuppliesService.restore(id);
  }
}
