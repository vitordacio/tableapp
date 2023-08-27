import { celebrate, Segments, Joi } from 'celebrate';
// import validator from 'cpf-cnpj-validator';

// const JoiCnpj = Joi.extend(validator);
// const JoiCpf = Joi.extend(validator);

export const updateUserMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().label('nome'),
    // email: Joi.string().email(),
    // phone: Joi.string().min(8).max(15).label('telefone'),
    // document: [JoiCnpj.document().cnpj(), JoiCpf.document().cpf()],
    // password: Joi.string().label('nova senha'),
    // surname: Joi.string().label('sobrenome'),
    // permissions: Joi.array().items(Joi.string()),
    // userId: Joi.string().required(),
    // is_locator: Joi.boolean().label('locador'),
    // address: Joi.object({
    //   // mod - 11/11 - Now the update middleware recive address
    //   id_address: Joi.string(),
    //   zip: Joi.string().label('cep'),
    //   street: Joi.string().label('rua'),
    //   uf: Joi.string().label('uf'),
    //   city: Joi.string().label('cidade'),
    //   district: Joi.string().label('bairro'),
    //   number: Joi.string().allow('').label('numero'),
    // }).label('endereço'),
  },
});
