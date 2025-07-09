import axios from "axios";

// Update baseURL to route through API Gateway
const fineServiceApi = axios.create({
  baseURL: "http://localhost:8080/api/fines",
});

export const getFines = () => fineServiceApi.get("");
export const getFineById = (fineId) => fineServiceApi.get(`/${fineId}`);
export const getFinesByMemberId = (memberId) =>
  fineServiceApi.get(`/member/${memberId}`);
export const getPendingFines = () => fineServiceApi.get("/pending");
export const getTotalPendingFinesByMember = (memberId) =>
  fineServiceApi.get(`/member/${memberId}/total`);
export const createFine = (transactionId, fineType) =>
  fineServiceApi.post(`/${transactionId}/${fineType}`);
export const payFine = (fineId) => fineServiceApi.put(`/${fineId}/pay`);
export const reverseFine = (fineId) =>
  fineServiceApi.put(`/${fineId}/reverse`);
export const updateFines = () => fineServiceApi.put("/update-fines");
export const deleteFine = (fineId) => fineServiceApi.delete(`/${fineId}`);
export const cancelFine = (fineId) => fineServiceApi.put(`/${fineId}/cancel`);

export default fineServiceApi;
