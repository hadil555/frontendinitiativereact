import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Editcategorie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState({
    nom: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    getCategories();
    loadCategorie();
  }, []);

  // Récupérer les catégories
  const getCategories = async () => {
    try {
      const res = await axios.get("https://ecommercebackend-woad.vercel.app/api/categorie");
      setCategories(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };

  // Charger les détails de la catégorie
  const loadCategorie = async () => {
    try {
      const result = await axios.get(`https://ecommercebackend-woad.vercel.app/api/categorie/${id}`);
      setCategorie(result.data);
    } catch (error) {
      console.error("Erreur lors du chargement de la catégorie :", error);
    }
  };

  // Gestion des changements dans le formulaire
  const onInputChange = (e) => {
    setCategorie({ ...categorie, [e.target.name]: e.target.value });
  };

  // Soumettre le formulaire pour mettre à jour la catégorie
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ecommercebackend-woad.vercel.app/api/categorie/${id}`, categorie);
      alert("Catégorie mise à jour avec succès !");
      navigate("/categories");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie :", error);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h4 align="center">Modifier la catégorie</h4>
          <Form className="border p-3 mt-3" onSubmit={onSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>Nom *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nom de la catégorie"
                  name="nom"
                  value={categorie.nom}
                  onChange={onInputChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description de la catégorie"
                  name="description"
                  value={categorie.description}
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
                  value={categorie.image}
                  onChange={onInputChange}
                />
              </Form.Group>
            </Row>
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
            <Link to="/categories" className="btn btn-danger mx-2">
              Annuler
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Editcategorie;

