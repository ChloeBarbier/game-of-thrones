import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

import { bookType } from '../typing';

interface props {
  book: bookType;
}

const BookRow = ({ book }: props) => {
  const navigate = useNavigate();
  const onClick = (book: bookType) =>
    navigate(`/books/${book.isbn}`, { state: { book: book } });

  return (
    <TableRow
      hover
      onClick={() => onClick(book)}
      key={book.name}
      sx={{
        height: '150px',
        '&:last-child td, &:last-child th': { border: 0 },
        '&:hover': { cursor: 'pointer' },
      }}
    >
      <TableCell>{book.name}</TableCell>
      <TableCell>{book.authors[0]}</TableCell>
      <TableCell>{book.povCharacters.length}</TableCell>
      <TableCell>{book.characters.length}</TableCell>
      <TableCell>{book.country}</TableCell>
      <TableCell>{book.mediaType}</TableCell>
      <TableCell>{new Date(book.released).toLocaleDateString('en')}</TableCell>
      <TableCell>{book.publisher}</TableCell>
      <TableCell>{book.numberOfPages}</TableCell>
    </TableRow>
  );
};

export default BookRow;
