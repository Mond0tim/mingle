'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchForm.module.css';
import SearchIcon from '@/public/icons/searchIcon.svg'
import FocusRing from "material-web-components-react/focus-ring";
import cn from 'classnames'

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsTyping(false); // Сбрасываем состояние после отправки формы
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setIsTyping(newQuery.trim().length > 0);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <FocusRing for="searchInput" className="focusRing"></FocusRing>
      <input
      id="searchInput"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className={cn(styles.searchInput, {
          [styles.isTyping]: isTyping == true
               }       )}
      />
      
      {isTyping ? (
          <button type="submit" className={styles.searchButton}>
            <SearchIcon />
          </button>
      ) : (
        <div className={styles.placeholder_icon}>
        <SearchIcon/>
        </div>
      )}
    </form>
  );
};

export default SearchForm;