import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { store } from "../../../store";
import { initialState } from "../orders-slice";
import { LoadingStatus } from "../../../types/types";
import {
    ADMIN_ORDER,
    ADMIN_ORDERS,
    API_BASE_URL,
    ORDER
} from "../../../constants/urlConstants";
import { mockOrders } from "../../../utils/test/__mocks__/orders-mock";
import {
    fetchAllUsersOrders,
    fetchUserOrders,
    fetchUserOrdersByEmail
} from "../orders-thunks";

describe("orders slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().orders;
    const mockEmail = "test123@test.com";

    beforeEach(() => {
        state = initialState;
    });

    it("should fetchUserOrders dispatches fulfilled on success", async () => {
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${ORDER}?page=1`).reply(200, mockOrders, {
            "page-total-count": "1",
            "page-total-elements": "11"
        });
        const result = await store.dispatch(fetchUserOrders(1));

        state = store.getState().orders;
        expect(result.type).toBe("orders/fetchUserOrders/fulfilled");
        expect(state.orders).toEqual(mockOrders);
        expect(state.pagesCount).toEqual(1);
        expect(state.totalElements).toEqual(11);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchAllUsersOrders dispatches fulfilled on success", async () => {
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${ADMIN_ORDERS}?page=1`).reply(200, mockOrders, {
            "page-total-count": "1",
            "page-total-elements": "11"
        });
        const result = await store.dispatch(fetchAllUsersOrders(1));

        state = store.getState().orders;
        expect(result.type).toBe("orders/fetchAllUsersOrders/fulfilled");
        expect(state.orders).toEqual(mockOrders);
        expect(state.pagesCount).toEqual(1);
        expect(state.totalElements).toEqual(11);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchUserOrdersByEmail dispatches fulfilled on success", async () => {
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${ADMIN_ORDER}/${mockEmail}?page=1`).reply(200, mockOrders, {
            "page-total-count": "1",
            "page-total-elements": "11"
        });
        const result = await store.dispatch(fetchUserOrdersByEmail({ email: mockEmail, page: 1 }));

        state = store.getState().orders;
        expect(result.type).toBe("orders/fetchUserOrdersByEmail/fulfilled");
        expect(state.orders).toEqual(mockOrders);
        expect(state.pagesCount).toEqual(1);
        expect(state.totalElements).toEqual(11);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });
});
