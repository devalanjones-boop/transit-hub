jest.mock("../services/routeService");

const routeService = require("../services/routeService");

const {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} = require("../controllers/routeController");

describe("Route Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("createRoute", () => {
    it("should create a route successfully", async () => {
      req.body = { name: "Route A" };

      routeService.createRoute.mockResolvedValue(req.body);

      await createRoute(req, res);

      expect(routeService.createRoute).toHaveBeenCalledWith(req.body);

      expect(res.status).toHaveBeenCalledWith(201);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Route created successfully",
      });
    });

    it("should return 500 if service throws error", async () => {
      routeService.createRoute.mockRejectedValue(new Error("Database Error"));

      await createRoute(req, res);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Database Error",
      });
    });
  });

  describe("getAllRoutes", () => {
    it("should return all routes", async () => {
      const routes = [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
      ];

      routeService.getAllRoutes.mockResolvedValue(routes);

      await getAllRoutes(req, res);

      expect(routeService.getAllRoutes).toHaveBeenCalled();

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: routes,
      });
    });

    it("should return 500 on error", async () => {
      routeService.getAllRoutes.mockRejectedValue(new Error("DB Error"));

      await getAllRoutes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "DB Error",
      });
    });
  });

  describe("getRouteById", () => {
    it("should return route by id", async () => {
      req.params.id = "1";

      const route = {
        id: 1,
        name: "Route A",
      };

      routeService.getRouteById.mockResolvedValue(route);

      await getRouteById(req, res);

      expect(routeService.getRouteById).toHaveBeenCalledWith("1");

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: route,
      });
    });

    it("should return 404 if route not found", async () => {
      req.params.id = "1";

      routeService.getRouteById.mockResolvedValue(null);

      await getRouteById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Route not found",
      });
    });

    it("should return 500 on error", async () => {
      req.params.id = "1";

      routeService.getRouteById.mockRejectedValue(new Error("DB Error"));

      await getRouteById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "DB Error",
      });
    });
  });

  describe("updateRoute", () => {
    it("should update route successfully", async () => {
      req.params.id = "1";
      req.body = { name: "Updated Route" };

      routeService.updateRoute.mockResolvedValue({
        id: 1,
        name: "Updated Route",
      });

      await updateRoute(req, res);

      expect(routeService.updateRoute).toHaveBeenCalledWith("1", req.body);

      expect(res.json).toHaveBeenCalledWith({
        sucess: true,
        message: "Route updated successfully",
      });
    });

    it("should return 404 if route not found", async () => {
      req.params.id = "1";

      routeService.updateRoute.mockResolvedValue(null);

      await updateRoute(req, res);

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Route not found",
      });
    });

    it("should return 500 on error", async () => {
      req.params.id = "1";

      routeService.updateRoute.mockRejectedValue(new Error("DB Error"));

      await updateRoute(req, res);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "DB Error",
      });
    });
  });

  describe("deleteRoute", () => {
    it("should delete route successfully", async () => {
      req.params.id = "1";

      routeService.deleteRoute.mockResolvedValue(true);

      await deleteRoute(req, res);

      expect(routeService.deleteRoute).toHaveBeenCalledWith("1");

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Route deleted successfully",
      });
    });

    it("should return 404 if route not found", async () => {
      req.params.id = "1";

      routeService.deleteRoute.mockResolvedValue(null);

      await deleteRoute(req, res);

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Route not found",
      });
    });

    it("should return 500 on error", async () => {
      req.params.id = "1";

      routeService.deleteRoute.mockRejectedValue(new Error("DB Error"));

      await deleteRoute(req, res);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "DB Error",
      });
    });
  });
});
