import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from '@modules/categories/dto/create-category.dto';
import { ERROR_MESSAGES } from '@constants/errors.constants';
import { UpdateCategoriesDto } from '@modules/categories/dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async fetchAllCategories(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }

  async createCategory(payload: CreateCategoryDto, user: string): Promise<any> {
    const existingCategory = await this.prismaService.category.findUnique({
      where: { code: payload.code },
    });
    if (existingCategory) throw new HttpException(ERROR_MESSAGES.CATEGORIES.ALREADY_EXISTS, HttpStatus.NOT_ACCEPTABLE);
    return this.prismaService.category.create({
      data: {
        ...payload,
        createdBy: user,
      },
    });
  }

  async updateCategory(payload:UpdateCategoriesDto,user: string): Promise<Category> {
      let category = await this.getCategoryById(payload.id);
      category = {...category,...payload, updatedBy:user,updatedAt:new Date()};
      return this.prismaService.category.update({ where: { id: category.id }, data: category });
  }

  async getCategoryById(id: number): Promise<Category> {
    const existingCategory = await this.prismaService.category.findFirst({
      where: { id},
    });
    if(!existingCategory) throw new HttpException(ERROR_MESSAGES.CATEGORIES.CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND);
    return existingCategory
  }
}
