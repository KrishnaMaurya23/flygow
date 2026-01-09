import api from "../services";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listContent: builder.query({
      query: ({
        sortOrder = "asc",
        page = 1,
        limit = 10,
        status = "all",
        search = "",
        confidenceScoreSort = "",
        categoryId = [],
      }) => {
        /* Build query‑string safely */
        const params = new URLSearchParams({
          sortOrder,
          page: String(page),
          limit: String(limit),
        });

        if (status !== "all") params.append("status", status);
        if (search !== "") params.append("search", search);
        if (confidenceScoreSort !== "all")
          params.append("confidenceScoreSort", confidenceScoreSort);
        if (categoryId.length > 0) params.append("categoryId", categoryId);

        return {
          url: `/content-moderation/content-library?${params.toString()}`,
        };
      },
      providesTags: ["ContentLibrary"],
    }),
    getContentDetail: builder.query({
      query: (id) => ({
        url: `/content-moderation/content-library-detail/${id}`,
      }),
      providesTags: ["ContentLibrary"],
    }),
    contentAction: builder.mutation({
      query: (body) => ({
        url: `/content-moderation/content-library-actions`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ContentLibrary"],
    }),
    getCategories: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => {
        let url = `/content-moderation/content-library-category?page=${page}&limit=${limit}`;
        if (search !== "") {
          url += `&search=${search}`;
        }
        return { url };
      },
    }),
    getTags: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => {
        let url = `/content-moderation/tags?page=${page}&limit=${limit}`;
        if (search !== "") {
          url += `&search=${search}`;
        }
        return { url };
      },
    }),
    editMetaData: builder.mutation({
      query: ({id,body}) => ({
        url: `/content-moderation/content-library-detail/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["ContentLibrary"],
    }),
    updateScrappingRules: builder.mutation({
      query: (body: {
        blockedKeywords: string[];
      }) => ({
        url: `/content-moderation/blocked-keywords`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ContentLibrary"],
    }),
    getScrappingRules: builder.query({
      query: () => ({
        url: `/admin/v1/content-moderation/scrapping-rules`,
      }),
      providesTags: ["ContentLibrary"],
    }),
    getBlockedKeywords: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/content-moderation/blocked-keywords?limit=${limit}&page=${page}`,
      }),
      providesTags: ["ContentLibrary"],
    }),
    deleteBlockedKeywords: builder.mutation({
      query: (body: { blockedKeywordIds: string[] }) => ({
        url: `/content-moderation/blocked-keywords`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["ContentLibrary"],
    }),
    getCategoryListing: builder.query({
      query: ({ page = 1, limit = 10, search = "", createdBy = "" }) => {
        let url = `/content-moderation/categories?page=${page}&limit=${limit}`;
        if (search !== "") {
          url += `&search=${search}`;
        }
        if (createdBy !== "") {
          url += `&createdBy=${createdBy}`;
        }
        return { url };
      },
      providesTags: ["ContentLibrary"],
    }),
    createCategory: builder.mutation({
      query: (body: { categoryName: string,subcategories: string[] }) => ({
        url: `/content-moderation/categories`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ContentLibrary"],
    }),
    getCategoryDetail: builder.query({
      query: (id: string) => ({
        url: `/content-moderation/categories/${id}`,
      }),
      providesTags: ["ContentLibrary"],
    }),
    createSubCategory: builder.mutation({
      query: (body: { categoryId: string, subCategoryName: string }) => ({
        url: `/content-moderation/categories/${body.categoryId}`,
        method: "PUT",
        body: { subcategory: { subcategoryName: body.subCategoryName } },
      }),
      invalidatesTags: ["ContentLibrary"],
    }),
    
    // New APIs for subcategory diseases management
    getSubcategoryDiseases: builder.query({
      query: ({ subcategoryId, page = 1, limit = 10, disease = "" }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (disease) params.append("disease", disease);
        
        return {
          url: `/content-moderation/subcategories/${subcategoryId}/diseases?${params.toString()}`,
        };
      },
      providesTags: ["ContentLibrary"],
    }),
    
    addDiseasesToSubcategory: builder.mutation({
      query: (body: {
        categoryId: string;
        subcategoryId: string;
        diseases: Array<{ diseaseName: string }>;
        filterParams: {
          minViews: number;
          minLikes: number;
        };
      }) => ({
        url: `/content-moderation/scrapping-videos`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ContentLibrary"],
    }),
    
    deleteDiseasesFromSubcategory: builder.mutation({
      query: ({ subcategoryId, diseaseIds }: { subcategoryId: string; diseaseIds: string[] }) => ({
        url: `/content-moderation/subcategories/${subcategoryId}/diseases`,
        method: "DELETE",
        body: { diseaseIds },
      }),
      invalidatesTags: ["ContentLibrary"],
    }),
    
    // Delete subcategory
    deleteSubcategory: builder.mutation({
      query: (subcategoryId: string) => ({
        url: `/content-moderation/subcategories/${subcategoryId}/delete`,
        method: "POST",
      }),
      invalidatesTags: ["ContentLibrary"],
    }),
    
    // Vetting Logs API
    getVettingLogs: builder.query({
      query: ({ page = 1, limit = 10, search = "", sort = "asc", status = "all" }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          sort,
        });
        if (search) params.append("search", search);
        if (status !== "all") params.append("status", status);
        
        return {
          url: `/content-moderation/vetting-logs?${params.toString()}`,
        };
      },
      providesTags: ["VettingLogs"],
    }),
  }),
});

export const {
  useListContentQuery,
  useGetContentDetailQuery,
  useContentActionMutation,
  useLazyGetCategoriesQuery,
  useLazyGetTagsQuery,
  useEditMetaDataMutation,
  useUpdateScrappingRulesMutation,
  useGetScrappingRulesQuery,
  useGetBlockedKeywordsQuery,
  useDeleteBlockedKeywordsMutation,
  useGetCategoryListingQuery,
  useCreateCategoryMutation,
  useGetCategoryDetailQuery,
  useCreateSubCategoryMutation,
  useGetSubcategoryDiseasesQuery,
  useAddDiseasesToSubcategoryMutation,
  useDeleteDiseasesFromSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetVettingLogsQuery,
} = userApi;
