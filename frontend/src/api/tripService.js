import api from './axios';

export const tripService = {
    generateTrip: async (tripData) => {
        const response = await api.post('/v1/trips', tripData);
        return response.data;
    },
    
    getAllTrips: async () => {
        const response = await api.get('/v1/trips');
        return response.data;
    },
    
    getCredits: async (userId) => {
        const response = await api.get(`/v1/trips/credits/${userId}`);
        return response.data;
    }
};

export default tripService;
