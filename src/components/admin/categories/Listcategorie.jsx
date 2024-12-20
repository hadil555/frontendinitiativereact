import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Link, useNavigate } from 'react-router-dom';

const Listcategorie = () => {
  const [categories, setCategories] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const navigate = useNavigate();

  const fetchcategories = async () => {
    try {
      const res = await axios.get("https://ecommercebackend-woad.vercel.app/api/categorie");
      setCategories(res.data);
      setIsloading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchcategories();
  }, []);

  if (isloading) {
    return (
      <>
        <center>
          <ReactLoading type="spin" color="red" height={300} width={200} />
          <h3>En cours de chargement...</h3>
        </center>
      </>
    );
  }

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await axios.delete(`https://ecommercebackend-woad.vercel.app/api/categorie/${id}`);
        setCategories(categories.filter(categorie => categorie._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = async (id) => {
    navigate(`/categories/edit/${id}`);
  };

  return (
    <div>
      <p>
        <td>
          <Link to="/categories/add">
            <button className="btn btn-success btn-sm">
              <i className="fa-solid fa-square-plus"></i> Nouveau
            </button>
          </Link>
        </td>
      </p>
      <center>
        <h1>Liste des catégories</h1>
      </center>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom de la catégorie</th>
            <th>Image</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={index}>
              <td>{cat.nomcategorie}</td>
              <td>
                <img src={cat.imagecategorie} alt={cat.nomcategorie} width={100} height={100} />
              </td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleUpdate(cat._id)}>
                  <i className="fa-sharp fa-solid fa-pen-to-square"></i> Modifier
                </button>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat._id)}>
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

export default Listcategorie;

