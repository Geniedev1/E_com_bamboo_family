export const getAllProductsByQuery = `
    {
        products {
            id
            productTitle
            vendor
            price
            filename
            productRating
        }
    }
`;

export const getProductByQuery = (id: string) => `
    {
        product(id: ${id}) {
            id
            productTitle
            vendor
            year
            country
            gender
            topDescription
            middleDescription
            baseDescription
            filename
            price
            volume
            type
            productRating
            reviews {
                id
                author
                message
                date
                rating
            }
        }
    }
`;

export const geProductsByIdsQuery = (ids: Array<number>) => `
    {
        productsIds(ids: [${ids}]) {
            id
            productTitle
            vendor
            price
            filename
            productRating
        }
    }
`;
