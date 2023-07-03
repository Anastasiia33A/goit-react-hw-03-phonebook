import { nanoid } from "nanoid";
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { Component } from "react";
import css from './ContactForm.module.css';

class ContactForm extends Component{
    state = {
        name: '', number: '',
    };


    nameID = nanoid();
    numberID = nanoid();

    handleChange = evt => {
        const { name, value } = evt.currentTarget;
        
        this.setState({ [name]: value, });
    };
    handleSubmit = evt => {
        evt.preventDefault();
        this.props.onSubmit(this.state);
        this.resetForm();

    }
    // reset form after submit
    resetForm = () => {
        this.setState({
            id: '',
            name: '',
            number: '',
        });
    };

    render() {
        return (
            <Formik>
            <form className={css.form} onSubmit={this.handleSubmit}>
                    <label className={css.label} htmlFor={this.nameId}>
                        Name
                        <input className={css.input}
                            id={this.nameID}
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label className={css.label} htmlFor={this.numberId}>
                        Number
                      <input className={css.inputNumber}
                            id={this.numberID}
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                            value={this.state.number}
                            onChange={this.handleChange}
                        />   
                    </label>
                    <button className={css.button} type="submit">Add contact</button>
            </form>
            </Formik>

        );
    }
};

ContactForm.propType = {
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
