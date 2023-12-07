import { useDispatch, useSelector } from 'react-redux';
import React, {  useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDependencyInjection } from '../context/dependencyInjectionContext';
import { setPharmacies } from '../pharmacySlice';
import '../styles/pharmacyList.css';

const PharmacyList = () => {
  const { pharmacyApi } = useDependencyInjection();
  const dispatch = useDispatch();
  const pharmacies = useSelector((state) => state.pharmacy.pharmacies);


  useEffect(() => {
    const fetchPharmacies = async () => {
      const data = await pharmacyApi.getPharmacies();
      dispatch(setPharmacies(data));
    };

    fetchPharmacies();
  }, [dispatch, pharmacyApi]);

  return (
    <div>
 
      <table className="pharmacy-table">
        <thead>
          <tr>
            <th>Name</th>         
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Filled Prescriptions</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies.map((pharmacy) => (
            <tr key={pharmacy.pharmacyId}>
              <td>
                <NavLink to={`/pharmacy/${pharmacy.pharmacyId}`}>{pharmacy.name}</NavLink>
              </td>             
              <td>{pharmacy.address}</td>
              <td>{pharmacy.city}</td>
              <td>{pharmacy.state}</td>
              <td>{pharmacy.zip}</td>
              <td>{pharmacy.rxFilledMtd}</td>
              <td>{pharmacy.createdDate}</td>
              <td>{pharmacy.updatedDate || 'Not Updated'}</td>
              <td>
                <NavLink to={`/update/${pharmacy.pharmacyId}`}>
                  <button>Edit</button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacyList;
