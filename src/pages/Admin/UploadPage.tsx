// src/pages/UploadPage.tsx
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MdAddPhotoAlternate } from "react-icons/md";
import * as Toast from "@radix-ui/react-toast";

import {
  useGetImagesQuery,
  useUploadImageMutation,
  useDeleteImageMutation,
} from "../../store/features/api/uploadApi";
import { DataError } from "@/components/atoms/DataError";
import { EmptyData } from "../../components/atoms/EmptyData";

export const UploadPage = () => {
  // — RTK Query hooks —
  const {
    data,
    isLoading: isFetching,
    isError,
    isSuccess,
  } = useGetImagesQuery(); // GET /upload/getImages
  const images = data?.images ?? [];

  const [uploadImage, { isLoading: isUploading, error }] =
    useUploadImageMutation(); // POST /upload/create

  const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation(); // DELETE /upload/:filename

  // — UI state —
  const [page, setPage] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    filename: string;
    url: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const imagesPerPage = 10;
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const currentImages = images.slice(
    (page - 1) * imagesPerPage,
    page * imagesPerPage
  );

  // — Handlers —
  const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await uploadImage(formData).unwrap();
      setToastMessage("Image uploaded successfully.");
      setShowToast(true);
    } catch (err) {
      console.log("error" + error);
      console.error("Upload error", err);
      setToastMessage("Error uploading image.");
      setShowToast(true);
    } finally {
      setShowUploadModal(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedImage) return;
    try {
      await deleteImage(selectedImage.filename).unwrap();
      setToastMessage("Image deleted successfully.");
      setShowToast(true);
      setShowDetailModal(false);
    } catch (err) {
      console.error("Delete error", err);
      setToastMessage("Error deleting image.");
      setShowToast(true);
    }
  };

  if (isError) {
    return <DataError darkTheme={true} title={"Fail to show images"} />;
  }
  if (isSuccess && data.images.length === 0) {
    return <EmptyData title={"No images to show"} darkTheme={true} />;
  }
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

      {totalPages > 1 && (
        <div className="flex justify-start my-6 gap-2">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isFetching
          ? Array.from({ length: imagesPerPage }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-gray-700 rounded animate-pulse"
              />
            ))
          : currentImages.map((img, i) => (
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

      {/* Upload Modal */}
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
                  {isUploading ? (
                    <div className="text-yellow-300">Uploading…</div>
                  ) : (
                    <div>Drag &amp; drop an image here</div>
                  )}
                </div>

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

      {/* Detail Modal */}
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
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded w-full transition"
                    >
                      {isDeleting ? "Deleting…" : "Delete Image"}
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
          className="border-l-4 border-[#7436A2] bg-gray-800 text-white p-4 rounded-lg shadow-md"
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
