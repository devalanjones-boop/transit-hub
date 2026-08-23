import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

import CreateBus from "./CreateBus";
import { createBus } from "../../../services/busService";

// Mock react-router-dom
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));

// Mock bus service
vi.mock("../../../services/busService", () => ({
    createBus: vi.fn(),
}));

describe("CreateBus", () => {

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it("should render the create bus page", () => {

        render(<CreateBus />);

        expect(
            screen.getByRole("heading", { name: /create bus/i })
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
            screen.getByRole("combobox", { name: /bus type/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("combobox", { name: /status/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /create bus/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /back/i })
        ).toBeInTheDocument();

    });

    it("should show validation errors when form is submitted empty", async () => {

        render(<CreateBus />);

        const createButton = screen.getByRole("button", {
            name: /^create bus$/i
        });

        fireEvent.click(createButton);

        await waitFor(() => {

            expect(
                screen.getByText("Bus registration number is required")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Bus Name is Required")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Bus Type is required")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Bus Status is required")
            ).toBeInTheDocument();

        });

    });

    it("should create bus successfully and navigate to bus list", async () => {

        createBus.mockResolvedValue({
            data: {
                success: true,
                message: "Bus created successfully"
            }
        });

        render(<CreateBus />);

        fireEvent.change(
            screen.getByPlaceholderText(/enter bus registration number/i),
            {
                target: {
                    name: "busRegNumber",
                    value: "KL01AB1234"
                }
            }
        );

        fireEvent.change(
            screen.getByPlaceholderText(/enter bus name/i),
            {
                target: {
                    name: "busName",
                    value: "KSRTC"
                }
            }
        );

        fireEvent.change(
            screen.getByRole("combobox", { name: /bus type/i }),
            {
                target: {
                    name: "busType",
                    value: "ordinary"
                }
            }
        );

        fireEvent.change(
            screen.getByRole("combobox", { name: /status/i }),
            {
                target: {
                    name: "status",
                    value: "active"
                }
            }
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /^create bus$/i
            })
        );

        await waitFor(() => {

            expect(createBus).toHaveBeenCalledWith({
                busRegNumber: "KL01AB1234",
                busName: "KSRTC",
                busType: "ordinary",
                status: "active"
            });

            expect(mockNavigate).toHaveBeenCalledWith("/admin/buses");

        });

    });

    it("should display backend error when bus creation fails", async () => {
        createBus.mockRejectedValue({
            response: {
                data: {
                    message: "Bus already exists",
                },
            },
        });

        render(<CreateBus />);

        // Fill the form
        await userEvent.type(
            screen.getByLabelText(/bus registration number/i),
            "KL01AB1234"
        );

        await userEvent.type(
            screen.getByLabelText(/bus name/i),
            "KSRTC"
        );

        await userEvent.selectOptions(
            screen.getByLabelText(/bus type/i),
            "ordinary"
        );

        await userEvent.selectOptions(
            screen.getByLabelText(/status/i),
            "active"
        );

        await userEvent.click(
            screen.getByRole("button", { name: /create bus/i })
        );

        expect(
            await screen.findByText("Bus already exists")
        ).toBeInTheDocument();
    });

    it("should disable create button and show Creating while submitting", async () => {

        createBus.mockImplementation(() => new Promise(() => { }));

        render(<CreateBus />);

        fireEvent.change(
            screen.getByPlaceholderText(/enter bus registration number/i),
            {
                target: {
                    name: "busRegNumber",
                    value: "KL01AB1234"
                }
            }
        );

        fireEvent.change(
            screen.getByPlaceholderText(/enter bus name/i),
            {
                target: {
                    name: "busName",
                    value: "KSRTC"
                }
            }
        );

        fireEvent.change(
            screen.getByRole("combobox", { name: /bus type/i }),
            {
                target: {
                    name: "busType",
                    value: "ordinary"
                }
            }
        );

        fireEvent.change(
            screen.getByRole("combobox", { name: /status/i }),
            {
                target: {
                    name: "status",
                    value: "active"
                }
            }
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /^create bus$/i
            })
        );

        await waitFor(() => {

            const createButton = screen.getByRole("button", {
                name: /creating/i
            });

            expect(createButton).toBeDisabled();

        });

    });

})