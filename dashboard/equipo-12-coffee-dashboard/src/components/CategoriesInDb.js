import { Component } from "react";
import CategoryCard from "./CategoryCard";

class CategoriesInDb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/product/categories")
      .then((response) => response.json())
      .then((categoriesArray) => {
        this.setState({
          categories: categoriesArray.categories,
        });
      });
  }

  setColor() {
    const cardcategories = document.querySelector(".fondoCaja");
    cardcategories.classList.add("bg-secondary");
  }
  clearColor() {
    const cardcategories = document.querySelector(".fondoCaja");
    cardcategories.classList.remove("bg-secondary");
  }

  render() {
    return (

      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5
              onMouseOver={() => this.setColor()}
              onMouseLeave={() => this.clearColor()}
              className="m-0 font-weight-bold text-gray-800"
            >
              Categorias de venta en la base de datos
            </h5>
          </div>
          <div className="card-body fondoCaja">
            <div className="row">
              {this.state.categories.map((category, index) => (
                <CategoryCard key={index + category.sellingCategory} category={category.sellingCategory} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoriesInDb;
