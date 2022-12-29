import { RequestHandler } from "@builder.io/qwik-city";

export const onPost: RequestHandler = async ({ request }) => {
    const body = JSON.parse(await request.text());

    const res = await fetch("https://api.twitter.com/2/tweets", {
        method: "POST",
        headers: {
            Authorization: request.headers.get('Authorization')!,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: body.text,
        }),
    }).then(r => r.json())

    return res;
};