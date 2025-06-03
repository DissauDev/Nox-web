import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MdAddPhotoAlternate } from "react-icons/md";
import * as Toast from "@radix-ui/react-toast";

export const UploadPage = () => {
  const [images, setImages] = useState<{ filename: string; url: string }[]>([]);
  const [page, setPage] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    filename: string;
    url: string;
  } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteProgress, setDeleteProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const imagesPerPage = 10;

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/upload/getimages");
      setImages(res.data.images);
    } catch (error) {
      console.error("Error al obtener las imágenes", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      await axios.post("http://localhost:3000/api/upload/create", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percent);
        },
      });

      fetchImages();
      setToastMessage("Image uploaded successfully.");
      setShowToast(true);
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setShowUploadModal(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedImage) return;
    try {
      setDeleting(true);
      await axios.delete(
        `http://localhost:3000/api/upload/${selectedImage.filename}`,
        {
          onDownloadProgress: (e) => {
            const percent = Math.min(
              Math.round((e.loaded * 100) / (e.total || 100)),
              100
            );
            setDeleteProgress(percent);
          },
        }
      );
      fetchImages();
      setToastMessage("Image deleted successfully.");
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting image", error);
    } finally {
      setDeleting(false);
      setShowDetailModal(false);
      setDeleteProgress(0);
    }
  };

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const currentImages = images.slice(
    (page - 1) * imagesPerPage,
    page * imagesPerPage
  );

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Uploads</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-yellow-400 flex justify-center items-center hover:bg-yellow-500 text-xl text-black font-bold py-2 px-6 rounded transition"
        >
          <MdAddPhotoAlternate className="mr-2" /> Add
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-4 gap-4">
        {currentImages.map((img, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedImage(img);
              setShowDetailModal(true);
            }}
            className="aspect-[3/4] border-2 border-[#7436A2] bg-gray-800 p-2 rounded shadow cursor-pointer hover:opacity-80"
          >
            <img
              src={img.url}
              alt={img.filename}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-3 py-1 rounded font-medium ${
                page === idx + 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      <Transition show={showUploadModal} as={Fragment}>
        <Dialog
          onClose={() => setShowUploadModal(false)}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="transition-transform ease-out duration-300"
              enterFrom="scale-90 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition-transform ease-in duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-90 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl relative">
                <Dialog.Title className="text-xl font-bold text-purple-300 mb-4">
                  Upload Image
                </Dialog.Title>

                <div
                  className="border-2 border-dashed border-purple-500 rounded-lg p-8 text-center text-purple-400 hover:bg-gray-700 transition cursor-pointer"
                  onDrop={handleFileDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {uploading ? (
                    <div className="text-yellow-300">Uploading image...</div>
                  ) : (
                    <div>Drag and drop an image here</div>
                  )}
                </div>

                {uploading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-yellow-400 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right text-yellow-300 mt-1">
                      {uploadProgress}%
                    </p>
                  </div>
                )}

                <button
                  className="absolute top-4 right-4 text-yellow-300 hover:text-yellow-500"
                  onClick={() => setShowUploadModal(false)}
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition show={showDetailModal} as={Fragment}>
        <Dialog
          onClose={() => setShowDetailModal(false)}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="transition-transform ease-out duration-300"
              enterFrom="scale-90 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition-transform ease-in duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-90 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-xl relative border border-purple-500">
                <Dialog.Title className="text-xl font-bold text-purple-300 mb-4">
                  Image Details
                </Dialog.Title>
                {selectedImage && (
                  <div className="space-y-4">
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.filename}
                      className="w-full rounded"
                    />
                    <div>
                      <p className="text-white">
                        Name:{" "}
                        <span className="font-semibold text-purple-400">
                          {selectedImage.filename}
                        </span>
                      </p>
                      <p className="text-white break-all">
                        URL:{" "}
                        <span className="text-sm text-purple-300">
                          {selectedImage.url}
                        </span>
                      </p>
                    </div>
                    {deleting && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-700 rounded-full h-4">
                          <div
                            className="bg-red-500 h-4 rounded-full transition-all duration-300"
                            style={{ width: `${deleteProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-right text-red-400 mt-1">
                          {deleteProgress}%
                        </p>
                      </div>
                    )}
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded w-full transition"
                    >
                      Delete Image
                    </button>
                  </div>
                )}
                <button
                  className="absolute top-4 right-4 text-purple-300 hover:text-purple-500"
                  onClick={() => setShowDetailModal(false)}
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          open={showToast}
          duration={3000}
          onOpenChange={setShowToast}
          className="border-l-4  border-[#7436A2] bg-gray-800 text-white p-4 rounded-lg shadow-md"
        >
          <Toast.Title className="font-bold">Notice</Toast.Title>
          <Toast.Description className="text-sm mt-1">
            {toastMessage}
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 w-[300px] z-[9999]" />
      </Toast.Provider>
    </div>
  );
};
