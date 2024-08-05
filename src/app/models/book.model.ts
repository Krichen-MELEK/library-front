import { Author } from "./author.model";

export interface Book {
    id: string;
    title: string;
    price: number;
    author: Author;
    publicationDate : Date;
}
