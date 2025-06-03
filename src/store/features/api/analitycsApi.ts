// src/store/features/api/analitycsApi.ts
import { apiSlice } from '../api/apiSlice'

export interface DashboardOverview {
  customers: number
  orders: number
  earnings: number
  productsSold: number
  customersPctChange: number
  ordersPctChange: number
  earningsPctChange: number
  productsPctChange: number
}
export interface CategorySalesEntry {
  id: string
  name: string
  sales: number
  itemsSold: number
  percentage: number
}
export interface PerformanceMetric {
  current: number
  previous: number
  pctChange: number
}
export interface PerformanceResponse {
  totalSales: PerformanceMetric
  orders: PerformanceMetric
  productsSold: PerformanceMetric
  variationsSold: PerformanceMetric
}

export interface CategorySalesResponse {
  period: 'Day' | 'Week' | 'Month' | '6 Months' | 'Year' | 'All'
  totalAll: number
  categories: CategorySalesEntry[]
}
export interface ProductAnalytics {
  id: string
  name: string
  image: string
  category: string
  price: number
  totalSold: number
  revenue: number
}
export interface ProductAnalyticsResponse {
  period: string
  sort: string
  products: ProductAnalytics[]
}
// Sales trend
export interface SalesTrendEntry {
  time: string
  sales: number
}
export interface SalesTrendResponse {
  period: string
  data: SalesTrendEntry[]
}

export const analitycsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // Dashboard overview (ya existente)
    getDashboardOverview: build.query<
      DashboardOverview,
      { period?: 'Day' | 'Week' | 'Month' | '6 Months' | 'Year' | 'All' }
    >({
      query: ({ period = 'Day' }) => ({
        url: `/analytics/overview?period=${encodeURIComponent(period)}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Analytics', id: 'Overview' }],
    }),
   getPerformance: build.query<
      PerformanceResponse,
      {
        start: string
        end: string
        compareStart: string
        compareEnd: string
      }
    >({
      query: ({ start, end, compareStart, compareEnd }) => ({
        url: `/analytics/performance` +
             `?start=${encodeURIComponent(start)}` +
             `&end=${encodeURIComponent(end)}` +
             `&compareStart=${encodeURIComponent(compareStart)}` +
             `&compareEnd=${encodeURIComponent(compareEnd)}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Analytics' as const, id: 'Performance' }],
    }),
   getProductAnalytics: build.query<
      ProductAnalyticsResponse,
      { sort: 'lowestSales' | 'highestSales' | 'lowestEarnings' | 'highestEarnings' }
    >({
      query: ({ sort = 'highestSales' }) => ({
        url: `/analytics/products?sort=${encodeURIComponent(sort)}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 300,
      providesTags: (result, _err, { sort }) => {
        // result?.products es el array de productos
        const products = result?.products ?? []
        return [
          { type: 'Analytics' as const, id: `Products_${sort}` },
          ...products.map(({ id }) => ({ type: 'Analytics' as const, id })),
        ]
      },
    }),
     getCategorySales: build.query<
      CategorySalesResponse,
      { period?: 'Day' | 'Week' | 'Month' | '6 Months' | 'Year' | 'All' }
    >({
      query: ({ period = 'Day' }) => ({
        url: `/analytics/categories-sales?period=${encodeURIComponent(period)}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'Analytics' as const, id: `CategoriesSales_${result.period}` },
              ...result.categories.map((c) => ({ type: 'Analytics' as const, id: c.id })),
            ]
          : [{ type: 'Analytics' as const, id: 'CategoriesSales' }],
    }),
      // 4. Sales trend
    getSalesTrend: build.query<
      SalesTrendResponse,
      { period?: 'Day' | 'Week' | 'Month' | '6 Months' | 'Year' | 'All' }
    >({
      query: ({ period = 'Day' }) => ({
        url: `/analytics/sales-trend?period=${encodeURIComponent(period)}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'Analytics' as const, id: `SalesTrend_${result.period}` }]
          : [{ type: 'Analytics' as const, id: 'SalesTrend' }],
    }),
  
  }),
  overrideExisting: false,
})

export const {
  useGetDashboardOverviewQuery,
  useGetProductAnalyticsQuery,
  useGetCategorySalesQuery,
  useGetSalesTrendQuery,
  useGetPerformanceQuery
} = analitycsApi
