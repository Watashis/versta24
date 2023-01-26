import React, { Component } from 'react';
export class OrderItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="list-group-item list-group-item-action" onClick={this.props.click}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Заказ №{this.props.id}</h5>
                    <small>{this.props.date}</small>
                </div>
                <p className="mb-1">{this.props.cityFrom}</p>
                <small>{this.props.cityTo}</small>
            </div>
        )
    }
}