// transactionService.js
import axios from 'axios';

// Update baseURL to route through API Gateway
const transactionServiceApi = axios.create({
  baseURL: 'http://localhost:8080/api/transactions',
});

export const getTransactions = () => transactionServiceApi.get('');
export const getTransactionById = (transactionId) => transactionServiceApi.get(`/${transactionId}`);
export const addTransaction = (transactionData) => transactionServiceApi.post('/', transactionData);
export const updateTransaction = (transactionId, transactionData) => transactionServiceApi.put(`/${transactionId}`, transactionData);
export const deleteTransaction = (transactionId) => transactionServiceApi.delete(`/${transactionId}`);

export default transactionServiceApi;