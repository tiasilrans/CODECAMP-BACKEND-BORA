import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  //상속 받으니까 필요 없음
  //   @Field(() => String, { nullable: true })
  //   name?: string;
  //   @Field(() => String, { nullable: true })
  //   description?: string;
  //   @Min(0)
  //   @Field(() => Int, { nullable: true })
  //   price?: number;
}

// PickType(CreateProductInput, ["name", "price"]) 골라서 사용
// OmitType(CreateProductInput, ["description"]) 해당 컬럼만 제외
// PartialType 모든 값이 필수가 아님
