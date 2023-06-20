import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSalesLocationInput } from 'src/apis/productsSalesLocations/dto/product-saleslocation.input';
import { ProductTagInput } from 'src/apis/productsTags/dto/product-Tag.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => ProductSalesLocationInput)
  productSalesLocation: ProductSalesLocationInput;

  @Field(() => String)
  productCategoryId: string;

  @Field(() => [ProductTagInput])
  productTags: ProductTagInput[];
}
