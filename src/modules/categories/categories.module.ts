import { Module } from '@nestjs/common';
import { SubcategoriesController } from './subcategories.controller';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './services/category.service';
import { SubCategoryService } from './services/sub-category.service';

@Module({
  controllers: [SubcategoriesController, CategoriesController],
  providers: [CategoryService, SubCategoryService],
})
export class CategoriesModule {}
