import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from '@modules/categories/dto/create-sub-category.dto';
import { PrismaService } from '@services/prisma.service';
import { UpdateSubCategoriesDTO } from '@modules/categories/dto/update-sub-category';
import { SubCategory } from '@prisma/client';

@Injectable()
export class SubCategoryService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async fetchSubCategories(category:number):Promise<SubCategory[]> {
    return this.prismaService.subCategory.findMany({where:{category:parseInt(String(category))}});
  }

  async create(payload:CreateSubCategoryDto,user:string){
    return this.prismaService.subCategory.create({
      data: {
        ...payload,
        createdBy: user
      }
    });
  }

  async updateById(payload:UpdateSubCategoriesDTO,user:string){
    return this.prismaService.subCategory.update({where:{id:payload.id},data:{
        ...payload,
        updatedBy:user,
        updatedAt:new Date()
      }})
  }
}
