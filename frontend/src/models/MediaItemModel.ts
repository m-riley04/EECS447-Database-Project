export default interface MediaItemModel {
    media_id: number;
    author_id: number;
    genre_id: number;
    media_type_id: number;
    title: string;
    publication_year: Date;
    availability: boolean;
    isbn: string;
};