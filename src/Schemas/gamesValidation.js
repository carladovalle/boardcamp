import joi from 'joi';

const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.required(),
    stockTotal: joi.number().min(0).required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().required(),
})

export { gamesSchema };