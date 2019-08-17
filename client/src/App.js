import React from 'react';
import Title from './components/Title';
import Add from './components/Add';
import List from './components/List';

function App() {
  return (
    <div className="container">
      <Title />
      <br />
      <Add />
      <br />
      <List />
    </div>
  );
}

export default App;
