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
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';

@Injectable() //디폴트 싱글톤
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
    private readonly productsSalesLocationsService: ProductsSalesLocationsService,
  ) {}
  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSalesLocation', 'productCategory'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSalesLocation', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 1. 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    // });

    // 2. 상품과 상품거래 위치를 같이 등록하는 방법
    const { productSalesLocation, productCategoryId, ...product } =
      createProductInput;
    const result = await this.productsSalesLocationsService.create({
      productSalesLocation,
    });

    const result2 = this.productsRepository.save({
      ...product,
      productSalesLocation: result,
      productCategory: { id: productCategoryId },
      // createProductInput에 name 까지 포함해서 받아오면 다 쓸 수 있음
    });
    return result2;
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
