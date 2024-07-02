import { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { IResponse } from "./IResponse";

export interface IPayloadActionFulFilled extends PayloadAction<IResponse, string, {
    arg: void;
    requestId: string;
    requestStatus: "fulfilled";
}, never> {}
