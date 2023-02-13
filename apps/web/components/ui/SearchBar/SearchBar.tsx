import SearchIcon from '@icons/SearchIcon';
import { useFormik } from 'formik';
import { StyledSearchBar, StyledSearchButton } from './SearchBar.styles';

export default function SearchBar() {
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <StyledSearchBar onSubmit={formik.handleSubmit}>
      <StyledSearchButton type='submit'>
        <SearchIcon width={24} height={24} />
      </StyledSearchButton>
      <input
        id='search'
        placeholder='Find a new interest'
        type='search'
        onChange={formik.handleChange}
        value={formik.values.search}
      />
    </StyledSearchBar>
  );
}
