import axios from "axios";
import { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Insertscategorie = () => {
  const navigate = useNavigate();
  const [scategorie, setScategorie] = useState({
    nomscategorie: "",
    description: "",
    image: ""
  });

  // Fonction pour sauvegarder la nouvelle sous-catégorie
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Envoie la nouvelle sous-catégorie via une requête POST
      await axios.post("https://ecommercebackend-woad.vercel.app/api/scategories", scategorie);
      navigate("/scategories");  // Redirige vers la liste des sous-catégories après l'ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout de la sous-catégorie", error);
    }
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h1>Ajouter une nouvelle sous-catégorie</h1>
      <Form>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Nom de la sous-catégorie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom de la sous-catégorie"
              value={scategorie.nomscategorie}
              onChange={(e) => setScategorie({ ...scategorie, nomscategorie: e.target.value })}
            />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={scategorie.description}
              onChange={(e) => setScategorie({ ...scategorie, description: e.target.value })}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="12">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de l'image"
              value={scategorie.image}
              onChange={(e) => setScategorie({ ...scategorie, image: e.target.value })}
            />
          </Form.Group>
        </Row>

        <div className="mt-3">
          <button className="btn btn-success btn-sm" onClick={handleSave}>
            Enregistrer
          </button>
          <button className="btn btn-danger btn-sm ml-2" onClick={() => navigate("/scategories")}>
            Annuler
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Insertscategorie;

