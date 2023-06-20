import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productService: ProductsService, //
  ) {}

  //상품 조회 API
  // 1. 여러개 조회하기
  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // 2. 한 개 조회하기
  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productService.findOne({ productId });
  }

  //상품 등록 API
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    // 브라우저에 결과 보내는 방법 2가지
    // 1. 객체 그대로 돌려보내기
    return this.productService.create({ createProductInput });

    //2. 결과 메시지만 보내주기
    // return "상품등록이 정상적으로 완료되었습니다."
  }

  //상품 수정
  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string, //
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update({ productId, updateProductInput });
  }
}
