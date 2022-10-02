import joi from 'joi';

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.number().min(10).max(11).required(),
    cpf: joi.number().min(11).max(11).required(),
    birthday: joi.date().required()
})

export { customersSchema };