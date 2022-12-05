import ContentRowMovies from "./contentRowMovies/ContentRowMovies";
import CategoriesInDb from "./CategoriesInDb";
import LastProductInDb from "./LastProductInDb";

function ContentRowTop() {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
      </div>

      <ContentRowMovies />

      <div className="row">
        <LastProductInDb />
        <CategoriesInDb />
      </div>
    </div>
  );
}

export default ContentRowTop;
