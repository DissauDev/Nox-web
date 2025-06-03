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
}

export default function OptionValuesPanel({ groupId }: Props) {
  // 1) Load
  const {
    data: values = [],
    isLoading,
    refetch,
    error,
  } = useGetOptionValuesQuery(groupId);

  // 2) Mutations
  const [createValue] = useCreateOptionValueMutation();
  const [updateValue] = useUpdateOptionValueMutation();
  const [deleteValue] = useDeleteOptionValueMutation();

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
  };

  const onSaveEdit = async () => {
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
  };

  const onRemove = async (valueId: string) => {
    if (confirm("Delete this value?")) {
      await deleteValue({ groupId, valueId }).unwrap();
    }
  };

  if (isLoading) return <p>Loading values…</p>;
  if (error) return <p className="text-red-400">Error loading values</p>;

  return (
    <div className="w-2/3 bg-[#0c0014] p-4 rounded-2xl border border-purple-800 ml-4">
      <h3 className="text-lg mb-4">Option Values</h3>

      {/* scroll thin */}
      <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900">
        {values.map((v) => (
          <div
            key={v.id}
            className="flex justify-between items-center p-2 rounded hover:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <img
                src={v.imageUrl}
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
                onClick={() => onRemove(v.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* add / edit form */}
      <div className="mt-4 space-y-2">
        <Input
          placeholder={editingId ? "Edit name" : "New value name"}
          value={editingId ? editingName : newName}
          onChange={(e) =>
            editingId
              ? setEditingName(e.target.value)
              : setNewName(e.target.value)
          }
        />
        <Input
          placeholder="Description"
          value={editingId ? editingDescription : newDescription}
          onChange={(e) =>
            editingId
              ? setEditingDescription(e.target.value)
              : setNewDescription(e.target.value)
          }
        />
        <Input
          type="number"
          step="any"
          placeholder="Extra price"
          value={editingId ? editingPrice : newPrice}
          onChange={(e) =>
            editingId
              ? setEditingPrice(Number(e.target.value))
              : setNewPrice(Number(e.target.value))
          }
        />
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
          onClick={editingId ? onSaveEdit : onAdd}
          disabled={(editingId ? editingName : newName).trim().length === 0}
          className="flex items-center justify-center w-full"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          {editingId ? "Save Value" : "Add Value"}
        </Button>
      </div>
    </div>
  );
}
