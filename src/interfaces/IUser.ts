import { EditorState, RawDraftContentState } from "draft-js";

export interface IUser {
    id?: string,
    name?: string,
    avatar?: string,
    phone_number?: string,
    email?: string,
    birthday?: string,
    gender?: number,
    address?: string,
    role? : IRole,
    role_id?: number,
    status?: number,
    password?: string,
    description?: RawDraftContentState | EditorState | string,
}

export interface IRole {
    id?: string,
    name?: string,
}
