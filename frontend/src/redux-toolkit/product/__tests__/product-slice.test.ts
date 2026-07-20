import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { LoadingStatus } from "../../../types/types";
import { API_BASE_URL, PRODUCTS, REVIEW } from "../../../constants/urlConstants";
import { store } from "../../../store";
import { initialState } from "../product-slice";
import { mockFullProductResponse, mockReviews } from "../../../utils/test/__mocks__/products-mock";
import { fetchProduct, fetchReviewsByProductId } from "../product-thunks";

describe("product slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().product;

    beforeEach(() => {
        state = initialState;
    });

    it("should fetchProduct dispatches fulfilled on success", async () => {
        expect(state.product).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${PRODUCTS}/34`).reply(200, mockFullProductResponse);
        const result = await store.dispatch(fetchProduct("34"));

        state = store.getState().product;
        expect(result.type).toBe("product/fetchProduct/fulfilled");
        expect(state.product).toEqual(mockFullProductResponse);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchProduct dispatches rejected on failure", async () => {
        expect(state.errorMessage).toEqual("");
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${PRODUCTS}/34`).reply(400, "ERROR");
        const result = await store.dispatch(fetchProduct("34"));

        state = store.getState().product;
        expect(result.type).toBe("product/fetchProduct/rejected");
        expect(state.errorMessage).toEqual("ERROR");
        expect(state.loadingState).toEqual(LoadingStatus.ERROR);
    });

    it("should fetchReviewsByProductId dispatches fulfilled on success", async () => {
        expect(state.reviews).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${REVIEW}/34`).reply(200, mockReviews);
        const result = await store.dispatch(fetchReviewsByProductId("34"));

        state = store.getState().product;
        expect(result.type).toBe("product/fetchReviewsByProductId/fulfilled");
        expect(state.reviews).toEqual(mockReviews);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });
});
