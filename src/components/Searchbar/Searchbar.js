// import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

export default function SearchBar({ onSubmit }) {
  const [queryInput, setQueryInput] = useState('');

  const handleNameChange = event => {
    setQueryInput(event.currentTarget.value.toLowerCase());
  };

  const onChange = event => {
    event.preventDefault();

    if (queryInput.trim() === '') {
      toast('Please enter search query!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    onSubmit(queryInput);
    setQueryInput('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={onChange}>
        <button type="submit" aria-label="Search" className={s.button}>
          <span className={s.buttonLabel}>
            <BsSearch />
          </span>
        </button>
        <input
          className={s.input}
          type="text"
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
          value={queryInput}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
