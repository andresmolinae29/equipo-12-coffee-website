import Sidebar from "./SideBar";
import ContentWrapper from "./ContentWrapper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LastProductInDb from "./LastProductInDb";
import CategoriesInDb from "./CategoriesInDb";
import ContentRowMovies from "./contentRowMovies/ContentRowMovies";

function RouterApp() {
  return (
    <BrowserRouter>
      <div id="wrapper">
        <Sidebar />
        <Routes>
          <Route path={"/"} element={<ContentWrapper />} />
          <Route path={"/ultima"} element={<LastProductInDb />} />
          <Route path={"/generos"} element={<CategoriesInDb />} />
          <Route path={"/peliculas"} element={<ContentRowMovies />} />
          <Route path={"*"} element={<ContentWrapper />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default RouterApp;
