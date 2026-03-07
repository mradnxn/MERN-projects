// URL for the backend API
const API_URL = 'https://shaadibio-server.onrender.com/api/auth/';

// Register user
const register = async (userData) => {
  const response = await fetch(API_URL + 'register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error occurred during registration');
  }

  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  return data;
};

// Login user
const login = async (userData) => {
  const response = await fetch(API_URL + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Invalid credentials');
  }

  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  return data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('userInfo');
};

// Update profile
const updateProfile = async (userData, token) => {
  const response = await fetch(API_URL + 'update-profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error occurred during profile update');
  }

  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  return data;
};

const authService = {
  register,
  login,
  logout,
  updateProfile,
};

export default authService;
