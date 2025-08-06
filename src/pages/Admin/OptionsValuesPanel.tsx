/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/components/admin/OptionValuesPanel.tsx
import React, { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoMdClose, IoMdCreate } from "react-icons/io";
import {
  useGetOptionValuesQuery,
  useCreateOptionValueMutation,
  useUpdateOptionValueMutation,
  useDeleteOptionValueMutation,
} from "@/store/features/api/optionGroupApi";
import { DataError } from "@/components/atoms/DataError";
import { toast } from "@/hooks/use-toast";
import ConfirmDialog from "@/components/atoms/admin/ConfirmModal";
import ImageEmpty from "../../assets/base/illustration-gallery-icon.png";
import { useGetImagesQuery } from "@/store/features/api/uploadApi";
import { LuImagePlus } from "react-icons/lu";
import { ModalImages } from "@/components/atoms/admin/ModalImages";
import { InputNumber } from "@/components/ui/InputNumber";

export interface OptionValue {
  id: string;
  name: string;
  extraPrice: number;
  imageUrl: string;
  groupId: string;
  description: string;
}

interface Props {
  groupId: string;
  showImages: boolean;
}

export default function OptionValuesPanel({ groupId, showImages }: Props) {
  // 1) Load
  const {
    data: values = [],
    isLoading,
    refetch,
    error,
  } = useGetOptionValuesQuery(groupId);

  // 2) Mutations
  const [createValue, { isLoading: isCreating }] =
    useCreateOptionValueMutation();
  const [updateValue, { isLoading: isUpdating }] =
    useUpdateOptionValueMutation();
  const [deleteValue, { isLoading: isDeleting }] =
    useDeleteOptionValueMutation();
  const [valueToDelete, setValueToDelete] = useState<string | null>(null);

  // 3) Local form state
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newUrl, setNewUrl] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingPrice, setEditingPrice] = useState(0);
  const [editingUrl, setEditingUrl] = useState("");
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);

  const { data, isLoading: isLoadingImages } = useGetImagesQuery();
  const images = data?.images ?? [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedServerImage, setSelectedServerImage] = useState<string>("");

  // 4) Preload in edit mode
  useEffect(() => {
    if (!editingId) return;
    const v = values.find((x) => x.id === editingId);
    if (v) {
      setEditingName(v.name);
      //@ts-ignore
      setEditingDescription(v.description);
      setEditingPrice(v.extraPrice);
      setEditingUrl(v.imageUrl);
    }
  }, [editingId, values]);

  // 5) Handlers
  const onAdd = async () => {
    if (!newName.trim()) return;
    try {
      await createValue({
        groupId,
        newValue: {
          name: newName,
          //@ts-ignore
          description: newDescription,
          extraPrice: newPrice,
          imageUrl: newUrl,
        },
      }).unwrap();
      setNewName("");
      setNewDescription("");
      setNewPrice(0);
      setNewUrl("");
      toast({
        className: "border-l-4 border-green-500",
        title: "✅  Success",
        description: "Your value vas created",
      });
    } catch (err) {
      toast({
        className: "border-l-4 border-red-500 ",
        title: "❌  Error",
        description: err.data.message || "Was an error to add value",
      });
    }
  };

  const onSaveEdit = async () => {
    try {
      if (!editingId || !editingName.trim()) return;
      await updateValue({
        groupId,
        valueId: editingId,
        data: {
          name: editingName,
          //@ts-ignore
          description: editingDescription,
          extraPrice: editingPrice,
          imageUrl: editingUrl,
        },
      }).unwrap();
      setEditingId(null);
      await refetch();
      toast({
        className: "border-l-4 border-green-500",
        title: "✅ Success",
        description: "Your value have been edited",
      });
    } catch (err) {
      toast({
        className: "border-l-4 border-red-500",
        title: "❌ Error",
        description: err.data.message || "Was an error to edit a value",
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setNewName("");
    setNewDescription("");
    setNewPrice(0);
    setNewUrl("");
  };

  const handleTriggerDelete = (v: string) => {
    setValueToDelete(v);
  };

  const handleConfirmDelete = async () => {
    if (!valueToDelete) return;
    try {
      await deleteValue({ groupId, valueId: valueToDelete }).unwrap();

      toast({
        className: "border-l-4 border-green-500",
        title: "✅ Success",
        description: "Your option have been deleted succesfully",
      });
    } catch (err) {
      toast({
        className: "border-l-4 border-red-500",
        title: "❌ Error",
        description: err.data.message || "Was an error to delete an option",
      });
    } finally {
      setValueToDelete(null);
    }
  };

  if (error)
    return <DataError title={"Error to show values"} darkTheme={true} />;

  return (
    <div className="w-2/3 bg-[#15203a] border border-sapphire-700 p-4 rounded-2xl  ml-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg">Option Values</h3>
        <Button variant="ghost" size="sm" onClick={resetForm}>
          <PlusIcon className="h-4 w-4 mr-1" /> New
        </Button>
      </div>

      {/* scroll thin */}
      <div className="space-y-2 max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-2 rounded bg-gray-700 animate-pulse"
              >
                <div className="flex items-center gap-2">
                  {/* Imagen placeholder */}
                  <div className="w-20 h-20 bg-gray-600 rounded" />
                  {/* Texto placeholder */}
                  <div className="flex-1 space-y-1 py-1">
                    <div className="h-4 w-1/3 bg-gray-600 rounded" />
                    <div className="h-3 w-1/4 bg-gray-600 rounded" />
                    <div className="h-3 w-1/2 bg-gray-600 rounded italic" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-600 rounded" />
                  <div className="h-4 w-4 bg-gray-600 rounded" />
                </div>
              </div>
            ))
          : values.map((v) => (
              <div
                key={v.id}
                className={
                  "flex justify-between mx-2 items-center p-2 rounded hover:bg-sapphire-950 " +
                  (v.id === editingId ? "border-2 border-sapphire-400" : "")
                }
              >
                <div className="flex items-center gap-2">
                  <img
                    src={v.imageUrl?.length ? v.imageUrl : ImageEmpty}
                    alt={v.name}
                    className="w-20 h-20 rounded"
                  />
                  <div>
                    <div className="font-medium">{v.name}</div>
                    <div className="text-xs text-gray-400">
                      +${v.extraPrice.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 italic">
                      {/*@ts-ignore */}
                      {v.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IoMdCreate
                    size={16}
                    className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                    onClick={() => setEditingId(v.id)}
                  />
                  <IoMdClose
                    size={16}
                    className="text-red-500 hover:text-red-400 cursor-pointer"
                    onClick={() => handleTriggerDelete(v.id)}
                  />
                </div>
              </div>
            ))}
      </div>

      <ConfirmDialog
        open={Boolean(valueToDelete)}
        onOpenChange={(val) => {
          if (!val) setValueToDelete(null);
        }}
        darkTheme={true}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        title={`Delete this item ?`}
        description="This action cannot be undone."
      />
      {/* add / edit form */}
      <div className=" space-y-3 mt-2">
        <div className="flex flex-row space-x-4">
          <Input
            placeholder={editingId ? "Edit name" : "New value name"}
            value={editingId ? editingName : newName}
            onChange={(e) =>
              editingId
                ? setEditingName(e.target.value)
                : setNewName(e.target.value)
            }
          />
          <InputNumber
            variant="price"
            placeholder="Extra price"
            value={editingId ? editingPrice : newPrice}
            onChange={(val) =>
              editingId ? setEditingPrice(val) : setNewPrice(val)
            }
          />
        </div>

        <Input
          placeholder="Description"
          value={editingId ? editingDescription : newDescription}
          onChange={(e) =>
            editingId
              ? setEditingDescription(e.target.value)
              : setNewDescription(e.target.value)
          }
        />
        {showImages && (
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="Thumbnail URL"
              value={editingId ? editingUrl : newUrl}
              onChange={(e) =>
                editingId
                  ? setEditingUrl(e.target.value)
                  : setNewUrl(e.target.value)
              }
            />
            <Button
              type="button"
              variant="outline"
              className="flex items-center justify-center w-20 text-gray-900 hover:text-grape-800"
              onClick={() => setIsImageSelectorOpen(true)}
            >
              <LuImagePlus />
            </Button>
          </div>
        )}

        <Button
          onClick={editingId ? onSaveEdit : onAdd}
          disabled={(editingId ? editingName : newName).trim().length === 0}
          className="flex items-center justify-center w-full"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          {editingId
            ? isUpdating
              ? "Loading..."
              : "Save Group"
            : isCreating
            ? "Loading"
            : "Add Group"}
        </Button>
      </div>
      <ModalImages
        isOpen={isImageSelectorOpen}
        onClose={() => {
          setIsImageSelectorOpen(false);
          setSelectedServerImage("");
        }}
        images={images}
        loading={isLoadingImages}
        onSelect={(url) => {
          if (editingId) {
            setEditingUrl(url);
          } else {
            setNewUrl(url);
          }
          setIsImageSelectorOpen(false);
        }}
      />
    </div>
  );
}
