import CreateProductUseCase from "./create.product.usecase";

const input = {
  type: 'a',
  name: 'Product',
  price: 2
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
        type: 'a',
        id: expect.any(String),
        name: 'Product',
        price: 2,
      },
    );

    input.type = 'b'

    const output2 = await productCreateUseCase.execute(input);
    expect(output2).toEqual({
      type: 'b',
      id: expect.any(String),
      name: 'Product',
      price: input.price * 2,
    },
  );
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is below 0", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "Product"
    input.price = -2;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
