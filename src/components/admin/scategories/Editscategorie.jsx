import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

const Editscategories = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de la sous-catégorie depuis l'URL
  const [scategorie, setScategorie] = useState({
    nomscategorie: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    loadScategorie();
  }, []);

  // Récupérer les données de la sous-catégorie à modifier
  const loadScategorie = async () => {
    try {
      const result = await axios.get(`https://ecommercebackend-woad.vercel.app/api/scategories/${id}`);
      setScategorie(result.data);
    } catch (error) {
      console.error("Erreur lors du chargement de la sous-catégorie :", error);
    }
  };

  // Gestion des changements dans le formulaire
  const onInputChange = (e) => {
    setScategorie({ ...scategorie, [e.target.name]: e.target.value });
  };

  // Soumettre le formulaire pour mettre à jour la sous-catégorie
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ecommercebackend-woad.vercel.app/api/scategories/${id}`, scategorie);
      alert("Sous-catégorie mise à jour avec succès !");
      navigate("/scategories"); // Redirige vers la liste des sous-catégories après la modification
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la sous-catégorie :", error);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h4 align="center">Modifier la sous-catégorie</h4>
          <Form className="border p-3 mt-3" onSubmit={onSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>Nom de la sous-catégorie *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nom de la sous-catégorie"
                  name="nomscategorie"
                  value={scategorie.nomscategorie}
                  onChange={onInputChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description de la sous-catégorie"
                  name="description"
                  value={scategorie.description}
                  onChange={onInputChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="URL de l'image"
                  name="image"
                  value={scategorie.image}
                  onChange={onInputChange}
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Enregistrer les modifications
            </Button>
            <Button variant="danger" className="ml-2" onClick={() => navigate("/scategories")}>
              Annuler
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Editscategories;
