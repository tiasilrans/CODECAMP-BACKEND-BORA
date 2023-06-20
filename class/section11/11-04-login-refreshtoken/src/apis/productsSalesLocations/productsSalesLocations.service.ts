import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductSalesLocation } from './entities/productSalesLocation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable() //디폴트 싱글톤
export class ProductsSalesLocationsService {
  constructor(
    @InjectRepository(ProductSalesLocation)
    private readonly productsSalesLocationsRepository: Repository<ProductSalesLocation>,
  ) {}

  create({ productSalesLocation }) {
    return this.productsSalesLocationsRepository.save({
      ...productSalesLocation,
    });
  }
}
