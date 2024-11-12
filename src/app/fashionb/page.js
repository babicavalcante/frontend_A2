'use client'

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Pagina from "../components/Pagina/Pagina";
import './fashionb.css'; // Importando o arquivo de estilos

// Simulando os dados para "modelos" e "destaques"
const modelos = [
  { id: 1, nome: "Modelo 1", foto: "/img/modelo1.jpg", descricao: "Descrição do Modelo 1" },
  { id: 2, nome: "Modelo 2", foto: "/img/modelo2.jpg", descricao: "Descrição do Modelo 2" },
  { id: 3, nome: "Modelo 3", foto: "/img/modelo3.jpg", descricao: "Descrição do Modelo 3" },
];

// Lista de imagens de destaque
const destaques = [
  { 
    id: 1, 
    nome: "Alta Costura 2023/2024", 
    foto: "https://static.stealthelook.com.br/wp-content/uploads/2023/01/alta-costura-20232024-capa-20230117193354.jpg", 
    descricao: "Alta Costura 2023/2024"
  },
  { 
    id: 2, 
    nome: "Victoria's Secret Fashion Show 2024", 
    foto: "https://www.billboard.com/wp-content/uploads/2024/10/gigi-hadid-victorias-secret-fashion-show-2024-billboard-1548.jpg?w=1024", 
    descricao: "Gigi Hadid no Victoria's Secret Fashion Show 2024"
  },
  { 
    id: 3, 
    nome: "Schiaparelli Fall 2024 Couture", 
    foto: "https://images.elle.com.br/2024/06/00021-schiaparelli-fall-2024-couture-credit-brand-1240x1680.webp", 
    descricao: "Schiaparelli Fall 2024 Couture"
  }
];

export default function FashionB() {
  const [designers, setDesigners] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [pecas, setPecas] = useState([]);
  const [desfiles, setDesfiles] = useState([]);

  // Carregar os dados de cada categoria do localStorage
  useEffect(() => {
    const dadosDesigners = JSON.parse(localStorage.getItem('designers')) || [];
    setDesigners(dadosDesigners);

    const dadosMarcas = JSON.parse(localStorage.getItem('marcas')) || [];
    setMarcas(dadosMarcas);

    const dadosPecas = JSON.parse(localStorage.getItem('pecas')) || [];
    setPecas(dadosPecas);

    const dadosDesfiles = JSON.parse(localStorage.getItem('desfiles')) || [];
    setDesfiles(dadosDesfiles);
  }, []);

  return (
    <Pagina titulo="FashionB - Página Inicial">
      <Container>
        {/* Carousel de Destaques */}
        <Carousel>
          {destaques.map((destaque) => (
            <Carousel.Item key={destaque.id}>
              <img
                className="d-block w-100"
                src={destaque.foto}
                alt={destaque.nome}
                style={{
                  maxHeight: "500px", 
                  objectFit: "cover", // Imagem irá cobrir a área sem distorção
                  width: "100%", 
                  height: "500px", // Garantir altura fixa para todas as imagens
                  objectPosition: "top" // Mover a imagem para o topo
                }}
              />
              <Carousel.Caption>
                <h3>{destaque.nome}</h3>
                <p>{destaque.descricao}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Exibindo os Modelos */}
        <h2 className="mt-5">Modelos em Destaque</h2>
        <Row>
          {modelos.map((modelo) => (
            <Col md={4} key={modelo.id}>
              <Card>
                <Card.Img variant="top" src={modelo.foto} />
                <Card.Body>
                  <Card.Title>{modelo.nome}</Card.Title>
                  <Card.Text>{modelo.descricao}</Card.Text>
                  <Link href={`/modelos/${modelo.id}`}>
                    <Button variant="primary">Ver Mais</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Exibindo os Designers */}
        <h2 className="mt-5">Designers</h2>
        <Row>
          {designers.map((designer) => (
            <Col md={4} key={designer.id}>
              <Card>
                <Card.Img variant="top" src={designer.foto || "/img/default.jpg"} />
                <Card.Body>
                  <Card.Title>{designer.nome}</Card.Title>
                  <Card.Text>{designer.especialidade}</Card.Text>
                  <Link href={`/designers/${designer.id}`}>
                    <Button variant="primary">Ver Mais</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Pagina>
  );
}
