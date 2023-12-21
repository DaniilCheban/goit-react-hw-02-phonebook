import React, { Component } from 'react';
import { nanoid } from 'nanoid';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { contacts, onAddContact } = this.props;

    if (name.trim() === '' || number.trim() === '') {
      alert('Please enter both name and number');
      return;
    }

    const isDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isDuplicateNumber = contacts.some(
      contact => contact.number === number
    );

    if (isDuplicateName || isDuplicateNumber) {
      alert('Contact with the same name or number already exists');
      return;
    }

    onAddContact({
      id: nanoid(),
      name,
      number,
    });

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Number:
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
