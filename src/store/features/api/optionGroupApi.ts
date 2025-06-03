/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/features/optionGroups/optionGroupApi.ts
import { OptionGroup, OptionValue } from '@/types/system';
import { apiSlice } from '../api/apiSlice';

export const optionGroupApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    // GRUPO DE OPCIONES

    // 1. Listar todos los grupos
    getOptionGroups: build.query<OptionGroup[], void>({
      query: () => ({ url: '/option-group', method: 'GET' }),
      providesTags: (result = []) => [
        { type: 'OptionGroup' as const, id: 'LIST' },
        //@ts-ignore
        ...result.map(({ groupId }) => ({ type: 'OptionGroup' as const, id: groupId })),
      ],
    }),

    // 2. Obtener un grupo por ID
    getOptionGroup: build.query<OptionGroup, string>({
      query: (groupId) => ({ url: `/option-group/${groupId}`, method: 'GET' }),
      providesTags: (_res, _err, groupId) => [{ type: 'OptionGroup' as const, id: groupId }],
    }),

    // 3. Crear grupo
    createOptionGroup: build.mutation<OptionGroup, Partial<OptionGroup>>({
      query: (newGroup) => ({
        url: '/option-group',
        method: 'POST',
        body: newGroup,
      }),
      invalidatesTags: [{ type: 'OptionGroup', id: 'LIST' }],
    }),

    // 4. Actualizar grupo
    updateOptionGroup: build.mutation<OptionGroup, OptionGroup>({
      //@ts-ignore
      query: ({ groupId, ...patch }) => ({
        url: `/option-group/${groupId}`,
        method: 'PUT',
        body: patch,
      }),
      //@ts-ignore
    invalidatesTags: (_res, _err, { groupId }) => [
      { type: 'OptionGroup', id: groupId },
      { type: 'OptionGroup', id: 'LIST' },
    ],
    }),

    // 5. Borrar grupo
    deleteOptionGroup: build.mutation<{ success: boolean; groupId: string }, string>({
      query: (groupId) => ({
        url: `/${groupId}`,           // tal como lo tienes en tu router
        method: 'DELETE',
      }),
       invalidatesTags: (_res, _err, groupId) => [
      { type: 'OptionGroup', id: groupId },
      { type: 'OptionGroup', id: 'LIST' },
    ],
    }),


    // VALORES DE OPCIÓN (dentro de cada grupo)

    // 6. Listar valores de un grupo
    getOptionValues: build.query<OptionValue[], string>({
      query: (groupId) => ({ url: `/option-group/${groupId}/values`, method: 'GET' }),

      providesTags: (result = [], _err, ) => [
        { type: 'OptionValue' as const, id: 'LIST' },
        //@ts-ignore
        ...result.map(({ valueId }) => ({ type: 'OptionValue' as const, id: valueId })),
      ],
    }),

    // 7. Obtener un valor por ID
    getOptionValue: build.query<OptionValue, { groupId: string; valueId: string }>({
      query: ({ groupId, valueId }) => ({
        url: `/option-group/${groupId}/values/${valueId}`,
        method: 'GET',
      }),
      providesTags: (_res, _err, { valueId }) => [{ type: 'OptionValue' as const, id: valueId }],
    }),

    // 8. Crear valor
    createOptionValue: build.mutation<OptionValue, { groupId: string; newValue: Partial<OptionValue> }>({
      query: ({ groupId, newValue }) => ({
        url: `/option-group/${groupId}/values`,
        method: 'POST',
        body: newValue,
      }),
      invalidatesTags: [{ type: 'OptionValue', id: 'LIST' }],
    }),
  // 9. Actualizar valor
    updateOptionValue: build.mutation<
      OptionValue,
      { groupId: string; valueId: string; data: Partial<OptionValue> }
    >({
      query: ({ groupId, valueId, data }) => ({
        url: `/option-group/${groupId}/values/${valueId}`,
        method: 'PUT',
        body:data,
      }),
      invalidatesTags: (_res, _err, { groupId, valueId }) => [
        { type: 'OptionValue' as const, id: valueId },
        { type: 'OptionValue', id: `LIST-${groupId}` },
      ],
    }),

    // 10. Borrar valor
    deleteOptionValue: build.mutation<{ success: boolean; valueId: string }, { groupId: string; valueId: string }>({
      query: ({ groupId, valueId }) => ({
        url: `/option-group/${groupId}/values/${valueId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { valueId }) => [
        { type: 'OptionValue' as const, id: valueId },
        { type: 'OptionValue', id: 'LIST' },
      ],
    }),

  }),
  overrideExisting: false,
});

// Hooks auto-generados
export const {
  useGetOptionGroupsQuery,
  useGetOptionGroupQuery,
  useCreateOptionGroupMutation,
  useUpdateOptionGroupMutation,
  useDeleteOptionGroupMutation,
  useGetOptionValuesQuery,
  useGetOptionValueQuery,
  useCreateOptionValueMutation,
  useUpdateOptionValueMutation,
  useDeleteOptionValueMutation,
} = optionGroupApi;
