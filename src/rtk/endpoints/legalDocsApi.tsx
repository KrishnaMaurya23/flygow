import api from "../services";

const legalDocsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLegalDocs: builder.query({
      query: ({
        type,
        faqId = -1,
        page = -1,
        limit = -1,
      }: {
        type: string;
        faqId: number | string;
        page: number;
        limit: number;
      }) => {
        const params = new URLSearchParams({ type });
        if (faqId !== -1) params.append("faqId", faqId.toString());
        if (page !== -1) params.append("page", page.toString());
        if (limit !== -1) params.append("limit", limit.toString());
        return {
          url: `/content-moderation/legal-docs?${params.toString()}`,
        };
      },
      providesTags: ["LegalDocs"],

    }),
    updateLegalDocs: builder.mutation({
      query: ({
        type,
        content,
        question,
        answer,
        faqId,
        isActive,
        page,
        limit,
      }: {
        type: string;
        content?: string;
        question?: string;
        answer?: string;
        faqId?: number | string;
        isActive?: boolean;
        page?: number;
        limit?: number;
      }) => {
        const body: any = { type };
        if (content !== undefined) body.content = content;
        if (question !== undefined) body.question = question;
        if (answer !== undefined) body.answer = answer;
        if (faqId !== undefined) body.faqId = faqId;
        if (isActive !== undefined) body.isActive = isActive;
        if (page !== undefined) body.page = page;
        if (limit !== undefined) body.limit = limit;
        return {
          url: `/content-moderation/legal-docs`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["LegalDocs"],
    }),
  }),
});

export const { useGetLegalDocsQuery, useUpdateLegalDocsMutation } = legalDocsApi;
