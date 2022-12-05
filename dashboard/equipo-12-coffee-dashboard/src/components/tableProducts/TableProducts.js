import { Component } from "react";

class TableCoffee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRowsData: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/product/getAll")
      .then(response => {
        return response.json()
      })
      .then((coffee) => {
        
        this.setState({
          tableRowsData: coffee.products,
        });
      });
  }
  render() {
    
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Tamano</th>
            <th>Precio</th>
            <th>Categoria de venta</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tableRowsData.map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{row.size}</td>
                <td>$ {row.price} COP</td>
                <td>{row.sellingCategory}</td>
              </tr>
            );
          })}
        </tbody>
        {/* <tfoot>
          <tr>
            <th>Titulo</th>
            <th>Duracion</th>
            <th>Rating</th>
            <th>Genero</th>
            <th>Premios</th>
          </tr>
        </tfoot> */}
      </table>
    );
  }
}

export default TableCoffee;
