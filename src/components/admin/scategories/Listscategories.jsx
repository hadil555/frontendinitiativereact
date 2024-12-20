import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Link, useNavigate } from 'react-router-dom';

const Listscategories = () => {
  const [scategories, setScategories] = useState([]);  // Changement ici pour "scategories"
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null); // Gestion des erreurs
  const navigate = useNavigate();

  // Fonction pour récupérer les scategories depuis l'API
  const listscategories = async () => {  // Changement ici pour "listscategories"
    try {
      const res = await axios.get("https://ecommercebackend-woad.vercel.app/api/scategories");
      setScategories(res.data);  // Modification pour "scategories"
      setIsloading(false);
    } catch (error) {
      setError("Impossible de charger les scategories. Veuillez réessayer plus tard.");
      setIsloading(false);
    }
  };

  useEffect(() => {
    listscategories();
  }, []);

  if (isloading) {
    return (
      <center>
        <ReactLoading type="spin" color="red" height={300} width={200} />
        <h3>En cours de chargement...</h3>
      </center>
    );
  }

  // Fonction pour supprimer une scategorie
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette scategorie ?")) {
      try {
        await axios.delete(`https://ecommercebackend-woad.vercel.app/api/scategories/${id}`);
        setScategories(scategories.filter(scategorie => scategorie._id !== id));  // Modification ici pour "scategories"
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Fonction pour rediriger vers la page de modification
  const handleUpdate = (id) => {
    navigate(`/scategories/edit/${id}`);  // Modification ici pour "scategories"
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>} {/* Affichage de l'erreur */}

      <p>
        <Link to="/scategories/add">  {/* Modification ici pour "scategories" */}
          <button className="btn btn-success btn-sm">
            <i className="fa-solid fa-square-plus"></i> Nouveau
          </button>
        </Link>
      </p>

      <center>
        <h1>Liste des Scategories</h1>  {/* Modification ici pour "Scategories" */}
      </center>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom de la scategorie</th>  {/* Modification ici pour "scategorie" */}
            <th>Image</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {scategories.map((scat) => (  // Modification ici pour "scategories"
            <tr key={scat._id}>
              <td>{scat.nomscategorie}</td>  {/* Modification ici pour "nomscategorie" */}
              <td>
                <img src={scat.imagescategorie} alt={`Image de la scategorie ${scat.nomscategorie}`} width={100} height={100} />
              </td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleUpdate(scat._id)}>
                  <i className="fa-sharp fa-solid fa-pen-to-square"></i> Modifier
                </button>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(scat._id)}>
                  <i className="fa-sharp fa-solid fa-trash"></i> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listscategories;
