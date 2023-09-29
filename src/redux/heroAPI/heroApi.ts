import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Hero } from '../../types/hero';

const baseURL = 'http://localhost:3000';

export const heroAPI = createApi({
  reducerPath: 'heroApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ['Hero'],
  endpoints: (builder) => ({
    getAllHeroes: builder.query<Hero[], number>({
       query: (limit: number = 10) => ({
        url: '/heroes',
        params: {
          _limit: limit,
        },
        method: 'GET'
       }),
       providesTags: () => ['Hero'],
    }),
    getHeroById: builder.query<Hero, string>({
      query: (id: string) => `/heroes/${id}`,
      providesTags: () => ['Hero'],
    }),
    createHero: builder.mutation<Hero, Omit<Hero, 'id'>>({
      query: (hero: Hero) => ({
        url: '/heroes',
        body: hero,
        method: 'POST',
      }),
      invalidatesTags: ['Hero'],
    }),
    updateHero: builder.mutation<Hero, Omit<Hero, 'id'>>({
      query: (hero: Hero) => ({
        url: `/heroes/${hero.id}`,
        method: 'PUT',
        body: hero,
      }),
      invalidatesTags: ['Hero'],
    }),
    deleteHero: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/heroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hero'],
    }),
  })
});

export const { 
  useGetAllHeroesQuery,
  useGetHeroByIdQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useUpdateHeroMutation,
} = heroAPI;