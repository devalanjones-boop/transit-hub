const Bus = require("../models/busModel");
const { createBus } = require("../services/busServices");


jest.mock("../models/busModel");


describe("createBus Service", () => {


  beforeEach(() => {
    jest.clearAllMocks();
  });


  test("should create a bus", async () => {

    Bus.findOne.mockResolvedValue(null);

    Bus.create.mockResolvedValue({
      busRegNumber: "KL01AB1234",
    });


    const result = await createBus({
      busRegNumber: "KL01AB1234",
    });


    expect(Bus.findOne)
      .toHaveBeenCalledWith({
        busRegNumber: "KL01AB1234",
      });


    expect(Bus.create)
      .toHaveBeenCalled();


    expect(result.busRegNumber)
      .toBe("KL01AB1234");

  });


  test("should throw error if bus exists", async () => {

    Bus.findOne.mockResolvedValue({
      busRegNumber: "KL01AB1234",
    });


    await expect(
      createBus({
        busRegNumber: "KL01AB1234",
      })
    ).rejects.toThrow("Bus already exists");


  });


});