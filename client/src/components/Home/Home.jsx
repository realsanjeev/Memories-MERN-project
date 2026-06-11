import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grow, Grid, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Pagination/Pagination';

import { getPostsBySearch } from '../../store/slices/postsSlice';
import { StyledGrid, StyledPaper, PaperSearchBar, SearchButton } from './styles';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  useEffect(() => {
    const tagsParam = query.get('tags');

    if (searchQuery && tagsParam) {
      setSearch(searchQuery);
      setTags(tagsParam.split(',').map((tag) => tag.trim()));
      dispatch(getPostsBySearch({ search: searchQuery, tags: tagsParam }));
    }
  }, [searchQuery, query, dispatch]);

  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPost();
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    setTags(tags.filter((tag) => tag !== chipToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <StyledGrid
          container
          sx={{ justifyContent: 'space-between', alignItems: 'stretch', width: '100%' }}
          spacing={3}
        >
          <Grid size={{ xs: 12, sm: 6, md: 9 }}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <PaperSearchBar elevation={6}>
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div style={{ padding: '5px 2px', width: '94%' }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    variant="outlined"
                    label={tag}
                    onDelete={() => handleDeleteChip(tag)}
                  />
                ))}
              </div>
              <TextField
                name="tags"
                variant="outlined"
                label="Search Tags (comma separated)"
                fullWidth
                autoComplete="off"
                value={tags.join(',')}
                onChange={(e) =>
                  setTags(e.target.value.split(',').map((tag) => tag.trim()))
                }
              />
              <SearchButton onClick={searchPost} variant="contained" color="primary" fullWidth>
                Search
              </SearchButton>
            </PaperSearchBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <StyledPaper elevation={6}>
                <Paginate page={page} />
              </StyledPaper>
            )}
          </Grid>
        </StyledGrid>
      </Container>
    </Grow>
  );
};

export default Home;
