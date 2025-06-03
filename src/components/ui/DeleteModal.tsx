// src/components/DeleteModal.tsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<any>;
  message?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Do you want to delete this item?",
}) => {
  const [deleting, setDeleting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onConfirm();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setDeleting(false);
        onClose();
      }, 1000);
    } catch {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    if (!deleting) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={handleCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-gray-900 text-white rounded-lg p-6 w-full max-w-sm z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {!success ? (
              <>
                <p className="mb-6 text-center">{message}</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancel}
                    disabled={deleting}
                    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 flex items-center justify-center"
                  >
                    {deleting ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-400"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <p className="mt-4">Deleted</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
