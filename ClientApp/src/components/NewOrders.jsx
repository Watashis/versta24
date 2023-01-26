import React, { Component } from 'react';
import { NavLink, Navigate } from 'react-router-dom'
import "../style/createOrder.css"

export class NewOrders extends Component {
  static displayName = NewOrders.name;
  constructor(props) {
    super(props)
    this.save = this.save.bind(this);
    this.state = {
      cityFrom: "",
      addressFrom: "",
      cityTo: "",
      addressTo: "",
      weight: "",
      colldate: "",
      redirect: false,
      link: ""
    }
  }
  async save() {
    let data = {
      cityFrom: this.state.cityFrom,
      addressFrom: this.state.addressFrom,
      cityTo: this.state.cityTo,
      addressTo: this.state.addressTo,
      weight: this.state.weight,
      colldate: this.state.colldate,
    }
    if (Object.keys(data).filter(j =>data[j]=='').length==0) {
      let response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });

      let result = await response.json();
      console.log(result)
      this.setState({ link: `/order/${result}`, redirect: true })
    }else{
      alert('Все поля являются обязательными')
    }
  }

  render() {
    return (
      <div className='createOrder'>
        <h2>Создание нового заказа</h2>
        <div className='table'>
          <div>
            <label>Город отправителя:</label>
            <input className='form-control' onChange={e => this.setState({ cityFrom: e.target.value })}></input>
            <label>Адрес отправителя:</label>
            <input className='form-control' onChange={e => this.setState({ addressFrom: e.target.value })}></input>
          </div>
          <div>

            <label>Город получателя:</label>
            <input className='form-control' onChange={e => this.setState({ cityTo: e.target.value })}></input>
            <label>Адрес получателя:</label>
            <input className='form-control' onChange={e => this.setState({ addressTo: e.target.value })}></input>
          </div>
        </div>
        <div className='footer'>
          <label>Вес груза:</label>
          <input className='form-control' onChange={e => this.setState({ weight: e.target.value })}></input>
          <label>Дата забора груза:</label>
          <input className='form-control' type="datetime-local" onChange={e => this.setState({ colldate: e.target.value })}></input>
        </div>

        <div className='btn-group right'>
          <NavLink className="btn btn-outline-danger" to="/">Отмена</NavLink>
          <button type="button" className="btn btn-outline-success" onClick={this.save}>Сохранить</button>
        </div>
        {
          this.state.redirect && <Navigate to={this.state.link} replace={true} />
        }
      </div>
    );
  }
}
