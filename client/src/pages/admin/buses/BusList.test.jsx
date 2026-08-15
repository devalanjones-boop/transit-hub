import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, waitFor, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event"

import BusList from "./BusList";
import { getAllBuses, deleteBus } from "../../../services/busService";


const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({

    useNavigate: () => mockNavigate,

}));

vi.mock("../../../services/busService", () => ({

    getAllBuses: vi.fn(),
    deleteBus: vi.fn(),

}));


describe("BusList - step 1", () => {

    beforeEach(() => {

        cleanup();

        vi.clearAllMocks();

    })

    it("should call getAllBuses when the page loads", async () => {

        getAllBuses.mockResolvedValue({

            data: {
                data: [],
            },
        })

        render(<BusList />);

        await waitFor(() => {

            expect(getAllBuses).toHaveBeenCalledTimes(1);
        })

    })

    it("should show loading while fetching buses", () => {

        getAllBuses.mockImplementation(
            () => new Promise(() => { })
        );

        render(<BusList />)

        expect(
            screen.getByText("Loading Buses...")
        ).toBeInTheDocument();

    })

    it("should handle succcessfull bus response", async () => {

        getAllBuses.mockResolvedValue({
            data: {
                data: [
                    {

                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                    },
                ],
            },
        })

        render(<BusList />)

        await waitFor(() => {

            expect(getAllBuses).toHaveBeenCalledTimes(1)

        })

        expect(
            screen.queryByText("failed to get buses")
        ).not.toBeInTheDocument();

    })

    it("should show error when fetching buses fails", async () => {

        getAllBuses.mockRejectedValue({
            response: {
                data: {
                    message: "Failed to get buses",
                },
            },
        }),

            render(<BusList />)

        expect(
            await screen.findByText("Failed to get buses")
        ).toBeInTheDocument();

    })

    it("should display bus data in the table", async () => {

        getAllBuses.mockResolvedValue({

            data: {
                data: [
                    {

                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },
        })

        render(<BusList />)

        const busRegNumber = await screen.findByText("KL01AB1234")

        expect(
            busRegNumber
        ).toBeInTheDocument()

        expect(
            screen.getAllByText("Super Fast").length
        ).toBeGreaterThan(0)

        expect(
            screen.getAllByText("Express").length
        ).toBeGreaterThan(0)

        expect(
            screen.getAllByText("Active").length
        ).toBeGreaterThan(0)

    })

    it("should display multiple buses in the table", async () => {

        getAllBuses.mockResolvedValue({

            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                    {
                        _id: "2",
                        busRegNumber: "KL02CD5678",
                        busName: "City Rider",
                        busType: "Ordinary",
                        status: "Inactive",
                    },
                ],
            },

        });

        render(<BusList />);

        expect(
            await screen.findByText("KL01AB1234")
        ).toBeInTheDocument();

        expect(
            screen.getByText("KL02CD5678")
        ).toBeInTheDocument();

        expect(
            screen.getAllByText("Super Fast").length
        ).toBeGreaterThan(0);

        expect(
            screen.getByText("City Rider")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Express")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Ordinary")
        ).toBeInTheDocument();

        expect(
            screen.getAllByText("Active").length
        ).toBeGreaterThan(0);

        expect(
            screen.getByText("Inactive")
        ).toBeInTheDocument();

    });

    it("should display no bus rows when bus list is empty", async () => {

        getAllBuses.mockResolvedValue({

            data: {
                data: [],
            },

        });

        render(<BusList />);

        await waitFor(() => {

            expect(getAllBuses).toHaveBeenCalledTimes(1);

        });

        expect(
            screen.queryByText("KL01AB1234")
        ).not.toBeInTheDocument();

    });

    it("should display all bus table headers", async () => {

        getAllBuses.mockResolvedValue({
            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },
        });

        render(<BusList />);

        expect(
            await screen.findByText("Bus Number")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Bus Name")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Bus Type")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Status")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Action")
        ).toBeInTheDocument();

    });

    it("should display action buttons for each bus", async () => {

        getAllBuses.mockResolvedValue({

            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },

        });

        render(<BusList />);

        // Wait until the bus data is displayed
        expect(
            await screen.findByText("KL01AB1234")
        ).toBeInTheDocument();

        // Check action buttons
        expect(
            screen.getByText("View")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Edit")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Delete")
        ).toBeInTheDocument();

    });

    it("should navigate to bus details when View button is clicked", async () => {

        getAllBuses.mockResolvedValue({

            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },

        });

        render(<BusList />);

        expect(
            await screen.findByText("KL01AB1234")
        ).toBeInTheDocument();

        const viewButton = screen.getByRole("button", {
            name: "View",
        });

        await userEvent.click(viewButton);

        expect(mockNavigate).toHaveBeenCalledWith(
            "/admin/buses/1"
        );

    });

    it("should navigate to bus edit page when Edit button is clicked", async () => {

        getAllBuses.mockResolvedValue({

            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },

        });

        render(<BusList />);

        expect(
            await screen.findByText("KL01AB1234")
        ).toBeInTheDocument();

        const editButton = screen.getByRole("button", {
            name: "Edit",
        });

        await userEvent.click(editButton);

        expect(mockNavigate).toHaveBeenCalledWith(
            "/admin/buses/1/edit"
        );

    });

    it("should display Delete button for each bus", async () => {

        getAllBuses.mockResolvedValue({

            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },

        });

        render(<BusList />);

        expect(
            await screen.findByText("KL01AB1234")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Delete")
        ).toBeInTheDocument();

    });

    it("should call deleteBus with the correct bus id", async () => {

        getAllBuses.mockResolvedValue({
            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },
        });

        deleteBus.mockResolvedValue({
            data: {
                message: "Bus deleted successfully",
            },
        });

        render(<BusList />);

        const deleteButton = await screen.findByRole("button", {
            name: "Delete",
        });

        await userEvent.click(deleteButton);

        expect(deleteBus).toHaveBeenCalledWith("1");

    });

    it("should show backend success message after deleting bus", async () => {

        getAllBuses.mockResolvedValue({
            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },
        });

        deleteBus.mockResolvedValue({
            data: {
                message: "Bus deleted successfully",
            },
        });

        const alertMock = vi
            .spyOn(window, "alert")
            .mockImplementation(() => { });

        render(<BusList />);

        const deleteButton = await screen.findByRole("button", {
            name: "Delete",
        });

        await userEvent.click(deleteButton);

        expect(alertMock).toHaveBeenCalledWith(
            "Bus deleted successfully"
        );

        alertMock.mockRestore();

    });

    it("should fetch buses again after successful deletion", async () => {

        getAllBuses
            .mockResolvedValueOnce({
                data: {
                    data: [
                        {
                            _id: "1",
                            busRegNumber: "KL01AB1234",
                            busName: "Super Fast",
                            busType: "Express",
                            status: "Active",
                        },
                    ],
                },
            })
            .mockResolvedValueOnce({
                data: {
                    data: [],
                },
            });

        deleteBus.mockResolvedValue({
            data: {
                message: "Bus deleted successfully",
            },
        });

        vi.spyOn(window, "alert")
            .mockImplementation(() => { });

        render(<BusList />);

        const deleteButton = await screen.findByRole("button", {
            name: "Delete",
        });

        await userEvent.click(deleteButton);

        await waitFor(() => {
            expect(getAllBuses).toHaveBeenCalledTimes(2);
        });

        window.alert.mockRestore();
    });

    it("should show backend error message when deleting bus fails", async () => {

        getAllBuses.mockResolvedValue({
            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },
        });

        deleteBus.mockRejectedValue({
            response: {
                data: {
                    message: "Bus cannot be deleted",
                },
            },
        });

        const alertMock = vi
            .spyOn(window, "alert")
            .mockImplementation(() => { });

        render(<BusList />);

        const deleteButton = await screen.findByRole("button", {
            name: "Delete",
        });

        await userEvent.click(deleteButton);

        expect(alertMock).toHaveBeenCalledWith(
            "Bus cannot be deleted"
        );

        expect(getAllBuses).toHaveBeenCalledTimes(1);

        alertMock.mockRestore();
    });

    it("should display empty state when no buses are available", async () => {
        getAllBuses.mockResolvedValue({
            data: {
                data: [],
            },
        });

        render(<BusList />);

        expect(
            await screen.findByText("No Buses Found")
        ).toBeInTheDocument();
    });

    it("should display bus details in the table", async () => {
        getAllBuses.mockResolvedValue({
            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },
        });

        render(<BusList />);

        expect(
            await screen.findByText("KL01AB1234")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Super Fast")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Express")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Active")
        ).toBeInTheDocument();
    });

    it("should display 10 buses on the first page", async () => {
        const buses = Array.from({ length: 12 }, (_, index) => ({
            _id: `${index + 1}`,
            busRegNumber: `KL01AB${index + 1}`,
            busName: `Bus ${index + 1}`,
            busType: "Express",
            status: "Active",
        }));

        getAllBuses.mockResolvedValue({
            data: {
                data: buses,
            },
        });

        render(<BusList />);

        expect(
            await screen.findByText("KL01AB1")
        ).toBeInTheDocument();

        expect(
            screen.getByText("KL01AB10")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("KL01AB11")
        ).not.toBeInTheDocument();

        expect(
            screen.queryByText("KL01AB12")
        ).not.toBeInTheDocument();
    });

    it("should display next page buses when Next button is clicked", async () => {
        const buses = Array.from({ length: 12 }, (_, index) => ({
            _id: `${index + 1}`,
            busRegNumber: `KL01AB${index + 1}`,
            busName: `Bus ${index + 1}`,
            busType: "Express",
            status: "Active",
        }));

        getAllBuses.mockResolvedValue({
            data: {
                data: buses,
            },
        });

        render(<BusList />);

        expect(
            await screen.findByText("KL01AB1")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("KL01AB11")
        ).not.toBeInTheDocument();

        const nextButton = screen.getByRole("button", {
            name: /next/i,
        });

        await userEvent.click(nextButton);

        expect(
            screen.getByText("KL01AB11")
        ).toBeInTheDocument();

        expect(
            screen.getByText("KL01AB12")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("KL01AB1")
        ).not.toBeInTheDocument();
    });

    it("should display previous page buses when Previous button is clicked", async () => {
        const buses = Array.from({ length: 12 }, (_, index) => ({
            _id: `${index + 1}`,
            busRegNumber: `KL01AB${index + 1}`,
            busName: `Bus ${index + 1}`,
            busType: "Express",
            status: "Active",
        }));

        getAllBuses.mockResolvedValue({
            data: {
                data: buses,
            },
        });

        render(<BusList />);

        // Wait for buses to render
        expect(
            await screen.findByText("KL01AB1")
        ).toBeInTheDocument();

        const nextButton = screen.getByRole("button", {
            name: /next/i,
        });

        await userEvent.click(nextButton);

        expect(
            screen.getByText("KL01AB11")
        ).toBeInTheDocument();

        const previousButton = screen.getByRole("button", {
            name: /previous/i,
        });

        await userEvent.click(previousButton);

        expect(
            screen.getByText("KL01AB1")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("KL01AB11")
        ).not.toBeInTheDocument();
    });

    it("should disable Previous on first page and Next on last page", async () => {
        const buses = Array.from({ length: 12 }, (_, index) => ({
            _id: `${index + 1}`,
            busRegNumber: `KL01AB${index + 1}`,
            busName: `Bus ${index + 1}`,
            busType: "Express",
            status: "Active",
        }));

        getAllBuses.mockResolvedValue({
            data: {
                data: buses,
            },
        });

        render(<BusList />);

        // Wait for buses to render
        expect(
            await screen.findByText("KL01AB1")
        ).toBeInTheDocument();

        const previousButton = screen.getByRole("button", {
            name: /previous/i,
        });

        const nextButton = screen.getByRole("button", {
            name: /next/i,
        });

        // Page 1
        expect(previousButton).toBeDisabled();
        expect(nextButton).not.toBeDisabled();

        // Move to page 2
        await userEvent.click(nextButton);

        // Page 2
        expect(previousButton).not.toBeDisabled();
        expect(nextButton).toBeDisabled();
    });

    it("should filter buses by bus number", async () => {

        getAllBuses.mockResolvedValue({
            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                    {
                        _id: "2",
                        busRegNumber: "KL02CD5678",
                        busName: "Fast Passenger",
                        busType: "Ordinary",
                        status: "Active",
                    },
                ],
            },
        });

        render(<BusList />);

        expect(
            await screen.findByText("KL01AB1234")
        ).toBeInTheDocument();

        const searchInput = screen.getByRole("textbox");

        await userEvent.type(searchInput, "KL01");

        expect(
            screen.getByText("KL01AB1234")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("KL02CD5678")
        ).not.toBeInTheDocument();

    });

    it("should filter buses by bus name", async () => {

        getAllBuses.mockResolvedValue({
            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                    {
                        _id: "2",
                        busRegNumber: "KL02CD5678",
                        busName: "Fast Passenger",
                        busType: "Ordinary",
                        status: "Active",
                    },
                ],
            },
        });

        render(<BusList />);

        expect(
            await screen.findByText("Super Fast")
        ).toBeInTheDocument();

        const searchInput = screen.getByRole("textbox");

        await userEvent.type(searchInput, "Super");

        expect(
            screen.getByText("Super Fast")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Fast Passenger")
        ).not.toBeInTheDocument();

    });

    it("should show no buses when search does not match", async () => {

        getAllBuses.mockResolvedValue({
            data: {
                data: [
                    {
                        _id: "1",
                        busRegNumber: "KL01AB1234",
                        busName: "Super Fast",
                        busType: "Express",
                        status: "Active",
                    },
                ],
            },
        });

        render(<BusList />);

        expect(
            await screen.findByText("KL01AB1234")
        ).toBeInTheDocument();

        const searchInput = screen.getByRole("textbox");

        await userEvent.type(searchInput, "XYZ");

        expect(
            screen.queryByText("KL01AB1234")
        ).not.toBeInTheDocument();

    });

})