import axios from "axios";


const configDefault = { port: 5010, name: 'Not API', description: 'Mock Restful API' };

export const apiService = {
    getConfigData: async (port = 5022) => {
        const response = await axios.get(`http://localhost:${port}/not-api/config/data/`);
        return {
            ...response?.data
        }
    },
    getConfig: async (port = 5022) => {
        const response = await axios.get(`http://localhost:${port}/not-api/config/`);
        return {
            ...configDefault,
            ...response?.data
        }
    }
};
