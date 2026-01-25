import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ModalType = "success" | "error" | "warning" | "info";

interface AlertOptions {
  title?: string;
  message: string;
  type?: ModalType;
}

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

interface ToastOptions {
  message: string;
  type?: ModalType;
  duration?: number;
}

interface Toast extends ToastOptions {
  id: number;
}

interface ModalContextType {
  showAlert: (message: string, type?: ModalType, title?: string) => void;
  showConfirm: (message: string, title?: string) => Promise<boolean>;
  showToast: (message: string, type?: ModalType, duration?: number) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alertState, setAlertState] = useState<AlertOptions | null>(null);
  const [confirmState, setConfirmState] = useState<{
    options: ConfirmOptions;
    resolve: (value: boolean) => void;
  } | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastId, setToastId] = useState(0);

  const showAlert = (
    message: string,
    type: ModalType = "info",
    title?: string,
  ) => {
    setAlertState({ message, type, title });
  };

  const closeAlert = () => {
    setAlertState(null);
  };

  const showConfirm = (message: string, title?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmState({
        options: { message, title },
        resolve,
      });
    });
  };

  const handleConfirm = (result: boolean) => {
    if (confirmState) {
      confirmState.resolve(result);
      setConfirmState(null);
    }
  };

  const showToast = (
    message: string,
    type: ModalType = "info",
    duration: number = 3000,
  ) => {
    const id = toastId;
    setToastId((prev) => prev + 1);
    const toast: Toast = { id, message, type, duration };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm, showToast }}>
      {children}

      {alertState && (
        <AlertModal
          message={alertState.message}
          type={alertState.type || "info"}
          title={alertState.title}
          onClose={closeAlert}
        />
      )}

      {confirmState && (
        <ConfirmModal
          message={confirmState.options.message}
          title={confirmState.options.title}
          onConfirm={() => handleConfirm(true)}
          onCancel={() => handleConfirm(false)}
        />
      )}

      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            message={toast.message}
            type={toast.type || "info"}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ModalContext.Provider>
  );
};

interface AlertModalProps {
  message: string;
  type: ModalType;
  title?: string;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  message,
  type,
  title,
  onClose,
}) => {
  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  const colors = {
    success: "text-green-600 bg-green-50",
    error: "text-red-600 bg-red-50",
    warning: "text-amber-600 bg-amber-50",
    info: "text-blue-600 bg-blue-50",
  };

  const buttonColors = {
    success: "bg-green-600 hover:bg-green-700",
    error: "bg-red-600 hover:bg-red-700",
    warning: "bg-amber-600 hover:bg-amber-700",
    info: "bg-primary hover:bg-primary/90",
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-slideUp">
        <div className="p-6 text-center">
          <div
            className={`w-16 h-16 rounded-full ${colors[type]} flex items-center justify-center text-3xl mx-auto mb-4`}
          >
            {icons[type]}
          </div>
          {title && (
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-lexend">
              {title}
            </h3>
          )}
          <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
          <button
            onClick={onClose}
            className={`w-full py-3 px-6 ${buttonColors[type]} text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

interface ConfirmModalProps {
  message: string;
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  title,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-slideUp">
        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-4">
            ❓
          </div>
          {title && (
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-lexend">
              {title}
            </h3>
          )}
          <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 font-bold rounded-xl transition-all hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-6 bg-primary text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:bg-primary/90"
            >
              Ya, Lanjutkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToastNotificationProps {
  message: string;
  type: ModalType;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-amber-600",
    info: "bg-blue-600",
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "!",
    info: "i",
  };

  return (
    <div className="pointer-events-auto animate-slideInRight">
      <div
        className={`${colors[type]} text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 min-w-[300px] max-w-md`}
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">
          {icons[type]}
        </div>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
