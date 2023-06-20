import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';
import { ProductSalesLocation } from '../productsSalesLocations/entities/productSalesLocation.entity';
import { ProductsTagsService } from '../productsTags/productsTags.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { ProductSubscriber } from './entities/product.subscriber';

@Module({
  imports: [
    //테이블
    TypeOrmModule.forFeature([
      Product, //
      ProductSalesLocation,
      ProductTag,
    ]),
  ],
  providers: [
    ProductSubscriber,
    ProductsResolver, //
    ProductsService,
    ProductsSalesLocationsService,
    ProductsTagsService,
  ],
})
export class ProductsModule {}
