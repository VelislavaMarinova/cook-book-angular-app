export interface Recipe {
    "_id": string,
    "title": string,
    "category": string,
    "dificulty": string,
    "prepare": string,
    "cook": string,
    "serves": string,
    "description": string,
    "ingredients": string[],
    "imageUrl": string,
    "method": string[],
    "author": string,
    "_ownerId": string,
    "__v": number
}