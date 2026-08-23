import { render, screen, cleanup } from "@testing-library/react"
import { describe, it, expect, vi, afterEach } from "vitest"
import userEvent from "@testing-library/user-event"

import BusDetails from "./BusDetails"

import { deleteBus, getBusById } from "../../../services/busService"
import { useNavigate, useParams } from "react-router-dom"

vi.mock("../../../services/busService", () => ({

    getBusById: vi.fn(),
    deleteBus: vi.fn(),

}))

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({

    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "123" }),

}))

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

describe("BusDetails", () => {

    it("should display loading state while fetching bus details", () => {

        getBusById.mockReturnValue(
            new Promise(() => { })
        );

        render(<BusDetails />);

        expect(
            screen.getByText("Loading Bus Details...")
        ).toBeInTheDocument();

    });

    it("should display bus details after fetching successfully", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "KL01AB1234",
                    busName: "Super Fast",
                    busType: "Express",
                    status: "Active",
                },
            },
        });

        render(<BusDetails />);

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

    it("should display error message when fetching bus details fails", async () => {

        getBusById.mockRejectedValue({
            response: {
                data: {
                    message: "Bus not found",
                },
            },
        });

        render(<BusDetails />);

        expect(
            await screen.findByText("Bus not found")
        ).toBeInTheDocument();

    });

    it("should navigate to bus list when back button is clicked", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "KL01AB1234",
                    busName: "Super Fast",
                    busType: "Express",
                    status: "Active",
                },
            },
        });

        const user = userEvent.setup();

        render(<BusDetails />);

        await screen.findByText("KL01AB1234");

        const backButton = screen.getByRole("button", {
            name: "← Back",
        });

        await user.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith("/admin/buses");

    });

    it("should navigate to edit bus page when edit button is clicked", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "KL01AB1234",
                    busName: "Super Fast",
                    busType: "Express",
                    status: "Active",
                },
            },
        });

        const user = userEvent.setup();

        render(<BusDetails />);

        await screen.findByText("KL01AB1234");

        const editButton = screen.getByRole("button", {
            name: /edit/i,
        });

        await user.click(editButton);

        expect(mockNavigate).toHaveBeenCalledWith(
            "/admin/buses/123/edit"
        );

    });

    it("should delete the bus when delete button is clicked", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "KL01AB1234",
                    busName: "Super Fast",
                    busType: "Express",
                    status: "Active",
                },
            },
        });

        deleteBus.mockResolvedValue({
            data: {
                message: "Bus deleted successfully",
            },
        });

        const user = userEvent.setup();

        render(<BusDetails />);

        await screen.findByText("KL01AB1234");

        const deleteButton = screen.getByRole("button", {
            name: /delete/i,
        });

        await user.click(deleteButton);

        expect(deleteBus).toHaveBeenCalledWith("123");

    });

    it("should display error message when delete bus fails", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "KL01AB1234",
                    busName: "Super Fast",
                    busType: "Express",
                    status: "Active",
                },
            },
        });

        deleteBus.mockRejectedValue({
            response: {
                data: {
                    message: "Failed to delete bus",
                },
            },
        });

        const user = userEvent.setup();

        render(<BusDetails />);

        await screen.findByText("KL01AB1234");

        const deleteButton = screen.getByRole("button", {
            name: /delete/i,
        });

        await user.click(deleteButton);

        expect(
            await screen.findByText("Failed to delete bus")
        ).toBeInTheDocument();

    });

})