import { Cookie } from "@builder.io/qwik-city";

export const getTokenFromCookie = (cookie: Cookie) => {
    const jsonCookie = cookie.get('token')?.json<{ value: string }>()
    return jsonCookie?.value;
}