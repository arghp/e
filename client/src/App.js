import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Shop from './containers/Shop/Shop';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Shop />
        </div>
      </BrowserRouter>
  );
}

export default App;
