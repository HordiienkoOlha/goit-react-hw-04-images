import { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { getPhotos } from '../services/api';
import { mapper } from '../helpers/mapper';

import s from '../components/App.module.css';

export default function App() {
  const [queryInput, setQueryInput] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!queryInput) {
      return;
    }
    fetchPhotos(queryInput, page);
  }, [queryInput, page]);

  const fetchPhotos = (query, page) => {
    setIsLoading(true);

    getPhotos(query, page)
      .then(({ data }) => {
        setPhotos(prevPhotos => [...prevPhotos, ...mapper(data.hits)]);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };
  const onLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const onSearch = queryInput => {
    setQueryInput(queryInput);
    setPhotos([]);
    setPage(1);
  };

  const addLink = newLink => {
    setLargeImageURL(newLink);
  };

  const openModal = () => setActive(true);
  const closeModal = () => setActive(false);

  return (
    <div className={s.app}>
      <Searchbar onSubmit={onSearch} />

      {photos.length > 0 && (
        <>
          <ImageGallery
            onSubmit={addLink}
            photos={photos}
            openModal={openModal}
          />
        </>
      )}
      {(isLoading && <Loader />) ||
        (photos.length > 0 && (
          <Button name={'Load more'} onHandle={onLoadMore} />
        ))}
      {active && (
        <Modal
          // id={id}
          largeImageURL={largeImageURL}
          alt={'enlarged image'}
          active={active}
          closeModal={closeModal}
        />
      )}
      <ToastContainer />
    </div>
  );
}
