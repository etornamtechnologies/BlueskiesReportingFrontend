import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ThemeProvider } from 'react-bootstrap';

function App() {
  return (
    <>
    <ThemeProvider prefixes={{ btn: 'my-btn' }}>
        <Button variant='primary'>My Button</Button>
    </ThemeProvider>
    <div className="App">
    </div>
    </>
  );
}

export default App;
