import css from './ContactList.module.css';
import ContactItem from 'components/ContactItem';
import { PropTypes } from 'prop-types';

const ContactList = ({ contacts, onRemove }) => {
  return (
    <ul className={css.container}>
      {contacts.map(({ id, name, number }, index) => (
        <ContactItem
          key={id}
          name={name}
          number={number}
          id={id}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  onRemove: PropTypes.func.isRequired,
};
export default ContactList;
