const baseUrl = 'https://localhost:7260';

const pharmacyApi = {
  getPharmacies: async () => {
    const response = await fetch(`${baseUrl}/Pharmacy`);
    const data = await response.json();
    return data;
  },

  getPharmacyById: async (id) => {
    const response = await fetch(`${baseUrl}/Pharmacy/${id}`);
    const data = await response.json();
    return data;
  },

  updatePharmacy: async (id, updatedPharmacy) => {
    const response = await fetch(`${baseUrl}/Pharmacy`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPharmacy),
    });

    if (!response.ok) {
      // Handle error here
      const errorData = await response.json();
      throw new Error(`Failed to update pharmacy: ${errorData.message}`);
    }

    const updatedData = await response.json();
    return updatedData;
  },
};

export default pharmacyApi;

