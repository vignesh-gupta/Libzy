import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URL } from '../utils/constants'


export const libServices = createApi({
  reducerPath: 'libServices',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['Book', 'User'],
  endpoints: (builder) => ({
    // ################ BOOK Services ###################
    getBooks: builder.query({
      query: () => `books`,
      providesTags: ['Book'],
    }),
    updateBook: builder.mutation({
      query: ({ body, bookId , method }) => ({
        url: `/books/${bookId}`,
        method: method ? method : 'PATCH',
        body,
        invalidatesTags: ['Book'],
      }),
    }),
    addBook: builder.mutation({
      query: (body) => ({
        url: `/books`,
        method: 'POST',
        body,
        invalidatesTags: ['Book'],
      }),
    }),
    // ################### User Services ###################
    getUsers: builder.query({
      query: () => `users`,
      providesTags: ['Users'],
    }),
    
    addNewUser: builder.mutation({
      query: (payload) => ({
        url: '/users',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Users', 'User'],
    }),
    updateUser: builder.mutation({
      query: ({ body, userId, method}) => ({
        url: `/users/${userId}`,
        method: method ? method : 'PATCH',
        body,
      }),
      invalidatesTags: ['Users', 'User'],
    }),

    // ################### Transcations ###################
    getTranscations : builder.query({
      query: () => `transactions`,
      providesTags: ['Transactions'],
    }),
    addNewTranscations: builder.mutation({
      query: (payload) => ({
        url: '/transactions',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Transactions'],
    }),
    updateTranscations: builder.mutation({
      query: ({ body, transactionsId }) => ({
        url: `/transactions/${transactionsId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Transactions'],
    }),
  }),
})

export const {
  useGetBooksQuery, useUpdateBookMutation,
  useDeleteBookMutation, useAddBookMutation, 
  useAddNewUserMutation, useUpdateUserMutation, 
  useGetTranscationsQuery , useAddNewTranscationsMutation,
  useUpdateTranscationsMutation, useGetUsersQuery
} = libServices