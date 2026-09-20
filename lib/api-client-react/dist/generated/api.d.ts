import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AdminStats, CreateMenuItemBody, CreateOrderBody, CreateProviderBody, DashboardStats, DeliveryPartner, HealthCheckResponse, ListAdminProvidersParams, ListAdminProvidersResponse, ListCitiesByCountryResponse, ListCountriesResponse, ListMenuItemsResponse, ListNotificationsResponse, ListOrdersResponse, ListProvidersParams, ListProvidersResponse, LoginUserBody, LogoutUser200, MarkAllNotificationsReadResponse, MenuItem, Notification, Order, Provider, ProviderStats, RegisterDeliveryPartnerBody, RegisterUserBody, UpdateDeliveryStatusBody, UpdateMeBody, UpdateMenuItemBody, UpdateOrderStatusBody, UpdateProviderBody, UpdateProviderSubscriptionBody, User, VerifyProviderBody } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: Parameters<typeof customFetch>[1]) => Promise<HealthCheckResponse>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getRegisterUserUrl: () => string;
/**
 * @summary Register a new user
 */
export declare const registerUser: (registerUserBody: RegisterUserBody, options?: Parameters<typeof customFetch>[1]) => Promise<User>;
export declare const getRegisterUserMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof registerUser>>, TError, {
        data: BodyType<RegisterUserBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof registerUser>>, TError, {
    data: BodyType<RegisterUserBody>;
}, TContext>;
export type RegisterUserMutationResult = NonNullable<Awaited<ReturnType<typeof registerUser>>>;
export type RegisterUserMutationBody = BodyType<RegisterUserBody>;
export type RegisterUserMutationError = ErrorType<unknown>;
/**
* @summary Register a new user
*/
export declare const useRegisterUser: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof registerUser>>, TError, {
        data: BodyType<RegisterUserBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof registerUser>>, TError, {
    data: BodyType<RegisterUserBody>;
}, TContext>;
export declare const getLoginUserUrl: () => string;
/**
 * @summary Log in
 */
export declare const loginUser: (loginUserBody: LoginUserBody, options?: Parameters<typeof customFetch>[1]) => Promise<User>;
export declare const getLoginUserMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof loginUser>>, TError, {
        data: BodyType<LoginUserBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof loginUser>>, TError, {
    data: BodyType<LoginUserBody>;
}, TContext>;
export type LoginUserMutationResult = NonNullable<Awaited<ReturnType<typeof loginUser>>>;
export type LoginUserMutationBody = BodyType<LoginUserBody>;
export type LoginUserMutationError = ErrorType<unknown>;
/**
* @summary Log in
*/
export declare const useLoginUser: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof loginUser>>, TError, {
        data: BodyType<LoginUserBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof loginUser>>, TError, {
    data: BodyType<LoginUserBody>;
}, TContext>;
export declare const getLogoutUserUrl: () => string;
/**
 * @summary Log out
 */
export declare const logoutUser: (options?: Parameters<typeof customFetch>[1]) => Promise<LogoutUser200>;
export declare const getLogoutUserMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof logoutUser>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof logoutUser>>, TError, void, TContext>;
export type LogoutUserMutationResult = NonNullable<Awaited<ReturnType<typeof logoutUser>>>;
export type LogoutUserMutationError = ErrorType<unknown>;
/**
* @summary Log out
*/
export declare const useLogoutUser: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof logoutUser>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof logoutUser>>, TError, void, TContext>;
export declare const getGetMeUrl: () => string;
/**
 * @summary Get current user
 */
export declare const getMe: (options?: Parameters<typeof customFetch>[1]) => Promise<User>;
export declare const getGetMeQueryKey: () => readonly ["/api/auth/me"];
export declare const getGetMeQueryOptions: <TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMeQueryResult = NonNullable<Awaited<ReturnType<typeof getMe>>>;
export type GetMeQueryError = ErrorType<unknown>;
/**
 * @summary Get current user
 */
export declare function useGetMe<TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateMeUrl: () => string;
/**
 * @summary Update current user profile
 */
export declare const updateMe: (updateMeBody: UpdateMeBody, options?: Parameters<typeof customFetch>[1]) => Promise<User>;
export declare const getUpdateMeMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMe>>, TError, {
        data: BodyType<UpdateMeBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateMe>>, TError, {
    data: BodyType<UpdateMeBody>;
}, TContext>;
export type UpdateMeMutationResult = NonNullable<Awaited<ReturnType<typeof updateMe>>>;
export type UpdateMeMutationBody = BodyType<UpdateMeBody>;
export type UpdateMeMutationError = ErrorType<unknown>;
/**
* @summary Update current user profile
*/
export declare const useUpdateMe: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMe>>, TError, {
        data: BodyType<UpdateMeBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateMe>>, TError, {
    data: BodyType<UpdateMeBody>;
}, TContext>;
export declare const getListCountriesUrl: () => string;
/**
 * @summary List countries
 */
export declare const listCountries: (options?: Parameters<typeof customFetch>[1]) => Promise<ListCountriesResponse>;
export declare const getListCountriesQueryKey: () => readonly ["/api/countries"];
export declare const getListCountriesQueryOptions: <TData = Awaited<ReturnType<typeof listCountries>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCountries>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCountries>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCountriesQueryResult = NonNullable<Awaited<ReturnType<typeof listCountries>>>;
export type ListCountriesQueryError = ErrorType<unknown>;
/**
 * @summary List countries
 */
export declare function useListCountries<TData = Awaited<ReturnType<typeof listCountries>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCountries>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListCitiesByCountryUrl: (countryId: number) => string;
/**
 * @summary List cities in a country
 */
export declare const listCitiesByCountry: (countryId: number, options?: Parameters<typeof customFetch>[1]) => Promise<ListCitiesByCountryResponse>;
export declare const getListCitiesByCountryQueryKey: (countryId: number) => readonly [`/api/countries/${number}/cities`];
export declare const getListCitiesByCountryQueryOptions: <TData = Awaited<ReturnType<typeof listCitiesByCountry>>, TError = ErrorType<unknown>>(countryId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCitiesByCountry>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCitiesByCountry>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCitiesByCountryQueryResult = NonNullable<Awaited<ReturnType<typeof listCitiesByCountry>>>;
export type ListCitiesByCountryQueryError = ErrorType<unknown>;
/**
 * @summary List cities in a country
 */
export declare function useListCitiesByCountry<TData = Awaited<ReturnType<typeof listCitiesByCountry>>, TError = ErrorType<unknown>>(countryId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCitiesByCountry>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListProvidersUrl: (params?: ListProvidersParams) => string;
/**
 * @summary List verified providers
 */
export declare const listProviders: (params?: ListProvidersParams, options?: Parameters<typeof customFetch>[1]) => Promise<ListProvidersResponse>;
export declare const getListProvidersQueryKey: (params?: ListProvidersParams) => readonly ["/api/providers", ...ListProvidersParams[]];
export declare const getListProvidersQueryOptions: <TData = Awaited<ReturnType<typeof listProviders>>, TError = ErrorType<unknown>>(params?: ListProvidersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProviders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProviders>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProvidersQueryResult = NonNullable<Awaited<ReturnType<typeof listProviders>>>;
export type ListProvidersQueryError = ErrorType<unknown>;
/**
 * @summary List verified providers
 */
export declare function useListProviders<TData = Awaited<ReturnType<typeof listProviders>>, TError = ErrorType<unknown>>(params?: ListProvidersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProviders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateProviderUrl: () => string;
/**
 * @summary Create provider profile
 */
export declare const createProvider: (createProviderBody: CreateProviderBody, options?: Parameters<typeof customFetch>[1]) => Promise<Provider>;
export declare const getCreateProviderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProvider>>, TError, {
        data: BodyType<CreateProviderBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createProvider>>, TError, {
    data: BodyType<CreateProviderBody>;
}, TContext>;
export type CreateProviderMutationResult = NonNullable<Awaited<ReturnType<typeof createProvider>>>;
export type CreateProviderMutationBody = BodyType<CreateProviderBody>;
export type CreateProviderMutationError = ErrorType<unknown>;
/**
* @summary Create provider profile
*/
export declare const useCreateProvider: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProvider>>, TError, {
        data: BodyType<CreateProviderBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createProvider>>, TError, {
    data: BodyType<CreateProviderBody>;
}, TContext>;
export declare const getGetMyProviderUrl: () => string;
/**
 * @summary Get my provider profile
 */
export declare const getMyProvider: (options?: Parameters<typeof customFetch>[1]) => Promise<Provider>;
export declare const getGetMyProviderQueryKey: () => readonly ["/api/providers/me"];
export declare const getGetMyProviderQueryOptions: <TData = Awaited<ReturnType<typeof getMyProvider>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMyProvider>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMyProvider>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMyProviderQueryResult = NonNullable<Awaited<ReturnType<typeof getMyProvider>>>;
export type GetMyProviderQueryError = ErrorType<unknown>;
/**
 * @summary Get my provider profile
 */
export declare function useGetMyProvider<TData = Awaited<ReturnType<typeof getMyProvider>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMyProvider>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetProviderUrl: (providerId: number) => string;
/**
 * @summary Get provider by ID
 */
export declare const getProvider: (providerId: number, options?: Parameters<typeof customFetch>[1]) => Promise<Provider>;
export declare const getGetProviderQueryKey: (providerId: number) => readonly [`/api/providers/${number}`];
export declare const getGetProviderQueryOptions: <TData = Awaited<ReturnType<typeof getProvider>>, TError = ErrorType<unknown>>(providerId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProvider>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProvider>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProviderQueryResult = NonNullable<Awaited<ReturnType<typeof getProvider>>>;
export type GetProviderQueryError = ErrorType<unknown>;
/**
 * @summary Get provider by ID
 */
export declare function useGetProvider<TData = Awaited<ReturnType<typeof getProvider>>, TError = ErrorType<unknown>>(providerId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProvider>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateProviderUrl: (providerId: number) => string;
/**
 * @summary Update provider
 */
export declare const updateProvider: (providerId: number, updateProviderBody: UpdateProviderBody, options?: Parameters<typeof customFetch>[1]) => Promise<Provider>;
export declare const getUpdateProviderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProvider>>, TError, {
        providerId: number;
        data: BodyType<UpdateProviderBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateProvider>>, TError, {
    providerId: number;
    data: BodyType<UpdateProviderBody>;
}, TContext>;
export type UpdateProviderMutationResult = NonNullable<Awaited<ReturnType<typeof updateProvider>>>;
export type UpdateProviderMutationBody = BodyType<UpdateProviderBody>;
export type UpdateProviderMutationError = ErrorType<unknown>;
/**
* @summary Update provider
*/
export declare const useUpdateProvider: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProvider>>, TError, {
        providerId: number;
        data: BodyType<UpdateProviderBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateProvider>>, TError, {
    providerId: number;
    data: BodyType<UpdateProviderBody>;
}, TContext>;
export declare const getGetProviderStatsUrl: (providerId: number) => string;
/**
 * @summary Get provider stats
 */
export declare const getProviderStats: (providerId: number, options?: Parameters<typeof customFetch>[1]) => Promise<ProviderStats>;
export declare const getGetProviderStatsQueryKey: (providerId: number) => readonly [`/api/providers/${number}/stats`];
export declare const getGetProviderStatsQueryOptions: <TData = Awaited<ReturnType<typeof getProviderStats>>, TError = ErrorType<unknown>>(providerId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProviderStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProviderStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProviderStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getProviderStats>>>;
export type GetProviderStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get provider stats
 */
export declare function useGetProviderStats<TData = Awaited<ReturnType<typeof getProviderStats>>, TError = ErrorType<unknown>>(providerId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProviderStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListMenuItemsUrl: (providerId: number) => string;
/**
 * @summary List menu items
 */
export declare const listMenuItems: (providerId: number, options?: Parameters<typeof customFetch>[1]) => Promise<ListMenuItemsResponse>;
export declare const getListMenuItemsQueryKey: (providerId: number) => readonly [`/api/providers/${number}/menu`];
export declare const getListMenuItemsQueryOptions: <TData = Awaited<ReturnType<typeof listMenuItems>>, TError = ErrorType<unknown>>(providerId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMenuItems>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMenuItems>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMenuItemsQueryResult = NonNullable<Awaited<ReturnType<typeof listMenuItems>>>;
export type ListMenuItemsQueryError = ErrorType<unknown>;
/**
 * @summary List menu items
 */
export declare function useListMenuItems<TData = Awaited<ReturnType<typeof listMenuItems>>, TError = ErrorType<unknown>>(providerId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMenuItems>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateMenuItemUrl: (providerId: number) => string;
/**
 * @summary Create menu item
 */
export declare const createMenuItem: (providerId: number, createMenuItemBody: CreateMenuItemBody, options?: Parameters<typeof customFetch>[1]) => Promise<MenuItem>;
export declare const getCreateMenuItemMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMenuItem>>, TError, {
        providerId: number;
        data: BodyType<CreateMenuItemBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createMenuItem>>, TError, {
    providerId: number;
    data: BodyType<CreateMenuItemBody>;
}, TContext>;
export type CreateMenuItemMutationResult = NonNullable<Awaited<ReturnType<typeof createMenuItem>>>;
export type CreateMenuItemMutationBody = BodyType<CreateMenuItemBody>;
export type CreateMenuItemMutationError = ErrorType<unknown>;
/**
* @summary Create menu item
*/
export declare const useCreateMenuItem: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMenuItem>>, TError, {
        providerId: number;
        data: BodyType<CreateMenuItemBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createMenuItem>>, TError, {
    providerId: number;
    data: BodyType<CreateMenuItemBody>;
}, TContext>;
export declare const getUpdateMenuItemUrl: (itemId: number) => string;
/**
 * @summary Update menu item
 */
export declare const updateMenuItem: (itemId: number, updateMenuItemBody: UpdateMenuItemBody, options?: Parameters<typeof customFetch>[1]) => Promise<MenuItem>;
export declare const getUpdateMenuItemMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMenuItem>>, TError, {
        itemId: number;
        data: BodyType<UpdateMenuItemBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateMenuItem>>, TError, {
    itemId: number;
    data: BodyType<UpdateMenuItemBody>;
}, TContext>;
export type UpdateMenuItemMutationResult = NonNullable<Awaited<ReturnType<typeof updateMenuItem>>>;
export type UpdateMenuItemMutationBody = BodyType<UpdateMenuItemBody>;
export type UpdateMenuItemMutationError = ErrorType<unknown>;
/**
* @summary Update menu item
*/
export declare const useUpdateMenuItem: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMenuItem>>, TError, {
        itemId: number;
        data: BodyType<UpdateMenuItemBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateMenuItem>>, TError, {
    itemId: number;
    data: BodyType<UpdateMenuItemBody>;
}, TContext>;
export declare const getDeleteMenuItemUrl: (itemId: number) => string;
/**
 * @summary Delete menu item
 */
export declare const deleteMenuItem: (itemId: number, options?: Parameters<typeof customFetch>[1]) => Promise<void>;
export declare const getDeleteMenuItemMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMenuItem>>, TError, {
        itemId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteMenuItem>>, TError, {
    itemId: number;
}, TContext>;
export type DeleteMenuItemMutationResult = NonNullable<Awaited<ReturnType<typeof deleteMenuItem>>>;
export type DeleteMenuItemMutationError = ErrorType<unknown>;
/**
* @summary Delete menu item
*/
export declare const useDeleteMenuItem: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMenuItem>>, TError, {
        itemId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteMenuItem>>, TError, {
    itemId: number;
}, TContext>;
export declare const getListOrdersUrl: () => string;
/**
 * @summary List orders
 */
export declare const listOrders: (options?: Parameters<typeof customFetch>[1]) => Promise<ListOrdersResponse>;
export declare const getListOrdersQueryKey: () => readonly ["/api/orders"];
export declare const getListOrdersQueryOptions: <TData = Awaited<ReturnType<typeof listOrders>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListOrdersQueryResult = NonNullable<Awaited<ReturnType<typeof listOrders>>>;
export type ListOrdersQueryError = ErrorType<unknown>;
/**
 * @summary List orders
 */
export declare function useListOrders<TData = Awaited<ReturnType<typeof listOrders>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateOrderUrl: () => string;
/**
 * @summary Create order
 */
export declare const createOrder: (createOrderBody: CreateOrderBody, options?: Parameters<typeof customFetch>[1]) => Promise<Order>;
export declare const getCreateOrderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
        data: BodyType<CreateOrderBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
    data: BodyType<CreateOrderBody>;
}, TContext>;
export type CreateOrderMutationResult = NonNullable<Awaited<ReturnType<typeof createOrder>>>;
export type CreateOrderMutationBody = BodyType<CreateOrderBody>;
export type CreateOrderMutationError = ErrorType<unknown>;
/**
* @summary Create order
*/
export declare const useCreateOrder: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
        data: BodyType<CreateOrderBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createOrder>>, TError, {
    data: BodyType<CreateOrderBody>;
}, TContext>;
export declare const getGetOrderUrl: (orderId: number) => string;
/**
 * @summary Get order
 */
export declare const getOrder: (orderId: number, options?: Parameters<typeof customFetch>[1]) => Promise<Order>;
export declare const getGetOrderQueryKey: (orderId: number) => readonly [`/api/orders/${number}`];
export declare const getGetOrderQueryOptions: <TData = Awaited<ReturnType<typeof getOrder>>, TError = ErrorType<unknown>>(orderId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetOrderQueryResult = NonNullable<Awaited<ReturnType<typeof getOrder>>>;
export type GetOrderQueryError = ErrorType<unknown>;
/**
 * @summary Get order
 */
export declare function useGetOrder<TData = Awaited<ReturnType<typeof getOrder>>, TError = ErrorType<unknown>>(orderId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateOrderStatusUrl: (orderId: number) => string;
/**
 * @summary Update order status
 */
export declare const updateOrderStatus: (orderId: number, updateOrderStatusBody: UpdateOrderStatusBody, options?: Parameters<typeof customFetch>[1]) => Promise<Order>;
export declare const getUpdateOrderStatusMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateOrderStatus>>, TError, {
        orderId: number;
        data: BodyType<UpdateOrderStatusBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateOrderStatus>>, TError, {
    orderId: number;
    data: BodyType<UpdateOrderStatusBody>;
}, TContext>;
export type UpdateOrderStatusMutationResult = NonNullable<Awaited<ReturnType<typeof updateOrderStatus>>>;
export type UpdateOrderStatusMutationBody = BodyType<UpdateOrderStatusBody>;
export type UpdateOrderStatusMutationError = ErrorType<unknown>;
/**
* @summary Update order status
*/
export declare const useUpdateOrderStatus: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateOrderStatus>>, TError, {
        orderId: number;
        data: BodyType<UpdateOrderStatusBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateOrderStatus>>, TError, {
    orderId: number;
    data: BodyType<UpdateOrderStatusBody>;
}, TContext>;
export declare const getRegisterDeliveryPartnerUrl: () => string;
/**
 * @summary Register delivery partner
 */
export declare const registerDeliveryPartner: (registerDeliveryPartnerBody: RegisterDeliveryPartnerBody, options?: Parameters<typeof customFetch>[1]) => Promise<DeliveryPartner>;
export declare const getRegisterDeliveryPartnerMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof registerDeliveryPartner>>, TError, {
        data: BodyType<RegisterDeliveryPartnerBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof registerDeliveryPartner>>, TError, {
    data: BodyType<RegisterDeliveryPartnerBody>;
}, TContext>;
export type RegisterDeliveryPartnerMutationResult = NonNullable<Awaited<ReturnType<typeof registerDeliveryPartner>>>;
export type RegisterDeliveryPartnerMutationBody = BodyType<RegisterDeliveryPartnerBody>;
export type RegisterDeliveryPartnerMutationError = ErrorType<unknown>;
/**
* @summary Register delivery partner
*/
export declare const useRegisterDeliveryPartner: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof registerDeliveryPartner>>, TError, {
        data: BodyType<RegisterDeliveryPartnerBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof registerDeliveryPartner>>, TError, {
    data: BodyType<RegisterDeliveryPartnerBody>;
}, TContext>;
export declare const getGetMyDeliveryProfileUrl: () => string;
/**
 * @summary Get my delivery profile
 */
export declare const getMyDeliveryProfile: (options?: Parameters<typeof customFetch>[1]) => Promise<DeliveryPartner>;
export declare const getGetMyDeliveryProfileQueryKey: () => readonly ["/api/delivery-partners/me"];
export declare const getGetMyDeliveryProfileQueryOptions: <TData = Awaited<ReturnType<typeof getMyDeliveryProfile>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMyDeliveryProfile>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMyDeliveryProfile>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMyDeliveryProfileQueryResult = NonNullable<Awaited<ReturnType<typeof getMyDeliveryProfile>>>;
export type GetMyDeliveryProfileQueryError = ErrorType<unknown>;
/**
 * @summary Get my delivery profile
 */
export declare function useGetMyDeliveryProfile<TData = Awaited<ReturnType<typeof getMyDeliveryProfile>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMyDeliveryProfile>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateDeliveryStatusUrl: () => string;
/**
 * @summary Update delivery availability
 */
export declare const updateDeliveryStatus: (updateDeliveryStatusBody: UpdateDeliveryStatusBody, options?: Parameters<typeof customFetch>[1]) => Promise<DeliveryPartner>;
export declare const getUpdateDeliveryStatusMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateDeliveryStatus>>, TError, {
        data: BodyType<UpdateDeliveryStatusBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateDeliveryStatus>>, TError, {
    data: BodyType<UpdateDeliveryStatusBody>;
}, TContext>;
export type UpdateDeliveryStatusMutationResult = NonNullable<Awaited<ReturnType<typeof updateDeliveryStatus>>>;
export type UpdateDeliveryStatusMutationBody = BodyType<UpdateDeliveryStatusBody>;
export type UpdateDeliveryStatusMutationError = ErrorType<unknown>;
/**
* @summary Update delivery availability
*/
export declare const useUpdateDeliveryStatus: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateDeliveryStatus>>, TError, {
        data: BodyType<UpdateDeliveryStatusBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateDeliveryStatus>>, TError, {
    data: BodyType<UpdateDeliveryStatusBody>;
}, TContext>;
export declare const getListAdminProvidersUrl: (params?: ListAdminProvidersParams) => string;
/**
 * @summary List providers for admin
 */
export declare const listAdminProviders: (params?: ListAdminProvidersParams, options?: Parameters<typeof customFetch>[1]) => Promise<ListAdminProvidersResponse>;
export declare const getListAdminProvidersQueryKey: (params?: ListAdminProvidersParams) => readonly ["/api/admin/providers", ...ListAdminProvidersParams[]];
export declare const getListAdminProvidersQueryOptions: <TData = Awaited<ReturnType<typeof listAdminProviders>>, TError = ErrorType<unknown>>(params?: ListAdminProvidersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAdminProviders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAdminProviders>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAdminProvidersQueryResult = NonNullable<Awaited<ReturnType<typeof listAdminProviders>>>;
export type ListAdminProvidersQueryError = ErrorType<unknown>;
/**
 * @summary List providers for admin
 */
export declare function useListAdminProviders<TData = Awaited<ReturnType<typeof listAdminProviders>>, TError = ErrorType<unknown>>(params?: ListAdminProvidersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAdminProviders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getVerifyProviderUrl: (providerId: number) => string;
/**
 * @summary Verify or reject provider
 */
export declare const verifyProvider: (providerId: number, verifyProviderBody: VerifyProviderBody, options?: Parameters<typeof customFetch>[1]) => Promise<Provider>;
export declare const getVerifyProviderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof verifyProvider>>, TError, {
        providerId: number;
        data: BodyType<VerifyProviderBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof verifyProvider>>, TError, {
    providerId: number;
    data: BodyType<VerifyProviderBody>;
}, TContext>;
export type VerifyProviderMutationResult = NonNullable<Awaited<ReturnType<typeof verifyProvider>>>;
export type VerifyProviderMutationBody = BodyType<VerifyProviderBody>;
export type VerifyProviderMutationError = ErrorType<unknown>;
/**
* @summary Verify or reject provider
*/
export declare const useVerifyProvider: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof verifyProvider>>, TError, {
        providerId: number;
        data: BodyType<VerifyProviderBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof verifyProvider>>, TError, {
    providerId: number;
    data: BodyType<VerifyProviderBody>;
}, TContext>;
export declare const getUpdateProviderSubscriptionUrl: (providerId: number) => string;
/**
 * @summary Activate or deactivate a provider monthly subscription
 */
export declare const updateProviderSubscription: (providerId: number, updateProviderSubscriptionBody: UpdateProviderSubscriptionBody, options?: Parameters<typeof customFetch>[1]) => Promise<Provider>;
export declare const getUpdateProviderSubscriptionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProviderSubscription>>, TError, {
        providerId: number;
        data: BodyType<UpdateProviderSubscriptionBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateProviderSubscription>>, TError, {
    providerId: number;
    data: BodyType<UpdateProviderSubscriptionBody>;
}, TContext>;
export type UpdateProviderSubscriptionMutationResult = NonNullable<Awaited<ReturnType<typeof updateProviderSubscription>>>;
export type UpdateProviderSubscriptionMutationBody = BodyType<UpdateProviderSubscriptionBody>;
export type UpdateProviderSubscriptionMutationError = ErrorType<unknown>;
/**
* @summary Activate or deactivate a provider monthly subscription
*/
export declare const useUpdateProviderSubscription: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProviderSubscription>>, TError, {
        providerId: number;
        data: BodyType<UpdateProviderSubscriptionBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateProviderSubscription>>, TError, {
    providerId: number;
    data: BodyType<UpdateProviderSubscriptionBody>;
}, TContext>;
export declare const getGetAdminStatsUrl: () => string;
/**
 * @summary Get admin stats
 */
export declare const getAdminStats: (options?: Parameters<typeof customFetch>[1]) => Promise<AdminStats>;
export declare const getGetAdminStatsQueryKey: () => readonly ["/api/admin/stats"];
export declare const getGetAdminStatsQueryOptions: <TData = Awaited<ReturnType<typeof getAdminStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAdminStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAdminStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getAdminStats>>>;
export type GetAdminStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get admin stats
 */
export declare function useGetAdminStats<TData = Awaited<ReturnType<typeof getAdminStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetDashboardStatsUrl: () => string;
/**
 * @summary Get dashboard stats for current user
 */
export declare const getDashboardStats: (options?: Parameters<typeof customFetch>[1]) => Promise<DashboardStats>;
export declare const getGetDashboardStatsQueryKey: () => readonly ["/api/dashboard/stats"];
export declare const getGetDashboardStatsQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardStats>>>;
export type GetDashboardStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get dashboard stats for current user
 */
export declare function useGetDashboardStats<TData = Awaited<ReturnType<typeof getDashboardStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListNotificationsUrl: () => string;
/**
 * @summary List notifications for the current user
 */
export declare const listNotifications: (options?: Parameters<typeof customFetch>[1]) => Promise<ListNotificationsResponse>;
export declare const getListNotificationsQueryKey: () => readonly ["/api/notifications"];
export declare const getListNotificationsQueryOptions: <TData = Awaited<ReturnType<typeof listNotifications>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListNotificationsQueryResult = NonNullable<Awaited<ReturnType<typeof listNotifications>>>;
export type ListNotificationsQueryError = ErrorType<unknown>;
/**
 * @summary List notifications for the current user
 */
export declare function useListNotifications<TData = Awaited<ReturnType<typeof listNotifications>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getMarkAllNotificationsReadUrl: () => string;
/**
 * @summary Mark all notifications as read
 */
export declare const markAllNotificationsRead: (options?: Parameters<typeof customFetch>[1]) => Promise<MarkAllNotificationsReadResponse>;
export declare const getMarkAllNotificationsReadMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof markAllNotificationsRead>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof markAllNotificationsRead>>, TError, void, TContext>;
export type MarkAllNotificationsReadMutationResult = NonNullable<Awaited<ReturnType<typeof markAllNotificationsRead>>>;
export type MarkAllNotificationsReadMutationError = ErrorType<unknown>;
/**
* @summary Mark all notifications as read
*/
export declare const useMarkAllNotificationsRead: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof markAllNotificationsRead>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof markAllNotificationsRead>>, TError, void, TContext>;
export declare const getMarkNotificationReadUrl: (notificationId: number) => string;
/**
 * @summary Mark a notification as read
 */
export declare const markNotificationRead: (notificationId: number, options?: Parameters<typeof customFetch>[1]) => Promise<Notification>;
export declare const getMarkNotificationReadMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof markNotificationRead>>, TError, {
        notificationId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof markNotificationRead>>, TError, {
    notificationId: number;
}, TContext>;
export type MarkNotificationReadMutationResult = NonNullable<Awaited<ReturnType<typeof markNotificationRead>>>;
export type MarkNotificationReadMutationError = ErrorType<unknown>;
/**
* @summary Mark a notification as read
*/
export declare const useMarkNotificationRead: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof markNotificationRead>>, TError, {
        notificationId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof markNotificationRead>>, TError, {
    notificationId: number;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map