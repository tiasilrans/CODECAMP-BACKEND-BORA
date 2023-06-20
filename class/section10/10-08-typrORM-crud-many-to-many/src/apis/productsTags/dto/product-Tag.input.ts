import { InputType, PickType } from '@nestjs/graphql';
import { ProductTag } from '../entities/productTag.entity';

@InputType()
export class ProductTagInput extends PickType(
  ProductTag, //
  ['name'],
  InputType,
) {}
