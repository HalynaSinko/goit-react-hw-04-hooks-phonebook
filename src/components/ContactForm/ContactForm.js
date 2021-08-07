import { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import s from "./ContactForm.module.css";

const INITIAL_STATE = {
  name: "",
  number: "",
};

class ContactForm extends Component {
  state = INITIAL_STATE;

  handleChangeForm = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log("name", name, "-----", "value", value);
  };

  handleSubmitForm = (event) => {
    event.preventDefault();

    const { name, number } = this.state;
    const { onSubmit } = this.props;

    onSubmit({ id: uuidv4(), name, number });

    this.reset();
  };

  reset = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmitForm} className={s.form}>
        <label className={s.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChangeForm}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            className={s.input}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChangeForm}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять из цифр, может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            className={s.input}
          />
        </label>
        <button className={s.btn}>Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
