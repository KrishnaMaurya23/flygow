import api from "../services";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listUsers: builder.query({
      query: ({
        sortOrder = "asc",
        page = 1,
        limit = 10,
        status = "all",
        search = "",
      }) => {
        /* Build query‑string safely */
        const params = new URLSearchParams({
          sortOrder,
          page: String(page),
          limit: String(limit),
          adminUser: "false",
        });

        if (status !== "all") params.append("status", status);
        if (search !== "") params.append("search", search);

        return {
          url: `/admin/user/listing?${params.toString()}`,
        };
      },
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (userId) => ({
        url: `/admin/user/user-details/${userId}`,
      }),
      providesTags: ["User"],
    }),
    blockUnBlockUser: builder.mutation({
      query: (body: {
        userIds: string[];
        action: string;
        adminBlockedUnBlockedReason: string;
      }) => ({
        url: "/admin/user/block-unblock",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "Admin"],
    }),
    deleteReactiveUser: builder.mutation({
      query: (body: {
        userIds: string[];
        action: string;
        adminDeleteAndReactivateReason: string;
      }) => ({
        url: "/admin/user/delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "Admin"],
    }),
  }),
});

export const { useListUsersQuery, useGetUserQuery, useBlockUnBlockUserMutation, useDeleteReactiveUserMutation } = userApi;
