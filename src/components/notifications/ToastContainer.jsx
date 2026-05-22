import { useSelector } from 'react-redux';

function ToastContainer() {
  const notifications = useSelector(state => state.notifications.list);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {notifications.slice(0, 4).map((toast, index) => (
        <div key={index} className="card-bg rounded-3xl px-5 py-4">
          <p className="text-sm font-semibold text-text-primary">{toast.title}</p>
          <p className="mt-1 text-sm text-text-muted">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
