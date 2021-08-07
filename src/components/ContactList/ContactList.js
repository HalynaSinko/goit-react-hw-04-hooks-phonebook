import PropTypes from "prop-types";

import s from "./ContactList.module.css";

const ContactListItem = ({ id, name, number, onRemove }) => {
  return (
    <li key={id} className={s.listItem}>
      <span className={s.name}>{name}: </span>
      <span className={s.number}>{number}</span>
      <button onClick={() => onRemove(id)} className={s.btn}>
        Deleted
      </button>
    </li>
  );
};

const ContactList = ({ contacts, onRemove }) => {
  if (contacts.length === 0) return null;
  return (
    <ul className={s.list}>
      {contacts.map((contact) => ContactListItem({ ...contact, onRemove }))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func.isRequired,
};

export default ContactList;
