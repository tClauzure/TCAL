import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getEvents = async () => {
    const response = await axios.get(`${API_URL}/api/events`);
    return response.data;
};