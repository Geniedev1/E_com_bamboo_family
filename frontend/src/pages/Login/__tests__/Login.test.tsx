import React from "react";
import ReactRouter from "react-router";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import SocialButton from "../SocialButton/SocialButton";
import Login from "../Login";

window.scrollTo = jest.fn();

describe("Login", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADING);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ code: "test" });
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Login />);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
        expect(wrapper.find("h1").text()).toBe("Chào mừng trở lại");
        expect(wrapper.find("input#login-email").length).toEqual(1);
        expect(wrapper.find("input#login-password").length).toEqual(1);
        expect(wrapper.find(SocialButton).length).toEqual(1);
    });

    it("should render error message", () => {
        const mockErrorMessage = "Incorrect password or email";
        const mockState = { ...mockRootStore, auth: { ...mockRootStore.auth, error: mockErrorMessage } };
        const wrapper = mountWithStore(<Login />, mockState);
        expect(wrapper.text().includes(mockErrorMessage)).toBe(true);
    });

    it("should render success message", () => {
        const mockSuccessMessage = "Password successfully changed!";
        const mockState = { ...mockRootStore, user: { ...mockRootStore.user, successMessage: mockSuccessMessage } };
        const wrapper = mountWithStore(<Login />, mockState);
        expect(wrapper.text().includes(mockSuccessMessage)).toBe(true);
    });

    it("should submit login", () => {
        const wrapper = mountWithStore(<Login />);
        wrapper.find("input#login-email").simulate("change", { target: { value: "test_email@test.com" } });
        wrapper.find("input#login-password").simulate("change", { target: { value: "test_password" } });
        wrapper.find("form").simulate("submit");
        expect(mockDispatchFn).toHaveBeenCalledWith(expect.any(Function));
    });

    it("should unmount Login", () => {
        const wrapper = mountWithStore(<Login />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "auth/resetAuthState" });
    });
});
