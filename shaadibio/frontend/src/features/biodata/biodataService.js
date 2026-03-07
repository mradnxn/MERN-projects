import axios from 'axios';

const API_URL = 'https://shaadibio-server.onrender.com/api/biodatas/';

// Create new biodata
const createBiodata = async (biodataData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, biodataData, config);

  return response.data;
};

// Get user biodatas
const getBiodatas = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get specific biodata
const getBiodata = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + id, config);

  return response.data;
};

// Update biodata
const updateBiodata = async (id, biodataData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // If using FormData (for image uploads), do not explicitly set Content-Type
  // Axios will automatically set multipart/form-data boundary
  const response = await axios.put(API_URL + id, biodataData, config);

  return response.data;
};

const biodataService = {
  createBiodata,
  getBiodatas,
  getBiodata,
  updateBiodata,
};

export default biodataService;
