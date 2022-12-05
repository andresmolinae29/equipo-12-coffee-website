import React, { Component } from "react";
import RowItem from "./RowItem";

class TopValues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userQty: 0,
      productQty: 0,
      categoryQty: 0
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/user/getAll")
    .then(response => {
      return response.json()
    })
    .then((users) => {
 
      this.setState({
        userQty: users.qty
      })
    })

    fetch("http://localhost:3000/api/product/getAll")
      .then(response => {
        return response.json()
      })
      .then((products) => {
    
        this.setState({
          productQty: products.qty
        })
      })

      fetch("http://localhost:3000/api/product/categories")
      .then(response => {
        return response.json()
      })
      .then((categories) => {
     
        this.setState({
          categoryQty: categories.qty
        })
      })
  }

  render() {

    const TotalUsers = {
      title: "Total usuarios",
      quantity: this.state.userQty,
      color: "primary",
      icon: "fa-user",
    };
  
    const TotalProducts = {
      title: "Total productos",
      quantity: this.state.productQty,
      color: "success",
      icon: "fa-store",
    };
  
    const TotalCategories = {
      title: "Total categorias",
      quantity: this.state.categoryQty,
      color: "warning",
      icon: "fa-store",
    };
  
    const dataRowMovies = [TotalUsers, TotalProducts, TotalCategories];
  
    return (
      <div className="row">
        {dataRowMovies.map((card) => {
          return (
            <RowItem
              key={card.title}
              title={card.title}
              quantity={card.quantity}
              color={card.color}
              icon={card.icon}
            />
          );
        })}
      </div>
    );

  }
}

export default TopValues;
