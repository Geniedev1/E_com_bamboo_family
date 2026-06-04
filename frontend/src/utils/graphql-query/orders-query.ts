export const ordersByQuery = `
    {
        orders {
            id
            totalPrice
            date
            firstName
            lastName
            city
            address
            email
            phoneNumber
            postIndex
            orderItems {
                id
                amount
                quantity
                product {
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
        }
    }
`;

export const ordersByEmailQuery = (email: string | undefined) => `
    {
        ordersByEmail(email: \"${email}\") {
            id
            totalPrice
            date
            firstName
            lastName
            city
            address
            email
            phoneNumber
            postIndex
            orderItems {
                id
                amount
                quantity
                product {
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
        }
    }
`;
