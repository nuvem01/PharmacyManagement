import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PharmacyList from './components/PharmacyList';
import PharmacyDetails from './components/PharmacyDetails';
import PharmacyUpdateForm from './components/PharmacyUpdateForm';

const App = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return(
    <div>
      <span>{isDevelopment ? 'Dev Environment' : 'Prod Environment'}</span>
        <Routes>
          <Route path="/" element={<PharmacyList />} />
          <Route path="/pharmacy/:id" element={<PharmacyDetails />} />
          <Route path="/update/:id" element={<PharmacyUpdateForm />} />
        </Routes>
    </div>
  )
  
}


export default App;
