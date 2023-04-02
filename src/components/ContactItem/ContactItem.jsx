import css from './ContactItem.module.css';
import { PropTypes } from 'prop-types';

const ContactItem = ({ id, name, number, onRemove }) => {
  return (
    <li className={css.item}>
      <p>
        {name}: {number}
      </p>
      <button
        type="button"
        className={css.button}
        onClick={() => {
          onRemove(id);
        }}
      >
        Remove
      </button>
    </li>
  );
};
ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
export default ContactItem;
