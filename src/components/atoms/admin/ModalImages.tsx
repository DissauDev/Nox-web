import { Button } from "@/components/ui/button";
import { useUploadImageMutation } from "@/store/features/api/uploadApi";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  images: Image[];
  loading: boolean;
  onSelect: (url: string) => void;
}
interface Image {
  filename: string;
  url: string;
}

export const ModalImages = ({
  isOpen,
  onClose,
  images,
  loading,
  onSelect,
}: Props) => {
  const [selected, setSelected] = useState<string>("");

  const [uploadImage, { isLoading: isUploading, error }] =
    useUploadImageMutation(); // POST /upload/create

  if (!isOpen) return null;

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await uploadImage(formData).unwrap();
      /* setToastMessage("Image uploaded successfully.");
        setShowToast(true);*/
    } catch (err) {
      console.log("error" + error);
      console.error("Upload error", err);
      /*setToastMessage("Error uploading image.");
        setShowToast(true);*/
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-[#1a1a2e] p-6 rounded-lg max-w-4xl w-full flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Select Image</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoMdClose size={24} />
          </button>
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="mb-4 border-2 border-dashed border-sapphire-500 rounded-lg p-6 text-center cursor-pointer hover:bg-sapphire-800/20 transition-colors"
        >
          {isUploading ? (
            <p className="text-gray-300 animate-pulse">Uploading...</p>
          ) : (
            <p className="text-gray-300">Drag & Drop an image here</p>
          )}
        </div>

        {/* Scrollable gallery */}
        <div className="flex-1 overflow-y-auto border rounded-lg p-2">
          {loading ? (
            <p className="text-gray-300">Loading images...</p>
          ) : images.length === 0 ? (
            <p className="text-gray-300">No images found on server.</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {images.map((i) => (
                <img
                  key={i.filename}
                  src={i.url}
                  alt="server"
                  className={`w-full h-auto object-cover rounded-lg cursor-pointer border-4 ${
                    selected === i.url
                      ? "border-sapphire-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelected(i.url)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!selected}
            onClick={() => {
              onSelect(selected);
              setSelected("");
            }}
          >
            Use Selected Image
          </Button>
        </div>
      </div>
    </div>
  );
};
