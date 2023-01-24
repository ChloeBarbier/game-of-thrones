import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

import CharacterRow from '../components/CharacterRow';
import Loading from '../components/Loading';
import { getBook } from '../server/api';
import { bookType } from '../typing';

const styles = {
  title: { fontWeight: 'bold' },
};

const Book = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { book } = state;
  const [enabled, setEnabled] = useState(false);

  const { params } = useMatch('/books/:id') || {};
  const { id } = params || {};

  const { data, isLoading, error } = useQuery<bookType, AxiosError>({
    queryKey: ['character'],
    queryFn: () => getBook(id),
    enabled: enabled && !!id,
    onError: () => navigate(-1),
  });

  useEffect(() => {
    if (!book && id) setEnabled(true);
  }, [book]);

  if (error)
    return <div>{`Error, loading book failed: ${error ? error.message : ''}`}</div>;

  if (isLoading || !book) return <Loading />;

  const { authors, name, povCharacters } = book || data || {};

  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8} container direction="row" alignItems="baseline">
        <Grid item xs={4} container alignItems="flex-start">
          <Typography sx={styles.title} variant="h5" color="primary">
            Book
          </Typography>
        </Grid>
        <Grid item xs={8} container alignItems="flex-start">
          <Typography color="primary">{name}</Typography>
        </Grid>
        <Grid item xs={4} container alignItems="flex-start">
          <Typography sx={styles.title} variant="h6" color="primary">
            Author(s)
          </Typography>
        </Grid>
        <Grid item xs={8} container alignItems="flex-start">
          <Typography color="primary">{authors[0]}</Typography>
        </Grid>
        <Grid item xs={4} container alignItems="flex-start">
          <Typography sx={styles.title} variant="h6" color="primary">
            Characters
          </Typography>
        </Grid>
        <Grid item xs={8} container alignItems="flex-start">
          <Typography color="primary">{povCharacters?.length}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={2} />
      <Grid item xs={8}>
        {povCharacters && povCharacters.length && (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.title}>Name</TableCell>
                  <TableCell sx={styles.title}>Gender</TableCell>
                  <TableCell sx={styles.title}>Culture</TableCell>
                  <TableCell sx={styles.title}>Born</TableCell>
                  <TableCell sx={styles.title}>Died</TableCell>
                  <TableCell sx={styles.title}>Titles</TableCell>
                  <TableCell sx={styles.title}>Aliases</TableCell>
                  {/* <TableCell sx={styles.title}>Father</TableCell> */}
                  {/* <TableCell sx={styles.title}>Mother</TableCell> */}
                  {/* <TableCell sx={styles.title}>Spouse</TableCell> */}
                  <TableCell sx={styles.title}>Allegiances</TableCell>
                  <TableCell sx={styles.title}>Books</TableCell>
                  <TableCell sx={styles.title}>Pov books</TableCell>
                  <TableCell sx={styles.title}>TV Series</TableCell>
                  <TableCell sx={styles.title}>Played By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {povCharacters.map((povCharacter: string) => (
                  <CharacterRow key={book.isbn + '-' + povCharacter} url={povCharacter} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default Book;
