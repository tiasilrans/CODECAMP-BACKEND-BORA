import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSalesLocation } from '../entities/productSalesLocation.entity';

@InputType()
export class ProductSalesLocationInput extends OmitType(
  ProductSalesLocation,
  ['id'],
  InputType,
) {}
