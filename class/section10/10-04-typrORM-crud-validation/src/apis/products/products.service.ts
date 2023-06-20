import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
  IProductsServicecheckSoldout,
} from './interfaces/products-service.interface';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable() //디폴트 싱글톤
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
  ) {}
  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,
      //하나하나 직접 입력
      //name: '마우스',
      //description: '좋은 마우스',
    });

    // result 안에는 무엇이?
    // result ={
    // id:'id12343445657842',
    // name:'마우스',
    // description: '좋은 마우스',
    // price: 3000
    // }
    return result;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    //기존 데이터 가져오기
    const product = await this.findOne({ productId });

    //soldout 체크
    this.checkSoldout({ product });

    //수정하기
    const result = this.productsRepository.save({
      ...product,
      ...updateProductInput,
    });
    return result;
  }

  checkSoldout({ product }: IProductsServicecheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
