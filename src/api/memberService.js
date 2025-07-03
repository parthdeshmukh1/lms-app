// memberService.js
import axios from 'axios';

// Update baseURL to route through API Gateway
const memberServiceApi = axios.create({
  baseURL: 'http://localhost:8080/member-service/api/members',
});

export const getMembers = () => memberServiceApi.get('/');
export const addMember = (memberData) => memberServiceApi.post('/', memberData);
export const updateMember = (memberId, memberData) => memberServiceApi.put(`/${memberId}`, memberData);
export const deleteMember = (memberId) => memberServiceApi.delete(`/${memberId}`);

export default memberServiceApi;