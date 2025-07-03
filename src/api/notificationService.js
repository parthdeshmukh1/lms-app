// notificationService.js
import axios from 'axios';

// Update baseURL to route through API Gateway
const notificationServiceApi = axios.create({
  baseURL: 'http://localhost:8080/notification-service/api/notifications',
});

export const getNotifications = () => notificationServiceApi.get('/');
export const addNotification = (notificationData) => notificationServiceApi.post('/', notificationData);
export const updateNotification = (notificationId, notificationData) => notificationServiceApi.put(`/${notificationId}`, notificationData);
export const deleteNotification = (notificationId) => notificationServiceApi.delete(`/${notificationId}`);

export default notificationServiceApi;