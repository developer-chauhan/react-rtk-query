import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact } from '../models/contact.model';

export const contactsApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    tagTypes:['Contact'],
    endpoints:(builder) => ({
        contacts: builder.query<Contact[], void>({
            query: () => '/contacts',
            providesTags:['Contact']
        }),
        contact: builder.query<Contact, string>({
            query: (id) => `/contacts/${id}`,
            providesTags:['Contact']
        }),
        addContact: builder.mutation<void, Contact>({
            query: contact =>({
                url: '/contact',
                method:'POST',
                body:contact
            }),
            invalidatesTags:['Contact']
        }),
        updateContact: builder.mutation<void,Contact>({
            query:(id, ...rest)=>({
                url:`/contact/${id}`,
                method:'PUT',
                body: rest
            }),
            invalidatesTags:['Contact']
        }),
        deleteContact: builder.mutation<void,string>({
            query:(id)=>({
                url:`/contact/${id}`,
                method:'DELETE' 
            }),
            invalidatesTags:['Contact']
        })
    })
})

export const { useContactsQuery, useContactQuery, useAddContactMutation, useDeleteContactMutation, useUpdateContactMutation } = contactsApi;