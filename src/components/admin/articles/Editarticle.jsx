import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Editarticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [scategories, setScategories] = useState([]);
  const [article, setArticle] = useState({
    reference: "",
    designation: "",
    marque: "",
    prix: 0,
    qtestock: 0,
    imageart: "",
    scategorieID: "",
  });

  useEffect(() => {
    getScategories();
    loadArticle();
  }, []);

  // Récupérer les sous-catégories
  const getScategories = async () => {
    try {
      const res = await axios.get("https://ecommercebackend-woad.vercel.app/api/scategorie");
      setScategories(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des sous-catégories :", error);
    }
  };

  // Charger les détails de l'article
  const loadArticle = async () => {
    try {
      const result = await axios.get(`https://ecommercebackend-woad.vercel.app/api/article/${id}`);
      setArticle(result.data);
    } catch (error) {
      console.error("Erreur lors du chargement de l'article :", error);
    }
  };

  // Gestion des changements dans le formulaire
  const onInputChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  // Soumettre le formulaire pour mettre à jour l'article
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ecommercebackend-woad.vercel.app/api/article/${id}`, article);
      alert("Article mis à jour avec succès !");
      navigate("/articles");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article :", error);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h4 align="center">Modifier l'article</h4>
          <Form className="border p-3 mt-3" onSubmit={onSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Référence *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Référence"
                  name="reference"
                  value={article.reference}
                  onChange={onInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Désignation *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Désignation"
                  name="designation"
                  value={article.designation}
                  onChange={onInputChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Marque *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Marque"
                  name="marque"
                  value={article.marque}
                  onChange={onInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Prix"
                  name="prix"
                  value={article.prix}
                  onChange={onInputChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Qté stock *</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Qté stock"
                  name="qtestock"
                  value={article.qtestock}
                  onChange={onInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="URL de l'image"
                  name="imageart"
                  value={article.imageart}
                  onChange={onInputChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>Sous-catégorie</Form.Label>
                <Form.Control
                  as="select"
                  name="scategorieID"
                  value={article.scategorieID}
                  onChange={onInputChange}
                >
                  <option value="">-- Sélectionner une sous-catégorie --</option>
                  {scategories.map((scat) => (
                    <option key={scat._id} value={scat._id}>
                      {scat.nomscategorie}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
            <Link to="/articles" className="btn btn-danger mx-2">
              Annuler
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Editarticle;
