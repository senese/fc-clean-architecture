import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const productA = ProductFactory.create("a", "ProductA", 10);
    const productB = ProductFactory.create("b", "ProductB", 10);

    await productRepository.create(productA);
    await productRepository.create(productB);

    const result = await usecase.execute({});

    expect(result).toEqual({
      products: [
        {
          id: expect.any(String),
          name: "ProductA",
          price: 10,
        },
        {
          id: expect.any(String),
          name: "ProductB",
          price: 20,
        },
      ],
    });
  });
});
