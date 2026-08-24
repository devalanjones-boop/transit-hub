import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

import UpdateBus from "./UpdateBus";
import { useNavigate, useParams } from "react-router-dom";
import { getBusById, updateBus } from "../../../services/busService";

const mockNavigate = vi.fn();

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
    useParams: () => ({
        id: "123",
    }),
    useNavigate: () => mockNavigate,
}));

// Mock bus service
vi.mock("../../../services/busService", () => ({
    getBusById: vi.fn(),
    updateBus: vi.fn(),
}));

describe("UpdateBus", () => {

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it("should render the update bus page", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "KL01AB1234",
                    busName: "City Express",
                    busType: "ordinary",
                    status: "active",
                },
            },
        });

        render(<UpdateBus />);

        expect(
            await screen.findByRole("heading", {
                name: /update bus/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText(
                /enter bus registration number/i
            )
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText(
                /enter bus name/i
            )
        ).toBeInTheDocument();

        expect(
            screen.getAllByRole("combobox")
        ).toHaveLength(2);

        expect(
            screen.getByRole("button", {
                name: /update bus/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /back/i,
            })
        ).toBeInTheDocument();

    });

    it("should fetch bus by id", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "KL01AB1234",
                    busName: "City Express",
                    busType: "ordinary",
                    status: "active",
                },
            },
        });

        render(<UpdateBus />);

        await screen.findByRole("heading", {
            name: /update bus/i,
        });

        expect(getBusById).toHaveBeenCalledTimes(1);

        expect(getBusById).toHaveBeenCalledWith("123");

    });

    it("should populate the form with existing bus data", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "KL01AB1234",
                    busName: "City Express",
                    busType: "ordinary",
                    status: "active",
                },
            },
        });

        render(<UpdateBus />);

        const registrationInput = await screen.findByPlaceholderText(
            /enter bus registration number/i
        );

        const busNameInput = screen.getByPlaceholderText(
            /enter bus name/i
        );

        expect(registrationInput).toHaveValue("KL01AB1234");

        expect(busNameInput).toHaveValue("City Express");

    });

    it("should show validation errors when form is submitted empty", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "",
                    busName: "",
                    busType: "",
                    status: "",
                },
            },
        });

        render(<UpdateBus />);

        const updateButton = await screen.findByRole("button", {
            name: /^update bus$/i,
        });

        fireEvent.click(updateButton);

        await waitFor(() => {

            expect(
                screen.getByText("Bus registration number is required")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Bus name is required")
            ).toBeInTheDocument();

        });

    });

    it("should update bus successfully and navigate to bus list", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "KL01AB1234",
                    busName: "City Express",
                    busType: "ordinary",
                    status: "active",
                },
            },
        });

        updateBus.mockResolvedValue({
            data: {
                message: "Bus updated successfully",
            },
        });

        render(<UpdateBus />);

        const registrationInput = await screen.findByPlaceholderText(
            /enter bus registration number/i
        );

        const busNameInput = screen.getByPlaceholderText(
            /enter bus name/i
        );

        fireEvent.change(registrationInput, {
            target: {
                value: "KL01AB9999",
            },
        });

        fireEvent.change(busNameInput, {
            target: {
                value: "Updated City Express",
            },
        });

        const updateButton = screen.getByRole("button", {
            name: /^update bus$/i,
        });

        fireEvent.click(updateButton);

        await waitFor(() => {

            expect(updateBus).toHaveBeenCalledTimes(1);

            expect(updateBus).toHaveBeenCalledWith(
                "123",
                {
                    busRegNumber: "KL01AB9999",
                    busName: "Updated City Express",
                    busType: "ordinary",
                    status: "active",
                }
            );

            expect(mockNavigate).toHaveBeenCalledWith(
                "/admin/buses"
            );

        });

    });

    it("should display backend error when update bus fails", async () => {

        getBusById.mockResolvedValue({
            data: {
                data: {
                    busRegNumber: "KL01AB1234",
                    busName: "City Express",
                    busType: "ordinary",
                    status: "active",
                },
            },
        });

        updateBus.mockRejectedValue({
            response: {
                data: {
                    message: "Bus registration number already exists",
                },
            },
        });

        render(<UpdateBus />);

        const updateButton = await screen.findByRole("button", {
            name: /^update bus$/i,
        });

        fireEvent.click(updateButton);

        expect(
            await screen.findByText(
                "Bus registration number already exists"
            )
        ).toBeInTheDocument();

        expect(mockNavigate).not.toHaveBeenCalled();

    });

})