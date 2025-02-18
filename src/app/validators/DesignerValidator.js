import * as Yup from 'yup';

const DesignerValidator = Yup.object().shape({
    nome: Yup.string()
        .required('Nome é obrigatório')
        .min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    telefone: Yup.string()
        .required('Telefone é obrigatório')
        .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone deve estar no formato (99) 99999-9999'),
    marca: Yup.string()
        .required('A marca é obrigatória.'),
    descricao: Yup.string()
        .required('A descrição é obrigatória.')
        .min(10, 'A descrição deve ter pelo menos 10 caracteres.')
        .max(500, 'A descrição não pode ter mais de 500 caracteres.'),
});

export default DesignerValidator;