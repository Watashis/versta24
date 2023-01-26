import React, { Component } from 'react';
import { OrderItem } from './OrderItem';
import { Navigate } from 'react-router-dom'
import "../style/orders.css"

export class Orders extends Component {
  static displayName = Orders.name;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true,
      redirect: false,
      link: ""
    };

    this.redirect = this.redirect.bind(this);
  }
  componentDidMount() {
    this.getOrders();
  }
  redirect(id) {
    this.setState({ link: `/order/${id}`, redirect: true })
  }
  async getOrders() {
    let response = await fetch('api/orders');
    let data = await response.json();
    this.setState({ orders: data, loading: false });
  }
  renderOrders(orders) {
    let content = <p><em>Тут пока пусто...</em></p>;
    if (orders.length > 0) {
      content = (<div className="list-group">
        {orders.map(order =>
          <OrderItem key={order.id} id={order.orderid} cityFrom={order.cityFrom} cityTo={order.cityTo} date={order.date} click={() => this.redirect(order.orderid)}></OrderItem>
        )}
      </div>)
    }
    return content
  }
  render() {
    let contents = this.state.loading
      ? <p><em>Загрузка...</em></p>
      : this.renderOrders(this.state.orders);
    return (
      <div>{contents}
        {
          this.state.redirect && <Navigate to={this.state.link} replace={true} />
        }
      </div>
    )
  }
}
