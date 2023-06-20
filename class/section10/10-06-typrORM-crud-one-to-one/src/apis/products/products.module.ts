import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';
import { ProductSalesLocation } from '../productsSalesLocations/entities/productSalesLocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSalesLocation,
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
    ProductsSalesLocationsService,
  ],
})
export class ProductsModule {}
