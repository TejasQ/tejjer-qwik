export type Timeline = {
    id: string;
    edit_history_tweet_ids: string[];
    created_at: string;
    author_id: string;
    text: string;
    author: {
        username: string;
        profile_image_url: string;
        id: string;
        name: string;
    };
};