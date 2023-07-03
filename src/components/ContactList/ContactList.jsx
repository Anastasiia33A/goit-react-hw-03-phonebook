import PropTypes from 'prop-types';
import React from 'react';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
    <div className={css.container}>
        <ul >{contacts.map(({ id, name, number }) => (
            <li  className={css.list} key={id}>
                <p className={css.name}>{name}</p>
                <p className={css.number}>{number}</p>
                <button className={css.button} type="button" onClick={() => onDeleteContact(id)} >Delete</button>
            </li>
        ))}
        </ul>
    </div>
);

ContactList.propType = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
    onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;