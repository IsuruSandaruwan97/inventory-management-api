import { Module } from '@nestjs/common';
import { SubcategoriesController } from './subcategories.controller';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './services/category.service';
import { PrismaService } from '@services/prisma.service';
import { ResponseHandlerService } from '@services/response-handler.service';

@Module({
  controllers: [SubcategoriesController, CategoriesController],
  providers: [CategoryService,PrismaService,ResponseHandlerService],
})
export class CategoriesModule {}
