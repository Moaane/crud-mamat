import { Book } from "@prisma/client";

export class BookEntity implements Book {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
