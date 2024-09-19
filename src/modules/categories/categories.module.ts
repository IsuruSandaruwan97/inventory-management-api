import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './services/category.service';

@Module({
  controllers: [ CategoriesController],
  providers: [CategoryService],
})
export class CategoriesModule {}
