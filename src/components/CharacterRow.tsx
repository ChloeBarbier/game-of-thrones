import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { getCharacter } from '../server/api';
import { characterType } from '../typing';
import Loading from './Loading';

interface props {
  url: string;
}

const CharacterRow = ({ url }: props) => {
  const navigate = useNavigate();

  const {
    data: character,
    isLoading,
    error,
  } = useQuery<characterType, AxiosError>({
    queryKey: [`character-${url}`],
    queryFn: () => getCharacter(url),
    enabled: !!url && url.length > 0,
    onError: () => navigate(-1),
  });

  if (error)
    return <div>{`Error, loading character failed: ${error ? error.message : ''}`}</div>;

  if (isLoading) return <Loading />;

  const {
    name,
    gender,
    culture,
    born,
    died,
    titles,
    aliases,
    // father,
    // mother,
    // spouse,
    allegiances,
    books,
    povBooks,
    tvSeries,
    playedBy,
  } = character || {};

  return (
    <TableRow
      hover
      key={url}
      sx={{
        height: '150px',
        '&:last-child td, &:last-child th': { border: 0 },
        '&:hover': { cursor: 'pointer' },
      }}
    >
      <TableCell>{name}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{culture}</TableCell>
      <TableCell>{born}</TableCell>
      <TableCell>{died}</TableCell>
      <TableCell>{titles?.length}</TableCell>
      <TableCell>{aliases?.length}</TableCell>
      {/* TODO Link between related characters */}
      {/* <TableCell>{father}</TableCell> */}
      {/* <TableCell>{mother}</TableCell> */}
      {/* <TableCell>{spouse}</TableCell> */}
      <TableCell>{allegiances?.length}</TableCell>
      <TableCell>{books?.length}</TableCell>
      <TableCell>{povBooks?.length}</TableCell>
      <TableCell>{tvSeries?.length}</TableCell>
      <TableCell>{playedBy?.length}</TableCell>
    </TableRow>
  );
};

export default CharacterRow;
