import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/slices/notificationSlice.js';
import socket from '../socket/socket.js';

export default function useSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    socket.on('notification', payload => {
      dispatch(addNotification(payload));
    });

    return () => {
      socket.off('notification');
      socket.disconnect();
    };
  }, [dispatch]);
}
