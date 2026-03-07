import axios from 'axios';

const API_URL = 'https://shaadibio-server.onrender.com/api/payment/';

// Upgrade to premium
const upgradeToPremium = async (token) => {
  const response = await fetch(API_URL + 'upgrade-to-premium', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to upgrade to premium');
  }

  if (data) {
    // Update local storage token with the new one containing premium status
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  return data;
};

const paymentService = {
  upgradeToPremium,
};

export default paymentService;
