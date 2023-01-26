import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'

export class Order extends Component {
    static displayName = Order.name;
    constructor(props) {
        super(props)
        this.state = {
            order: {},
            loading: true,
            redirect: false,
            link: ""
        };
    }
    componentDidMount() {
        this.getOrder(window.location.pathname.split('/')[2]);
    }
    async getOrder(id) {
        let response = await fetch(`api/orders/${id}`);
        let data = await response.json();
        this.setState({ order: data, loading: false });
    }
    renderOrder(order) {
        return (
            <div>
                <h3>Номер заказа {order.orderid}</h3>
                <div>
                    <div>Город отправителя: {order.cityFrom}</div>
                    <div>Адрес отправителя: {order.addressFrom}</div>
                    <div>Город получателя: {order.cityTo}</div>
                    <div>Адрес отправителя: {order.addressTo}</div>
                    <div>Вес груза: {order.weight}</div>
                    <div>Дата забора груза: {new Date(order.colldate).toLocaleString()}</div>
                </div>
                
          <NavLink className="btn btn-outline-dark" to="/" style={{marginTop: '1rem'}}>Назад</NavLink>
            </div>
        )
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : this.renderOrder(this.state.order);
        return (
            <div>
                {contents}
            </div>
        )
    }
}
