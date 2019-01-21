export class Post {
    id ?: number;
    author ?: string;
    title: string;
    content: string;
    media: File;
    media_type: number;
    comment_allowed: number
    status ?: string //0 = innactive/suspended 1 = active
} 