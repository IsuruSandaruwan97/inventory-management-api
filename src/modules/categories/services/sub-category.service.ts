import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from '@modules/categories/dto/create-sub-category.dto';
import { PrismaService } from '@services/prisma.service';

@Injectable()
export class SubCategoryService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async fetchSubCategories(){

  }

  // async fetchSubCategoriesByCategory(code:string){
  //
  // }

  async create(payload:CreateSubCategoryDto,user:string){
     const data = {
       ...payload,
       createdBy: user
     }
     const status  = await this.prismaService.subCategory.create({data});
     console.log(status)

  }

  async update(){}


}
