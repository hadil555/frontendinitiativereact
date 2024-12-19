import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Listarticles from "./components/admin/articles/Listarticles"
import Insertarticles from "./components/admin/articles/Insertarticles"
import Editarticle from "./components/admin/articles/Editarticle"
import Listcategorie from "./components/admin/categories/Listcategorie"
import Insertcategorie from "./components/admin/categories/Insertcategorie"
import Editcategorie from "./components/admin/categories/Editcategorie"
import Listscategories from "./components/admin/scategories/Listscategories"
import Menu from "./components/admin/Menu"
import Editscategorie from "./components/admin/scategories/Editscategorie"
import Inserscategorie from "./components/admin/scategories/Inserscategorie"
import Home from "./components/admin/Home"

const App = () => {
  return (

    <Router>
      <Menu/>
      
      <Routes>
      <Route path="/"element={<Home/>}/>
        <Route path="/articles" element={<Listarticles/>}/>
        <Route path="/articles/add" element={<Insertarticles/>}/>
        <Route path="/articles/edit/:id" element={<Editarticle/>}/>
       
        <Route path="/categories" element={<Listcategorie/>}/>
        <Route path="/categories/add" element={<Insertcategorie/>}/>
        <Route path="/categories/edit/:id" element={<Editcategorie />}/>
        <Route path="/scategories" element={<Listscategories   />}/>
        <Route path="/scategories/add" element={<Inserscategorie/>}/>
        <Route path="/scategories/edit/:id" element={<Editscategorie />}/>
      </Routes>

    </Router>
   
  )
}

export default App
