import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IProductsServiceCreate,
  IProductsServiceDelete,
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
  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    //const result = await this.productsRepository.delete({ id: productId });
    //return result.affected ? true : false;

    // 2. 소프트 삭제 - isDeleted
    //this.productsRepository.update({ id: productId }, {isDeleted:true});

    // 3.소프트 삭제 - deleteAt
    //this.productsRepository.update({ id: productId }, {deleteAt:new Date()});

    // 4. 소프트 삭제 - softRemove
    // 단점 : id로만 삭제가능
    // 장점 : 여러 ID 한번에 지우기 가능
    //        .softRemove([{id:aaa}, {id:bbb}, {id:ccc}])
    //this.productsRepository.softRemove({ id: productId });

    // 5. 소프트 삭제 - softDelete
    // 단점 : 한번에 한개씩 지울 수 있음
    // 장점 : 다른 컬럼으로도 삭제 가능
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
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
