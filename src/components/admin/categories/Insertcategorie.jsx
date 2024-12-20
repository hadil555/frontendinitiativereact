import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Insertcategorie = () => {
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState({});
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("https://ecommercebackend-woad.vercel.app/api/categorie");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      await axios.post("https://ecommercebackend-woad.vercel.app/api/categorie", categorie).then((res) => {
        navigate("/categories");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h1>Insérer une catégorie</h1>
      <Form>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom"
              value={categorie.nom}
              onChange={(e) => setCategorie({ ...categorie, nom: e.target.value })}
            />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={categorie.description}
              onChange={(e) => setCategorie({ ...categorie, description: e.target.value })}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="12">
            <Form.Label>Catégories parent</Form.Label>
            <Form.Control
              as={"select"}
              placeholder="Catégorie parent"
              value={categorie.parentID}
              onChange={(e) => setCategorie({ ...categorie, parentID: e.target.value })}
            >
              <option>----Sélectionner une catégorie parent----</option>
              {categories.map((cat, index) => (
                <option value={cat._id} key={index}>
                  {cat.nom}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
      </Form>
      <button className="btn btn-success btn-sm" onClick={(e) => handleSave(e)}>
        Enregistrer
      </button>
      <Link to="/categories">
        <button className="btn btn-danger btn-sm">Annuler</button>
      </Link>
    </div>
  );
};

export default Insertcategorie;

