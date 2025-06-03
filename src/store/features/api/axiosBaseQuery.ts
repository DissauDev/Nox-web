/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/features/api/axiosBaseQuery.ts
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

type AxiosBaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
};

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<AxiosBaseQueryArgs, unknown, { status: number; message: string }> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios.request({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (err) {
      const error = err as AxiosError;
      return {
        error: {
          status: error.response?.status ?? 500,
          // Suponemos que tu API envía { message: string } en el body de error
          message:
          //@ts-ignore
            (error.response?.data )?.message ??
            error.message ??
            'Unknown error',
        },
      };
    }
  };
