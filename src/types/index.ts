
export type SearchParamProps = {
    params: { id: string }
}
export type GetAllEventsParams = {
    limit: number
    page: number
    query: string
}
export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}