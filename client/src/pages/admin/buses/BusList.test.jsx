import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";

import BusList from "./BusList";
import { getAllBuses } from "../../../services/busService";


vi.mock("../../../services/busService", () => ({

    getAllBuses: vi.fn(),
}));


describe("BusList - step 1", () => {

    beforeEach(() => {

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
                        busNumber: "KL01AB1234",
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

})