import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ProductController } from '../controllers/products';
import { ProductRepository } from '../repositories/products.repositories';
import { GenSlugService } from '../services/genSlug.service';
import { FindBrandByIdUseCase } from '../use-cases/brands/find-brand-by-id.use-case';
import { FindAllCategoriesUseCase } from '../use-cases/categories/find-all.use-case';
import { FindCategoryByIdUseCase } from '../use-cases/categories/find-category-by-id.use-case';
import { CreateProductUseCase } from '../use-cases/products/create-product.use-case';
import { DeleteProductUseCase } from '../use-cases/products/delete-product-by-id.use-case';
import { FindAllProductsUseCase } from '../use-cases/products/find-all.use-case';
import { FindProductByIdUseCase } from '../use-cases/products/find-product-by-id.use-case';
import { UpdateProductUseCase } from '../use-cases/products/update-product.use-case';
import { BrandModule } from './brands.module';
import { CategoryModule } from './categories.module';

@Module({
  imports: [PrismaModule, CategoryModule, BrandModule],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindAllCategoriesUseCase,
    FindProductByIdUseCase,
    FindCategoryByIdUseCase,
    FindBrandByIdUseCase,
    GenSlugService,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule {}
