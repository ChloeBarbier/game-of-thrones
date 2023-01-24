import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import BookRow from '../components/BookRow';
import Loading from '../components/Loading';
import { getBooks } from '../server/api';
import { bookType } from '../typing';

const styles = {
  title: { fontWeight: 'bold' },
};

const Books = () => {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery<bookType[], AxiosError>({
    queryKey: ['books'],
    queryFn: () => getBooks(),
  });

  if (error)
    return <div>{`Error, loading books failed: ${error ? error.message : ''}`}</div>;

  if (isLoading) return <Loading />;

  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        {books && books.length && (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.title}>Name</TableCell>
                  <TableCell sx={styles.title}>Authors</TableCell>
                  <TableCell sx={styles.title}>Pov characters</TableCell>
                  <TableCell sx={styles.title}>Characters</TableCell>
                  <TableCell sx={styles.title}>Country</TableCell>
                  <TableCell sx={styles.title}>Media type</TableCell>
                  <TableCell sx={styles.title}>Released</TableCell>
                  <TableCell sx={styles.title}>Publisher</TableCell>
                  <TableCell sx={styles.title}>Pages</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {books.map((book: bookType) => (
                  <BookRow key={book.isbn} book={book} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default Books;
