
import { apiSlice } from '../api/apiSlice'

interface Image {
  filename: string
  url: string
}

interface GetImagesResponse {
  images: Image[]
}

interface GetImageDetailsResponse {
  filename: string
  url: string
  size: number
  createdAt: string
}

interface UploadImageResponse {
  message: string
  image: Image
}

interface DeleteImageResponse {
  message: string
}

interface UpdateImageResponse {
  message: string
  image: Image
}

export const uploadApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    // GET /upload/getImages
    getImages: build.query<GetImagesResponse, void>({
      query: () => '/upload/getImages',
      providesTags: ['Images'],
    }),

    // GET /upload/:filename
    getImageDetails: build.query<GetImageDetailsResponse, string>({
      query: (filename) => `/upload/${filename}`,
      providesTags: (result, error, filename) => [{ type: 'Images', id: filename }],
    }),

    // POST /upload/create
    uploadImage: build.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: '/upload/create',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Images'],
    }),

    // DELETE /upload/:filename
    deleteImage: build.mutation<DeleteImageResponse, string>({
      query: (filename) => ({
        url: `/upload/${filename}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Images'],
    }),

    // PUT /upload/:filename
    updateImage: build.mutation<
      UpdateImageResponse,
      { filename: string; formData: FormData }
    >({
      query: ({ filename, formData }) => ({
        url: `/upload/${filename}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { filename }) => [
        { type: 'Images', id: filename },
        'Images',
      ],
    }),
  }),
})

export const {
  useGetImagesQuery,
  useGetImageDetailsQuery,
  useUploadImageMutation,
  useDeleteImageMutation,
  useUpdateImageMutation,
} = uploadApi
