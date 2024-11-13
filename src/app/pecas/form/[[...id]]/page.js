'use client'

import Pagina from "@/app/components/Pagina/Pagina";
import RoupaValidator from "@/app/validators/RoupaValidator"; // Importa o validador de roupas
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";

export default function Page() {
    const route = useRouter();
    const params = useParams(); // Obtém o id da peça pela URL

    const [peca, setPeca] = useState({
        nome: '',
        marcas: '',
        categoria: '',
        tamanho: '',
        cor: '',
        preco: ''
    });
    const [marcas, setMarcas] = useState([]); // Estado para armazenar as marcas

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const pecas = JSON.parse(localStorage.getItem('pecas')) || [];
            const dados = pecas.find(item => item.id == params.id); // Procura pela peça com o id correspondente
            setPeca(dados || { nome: '', marcas: '', categoria: '', tamanho: '', cor: '', preco: '' });

            const marcas = JSON.parse(localStorage.getItem('marcas')) || []; // Carrega as marcas do localStorage
            setMarcas(marcas);
        }
    }, [params.id]);

    // Função para salvar as alterações feitas na peça
    function salvar(dados) {
        const pecas = JSON.parse(localStorage.getItem('pecas')) || [];

        if (peca.id) {
            // Atualiza o item na posição correta sem alterar a ordem
            const index = pecas.findIndex(item => item.id === peca.id);
            if (index !== -1) {
                pecas[index] = { ...pecas[index], ...dados };
            }
        } else {
            dados.id = v4(); // Se for uma nova peça, cria um id
            pecas.push(dados);
        }

        localStorage.setItem('pecas', JSON.stringify(pecas));
        return route.push('/pecas'); // Redireciona para a página de peças após salvar
    }

    return (
        <Pagina titulo="Peças de Roupa">

            <Formik
                initialValues={peca} // Passa os dados da peça para o Formik
                validationSchema={RoupaValidator} // Validação utilizando o schema do Yup
                enableReinitialize // Permite que os valores sejam atualizados sempre que o estado mudar
                onSubmit={values => salvar(values)} // Chama a função de salvar
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    setFieldValue,
                }) => {

                    useEffect(() => {
                        // Verifica se "preco" é um número, se for, converte para string
                        if (typeof values.preco === 'number') {
                            const precoNumerico = values.preco.toString();
                            setFieldValue('preco', precoNumerico ? parseFloat(precoNumerico.replace(/[^\d.-]/g, '')) : '');
                        }
                    }, [values.preco]);

                    return (
                        <Form className="p-4 shadow-sm rounded" style={{ backgroundColor: '#f8f9fa' }}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    isInvalid={errors.nome}
                                    style={{ borderColor: errors.nome ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="marcas">
                                <Form.Label>Marca</Form.Label>
                                <Form.Select
                                    name="marcas"
                                    value={values.marcas}
                                    onChange={handleChange}
                                    isInvalid={errors.marcas}
                                >
                                    <option value="">Selecione</option>
                                    {marcas.map(item => (
                                        <option key={item.id} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="text-danger">{errors.marcas}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="categoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="categoria"
                                    value={values.categoria}
                                    onChange={handleChange}
                                    isInvalid={errors.categoria}
                                    style={{ borderColor: errors.categoria ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.categoria}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="tamanho">
                                <Form.Label>Tamanho</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tamanho"
                                    value={values.tamanho}
                                    onChange={handleChange}
                                    isInvalid={errors.tamanho}
                                    style={{ borderColor: errors.tamanho ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.tamanho}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="cor">
                                <Form.Label>Cor</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cor"
                                    value={values.cor}
                                    onChange={handleChange}
                                    isInvalid={errors.cor}
                                    style={{ borderColor: errors.cor ? '#dc3545' : '#ced4da' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cor}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="preco">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="preco"
                                    value={values.preco ? `R$ ${values.preco.toFixed(2).replace('.', ',')}` : ''}
                                    onChange={e => {
                                        // Remove "R$" e formata para número
                                        const rawValue = e.target.value.replace(/[^\d]/g, '');
                                        const numericValue = rawValue ? parseFloat(rawValue) / 100 : 0; // Convertendo para número
                                        setFieldValue('preco', numericValue); // Atualiza o valor numérico
                                    }}
                                    isInvalid={errors.preco}
                                />
                                <div className="text-danger">{errors.preco}</div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="foto">
                                <Form.Label>Foto(URL)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="foto"
                                    value={values.foto}
                                    onChange={handleChange}
                                    isInvalid={errors.foto}
                                    style={{ borderColor: errors.foto ? '#dc3545' : '#ced4da' }}
                                />
                                <div className="text-danger">{errors.foto}</div>
                            </Form.Group>

                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success" className="me-2">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/pecas" className="btn btn-danger">
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Pagina>
    );
}
