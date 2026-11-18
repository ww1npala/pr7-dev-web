import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetSuppliesModule } from './pet-supplies/pet-supplies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nest_user',
      password: 'nest_password',
      database: 'store_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PetSuppliesModule,
  ],
})
export class AppModule {}
