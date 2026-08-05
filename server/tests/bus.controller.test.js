const { createBus } = require("../controllers/busController");
const busService = require("../services/busServices");


jest.mock("../services/busServices");


describe("createBus Controller", () => {

  let req;
  let res;


  beforeEach(() => {

    req = {
      body: {
        busRegNumber: "KL01AB1234",
      },
    };


    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };


    jest.clearAllMocks();

  });


  test("should create bus successfully", async () => {

    busService.createBus.mockResolvedValue({
      id: 1,
      busRegNumber: "KL01AB1234",
    });


    await createBus(req, res);


    expect(busService.createBus)
      .toHaveBeenCalledWith(req.body);


    expect(res.status)
      .toHaveBeenCalledWith(201);


    expect(res.json)
      .toHaveBeenCalledWith({
        success: true,
        message: "Bus created successfully",
      });

  });


  test("should return 409 when bus exists", async () => {

    busService.createBus.mockRejectedValue(
      new Error("Bus already exists")
    );


    await createBus(req, res);


    expect(res.status)
      .toHaveBeenCalledWith(409);


    expect(res.json)
      .toHaveBeenCalledWith({
        success: false,
        message: "Bus registration number already exists",
      });

  });


});