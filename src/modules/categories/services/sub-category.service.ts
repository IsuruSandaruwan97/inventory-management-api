import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from '@modules/categories/dto/create-sub-category.dto';
import { PrismaService } from '@services/prisma.service';
import { UpdateSubCategoriesDTO } from '@modules/categories/dto/update-sub-category';
import { SubCategory } from '@prisma/client';
import isEmpty from 'lodash/isEmpty';

@Injectable()
export class SubCategoryService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async fetchSubCategories(category?:number):Promise<SubCategory[]> {
    const where = isEmpty(category)?{}:{category:parseInt(String(category))}
    return this.prismaService.subCategory.findMany({where,orderBy:{id:'desc'},include:{mainCategory:{select:{id:true,name:true}}}});
  }

  async create(payload:CreateSubCategoryDto,user:string){
    return this.prismaService.subCategory.create({
      data: {
        ...payload,type:[...payload.type,...['return','damage']],
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
