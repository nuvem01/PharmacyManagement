import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectPharmacy } from '../pharmacySlice';
import { useDependencyInjection } from '../context/dependencyInjectionContext';

import '../styles/pharmacyDetails.css';

const PharmacyDetails = () => {
  const { pharmacyApi } = useDependencyInjection();
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const pharmacy = useSelector((state) => state.pharmacy.selectedPharmacy);

  useEffect(() => {
    const fetchPharmacyDetails = async () => {
      const data = await pharmacyApi.getPharmacyById(id);
      dispatch(selectPharmacy(data));
    };

    fetchPharmacyDetails();
  }, [dispatch, id, pharmacyApi]);

  const handleBack = () => {
    navigate(`/`);
  };

  if (!pharmacy) {
    return <div className="details-container">Loading...</div>;
  }

  return (
    <div className="details-container">
      <h2 className="details-heading">Pharmacy Details</h2>
      <div className="details-item">
        <span className="details-label">Name:</span> {pharmacy.name}
      </div>
      <div className="details-item">
        <span className="details-label">Address:</span> {pharmacy.address}
      </div>
      <div className="details-item">
        <span className="details-label">City:</span> {pharmacy.city}
      </div>
      <div className="details-item">
        <span className="details-label">State:</span> {pharmacy.state}
      </div>
      <div className="details-item">
        <span className="details-label">Zip:</span> {pharmacy.zip}
      </div>
      <div className="details-item">
        <span className="details-label">Number of Filled Prescriptions:</span> {pharmacy.rxFilledMtd}
      </div>
      <div className="details-item">
        <span className="details-label">Created Date:</span> {pharmacy.createdDate}
      </div>
      <div className="details-item">
        <span className="details-label">Updated Date:</span> {pharmacy.updatedDate || 'Not Updated'}
      </div> 

        <button onClick={handleBack}>
              Back to List
        </button>   
    </div>    
  );  
};

export default PharmacyDetails;
