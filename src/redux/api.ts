import { appConfig } from '@/config/AppConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: appConfig.API_LOCAL+'/v1',
});

export const exampleApi = createApi({
    reducerPath: 'exampleApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        // getTheUsers: builder.query<User, {}>({
        //     query: () => `users`,
        // }),
    }),
});

// export const { useGetTheUsersQuery } = exampleApi;