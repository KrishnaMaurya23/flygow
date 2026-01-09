import api from "../services";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listAdmins: builder.query({
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
          adminUser: "true",
        });

        if (status !== "all") params.append("status", status);
        if (search !== "") params.append("search", search);

        return {
          url: `/admin/user/listing?${params.toString()}`,
        };
      },
      providesTags: ["Admin"],
    }),
    getAdmin: builder.query({
      query: (userId) => ({
        url: `/admin/user/user-details/${userId}`,
      }),
      providesTags: ["Admin"],
    }),
    blockUnBlockAdmin: builder.mutation({
      query: (body: {
        userIds: string[];
        action: string;
        adminBlockedUnBlockedReason: string;
      }) => ({
        url: "/admin/user/block-unblock",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteReactiveAdmin: builder.mutation({
      query: (body: {
        userIds: string[];
        action: string;
        adminDeleteAndReactivateReason: string;
      }) => ({
        url: "/admin/user/delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    createAdmin: builder.mutation({
      query: (body: {
        fullName: string;
        email: string;
        role: number;
      }) => ({
        url: "/admin/user/create-sub-admin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    getUserRoles: builder.query({
      query: () => ({
        url: "/admin/user/user-roles",
      }),
    }),
    getAdminRole: builder.query({
      query: ({page, limit}) => ({
        url: `admin/user/roles?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Roles"],
    }),
    createAdminRole: builder.mutation({
      query: (body: {
        name: string;
        permissionIds: string[];
      }) => ({
        url: "/admin/user/roles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),
    updateAdminRole: builder.mutation({
      query: ({body, id}: {
        body: {
          name: string;
          permissionIds: string[];
        };
        id: string;
      }) => ({
        url: `/admin/user/roles/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),
    deleteAdminRole: builder.mutation({
      query: (id: string) => ({
        url: `/admin/user/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),
    getAdminRoleById: builder.query({
      query: (id: string) => ({
        url: `/admin/user/roles/${id}`,
      }),
    }),
  }),
});

export const {
  useListAdminsQuery,
  useGetAdminQuery,
  useBlockUnBlockAdminMutation,
  useDeleteReactiveAdminMutation,
  useCreateAdminMutation,
  useGetUserRolesQuery,
  useGetAdminRoleQuery,
  useCreateAdminRoleMutation,
  useUpdateAdminRoleMutation,
  useDeleteAdminRoleMutation,
  useGetAdminRoleByIdQuery,
} = adminApi;
