import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDependencyInjection } from '../context/dependencyInjectionContext';
import { updatePharmacyInList } from '../pharmacySlice';
import '../styles/pharmacyUpdateForm.css';

const PharmacyUpdateForm = () => {
  const { pharmacyApi } = useDependencyInjection();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useSelector((state) => state.pharmacy.pharmacies);

  const [pharmacy, setPharmacy] = useState(null);
  const [originalPharmacy, setOriginalPharmacy] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPharmacyDetails = async () => {
      const data = await pharmacyApi.getPharmacyById(id);
      setPharmacy(data);
      setOriginalPharmacy(data); 
    };

    fetchPharmacyDetails();
  }, [id, pharmacyApi]);

  const [errors, setErrors] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    rxFilledMtd: '',
  });

  const handleUpdate = async () => {
    const validationErrors = validateForm();
    if (Object.values(validationErrors).some((error) => error !== '')) {
      return;
    }

    try {
      const updatedPharmacy = await pharmacyApi.updatePharmacy(id, pharmacy);
      dispatch(updatePharmacyInList(updatedPharmacy));

      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error updating pharmacy:', error.message);
      setIsError(true);
    }
  };

  const handleCancel = () => {
    
    setPharmacy(originalPharmacy);
    setErrors({
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      rxFilledMtd: '',
    });
  };

  const handleBack = () => {
    navigate(`/`);
  };

  const handleChange = (e) => {
    setPharmacy({
      ...pharmacy,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: pharmacy.name.length < 5 ? 'Name is too short' : '',
      address: pharmacy.address.length < 5 ? 'Address is too short' : '',
      city: pharmacy.city.length < 3 ? 'City is too short' : '',
      state: pharmacy.state.length < 3 ? 'State is too short' : '',
      zip: /^\d{5}(?:[-\s]\d{4})?$/.test(pharmacy.zip) ? '' : 'Invalid ZIP code'
      
    };

    setErrors(newErrors);
    return newErrors;
  };

  if (!pharmacy) {
    return <div className="update-form-container">Loading...</div>;
  }

  return (
    <div className="update-form-container">
      <h2>Update Pharmacy</h2>
      {isSuccess && <div className="success-message">Pharmacy updated successfully.</div>}
      {isError && <div className="error-message">Error updating pharmacy. Please try again.</div>}
      <form className="form-group">
        <input type="hidden" name="pharmacyId" value={pharmacy.pharmacyId} />
        <label>
          Name:
          <input type="text" name="name" value={pharmacy.name} onChange={handleChange} />
          {errors.name && <div>{errors.name}</div>}
        </label>
        <label>
          Address:
          <input type="text" name="address" value={pharmacy.address || ''} onChange={handleChange} />
          {errors.address && <div>{errors.address}</div>}
        </label>
        <label>
          City:
          <input type="text" name="city" value={pharmacy.city || ''} onChange={handleChange} />
          {errors.city && <div>{errors.city}</div>}
        </label>
        <label>
          State:
          <input type="text" name="state" value={pharmacy.state || ''} onChange={handleChange} />
          {errors.state && <div>{errors.state}</div>}
        </label>
        <label>
          Zip:
          <input type="text" name="zip" value={pharmacy.zip || ''} onChange={handleChange} />
          {errors.zip && <div>{errors.zip}</div>}
        </label>
        <label>
          Filled Prescriptions:
          <input type="number" name="rxFilledMtd" value={pharmacy.rxFilledMtd || 0} onChange={handleChange} />
          {errors.rxFilledMtd && <div>{errors.rxFilledMtd}</div>}
        </label>
      </form>
      <div className="form-group">
        <button onClick={handleUpdate}>Save Changes</button>
        <button onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
        <button onClick={handleBack} className='back-button'>
              Back to List
        </button>   
      </div>
    </div>
  );
};

export default PharmacyUpdateForm;
