import './App.css';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChairIcon from '@mui/icons-material/Chair';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Book from './pages/Book';
import Books from './pages/Books';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'grey',
    height: '4rem',
  },
  paper: { height: '100%', width: '100%' },
  logo: {
    cursor: 'pointer' as const,
    position: 'relative' as const,
    left: 0,
    top: 0,
    width: '3rem',
    margin: '.75rem',
  },
  appContent: {
    position: 'relative' as const,
    minHeight: '100vh',
  },
  main: {
    paddingBottom: '2.5rem',
  },
  footer: {
    position: 'absolute' as const,
    bottom: 0,
    height: '2.5rem',
    width: '100%',
  },
};

function App() {
  // QueryClient options by default are reset up to prevent unecessary refetchings
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div style={styles.appContent}>
          <header style={styles.header}>
            <Paper square style={styles.paper} elevation={8}>
              <Grid container spacing={2} direction="row" alignItems="center">
                <Grid item xs={4} container justifyContent="flex-start">
                  <IconButton
                    sx={{ marginLeft: '1rem', paddingTop: '1rem' }}
                    onClick={() => navigate('/')}
                    size="small"
                    color="primary"
                  >
                    <ChairIcon sx={{ color: 'primary' }} />
                  </IconButton>
                </Grid>
                <Grid item xs={4} />
                <Grid
                  item
                  xs={4}
                  container
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <IconButton
                    sx={{ marginRight: '1rem', paddingTop: '1.6rem' }}
                    size="small"
                    color="primary"
                  >
                    <AccountCircleIcon
                      sx={{ color: 'primary', paddingRight: '0.75rem' }}
                    />
                    Jon Snow
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </header>
          <main style={{ paddingTop: '50px', paddingBottom: '100px' }}>
            <Grid container style={{ marginTop: 16, marginBottom: 16 }} spacing={3}>
              <Routes>
                <Route path="/" element={<Books />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<Book />} />
                {/* <Route path="/character/:id/related/:id" element={<Realted />} /> */}
                <Route path="*" element={<Books />} />
              </Routes>
            </Grid>
          </main>
          <footer style={styles.footer}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Paper
                  square
                  style={{ fontSize: '0.8rem', width: '100%', paddingBottom: '30px' }}
                  elevation={8}
                >
                  <Grid container alignItems="center" spacing={4}>
                    <Grid item xs={4}>
                      <div style={{ textAlign: 'left', paddingLeft: '30px' }}>
                        janvier 2023
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}
                      >
                        Game of thrones - React test
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ textAlign: 'right', paddingRight: '30px' }}>
                        Barbier chloé
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </footer>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
