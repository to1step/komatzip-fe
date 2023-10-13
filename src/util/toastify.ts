import { toast } from 'react-toastify';

// 성공 알람 ( 초록색 창 )
export const success = (v?: string) =>
  toast.success(`🦄 ${v ?? 'success!'}`, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// 실패 알람 ( 빨간색 창 )
export const errors = (v?: string) =>
  toast.error(`🦄 ${v ?? 'error!'}`, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// 경고 알람 ( 노란색 창 )
export const warning = (v?: string) =>
  toast.warn(`🦄 ${v ?? 'warning!'}`, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// 정보 알람
export const info = (v?: string) =>
  toast.info(`🦄 ${v ?? 'info!'}`, {
    position: 'top-right',
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
