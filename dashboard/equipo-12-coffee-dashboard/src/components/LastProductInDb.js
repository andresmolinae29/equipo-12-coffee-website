import { Component } from "react";
const images = require.context("../assets/images", true);

class LastProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastProduct: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/product/lastProduct")
      .then(response => {
        return response.json()
      })
      .then((product) => {

        this.setState({
          lastProduct: product.product[0],
        });

      });
  }

  render () {
    return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Ultimo producto agregado
          </h5>
        </div>
        <div className="card-body">
          <div>
            {this.state.lastProduct.name}
          </div>
          <div>
            $ {this.state.lastProduct.price} COP
          </div>
          <div>
            {this.state.lastProduct.size}
          </div>
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: "40rem" }}
              src= {images('./img-night-espresso.jpg')}
              alt=" product image "
            />
          </div>
          <p>
            {this.state.lastProduct.longDescription}
          </p>
        </div>
      </div>
    </div>
  );
  }
}

export default LastProduct;
