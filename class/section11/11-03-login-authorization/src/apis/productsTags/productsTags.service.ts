import { Injectable } from '@nestjs/common';
import { In, InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTag } from './entities/productTag.entity';
import {
  IProductsTagsServiceBilkInsert,
  IProductsTagsServiceFindByNames,
} from './interfaces/products-Tags-service.interface';

@Injectable() //디폴트 싱글톤
export class ProductsTagsService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,
  ) {}

  findByNames({ tagNames }: IProductsTagsServiceFindByNames) {
    return this.productsTagsRepository.find({
      where: { name: In(tagNames) },
    });
  }

  bulkInsert({ names }: IProductsTagsServiceBilkInsert): Promise<InsertResult> {
    return this.productsTagsRepository.insert(names);
    // this.productsTagsRepository.insert(names);
    // 벌크 인서트 save로는 불가능
  }
}
