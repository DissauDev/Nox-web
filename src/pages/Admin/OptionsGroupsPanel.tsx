/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { IoMdClose, IoMdCreate } from "react-icons/io";
import {
  useGetOptionGroupsQuery,
  useCreateOptionGroupMutation,
  useUpdateOptionGroupMutation,
  useDeleteOptionGroupMutation,
} from "@/store/features/api/optionGroupApi";
import { toast } from "@/hooks/use-toast";

import ConfirmDialog from "@/components/atoms/admin/ConfirmModal";
import { DataError } from "@/components/atoms/DataError";
import { InputNumber } from "@/components/ui/InputNumber";
import { useGetCategoriesAvailableQuery } from "@/store/features/api/categoriesApi";
import { Dropdown } from "@/components/atoms/DropDown";

export interface OptionGroup {
  showImages?: boolean;
  id: string;
  name: string;
  required: boolean;
  minSelectable: number;
  maxSelectable: number;
  categoryId?: string;
  optionGroupIdToClone?: string;
}

interface Props {
  onSelect: (group: OptionGroup) => void;
  selectedId?: string;
}

export default function OptionGroupsPanel({ onSelect, selectedId }: Props) {
  const { data: groups = [], isLoading, error } = useGetOptionGroupsQuery();
  const [createGroup, { isLoading: isCreateing }] =
    useCreateOptionGroupMutation();
  const [updateGroup, { isLoading: isUpdating }] =
    useUpdateOptionGroupMutation();
  const [deleteGroup, { isLoading: isDeleting }] =
    useDeleteOptionGroupMutation();

  // — Nuevo grupo —
  const [newName, setNewName] = useState("");
  const [newRequired, setNewRequired] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOptionGroup, setSelectedOptionGroup] = useState(null);

  const { data: categories = [] } = useGetCategoriesAvailableQuery();
  const { data: optionsData = [] } = useGetOptionGroupsQuery();

  const [newMin, setNewMin] = useState(2);
  const [newMax, setNewMax] = useState(3);
  // Estado para el modal
  const [groupToDelete, setGroupToDelete] = useState<OptionGroup | null>(null);
  // — Edición de grupo —
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingRequired, setEditingRequired] = useState(true);
  const [editingMin, setEditingMin] = useState(2);
  const [editingMax, setEditingMax] = useState(3);
  const [newShowImages, setNewShowImages] = useState(false); // ➕ para crear
  const [editingShowImages, setEditingShowImages] = useState(false); // ➕ para editar

  // Cuando abrimos edición, precargamos el form
  useEffect(() => {
    if (!editingId) return;
    const g = groups.find((x) => x.id === editingId);
    if (g) {
      setEditingName(g.name);
      setEditingRequired(g.required);
      setEditingMin(g.minSelectable);
      setNewShowImages(false);
      setEditingMax(g.maxSelectable);
      setEditingShowImages(g.showImages ?? false); // ➕ nuevo estado
    }
  }, [editingId, groups]);

  const onAdd = async () => {
    if (!newName.trim()) return;
    try {
      await createGroup({
        name: newName,
        required: newRequired,
        showImages: newShowImages, // ➕ nuevo campo
        minSelectable: newMin,
        maxSelectable: newMax,
        categoryId: selectedCategory?.id ?? null,
        optionGroupIdToClone: selectedOptionGroup?.id ?? null,
      }).unwrap();
      setNewName("");
      setNewRequired(true);
      setNewMin(2);
      setNewMax(3);
      setSelectedCategory(null);
      setSelectedOptionGroup(null);
      setNewShowImages(false);
      toast({
        className: "border-l-4 border-green-500",
        title: "✅ Success",
        description: "Your option have been created succesfully",
      });
    } catch (err) {
      toast({
        className: "border-l-4 border-red-500",
        title: "❌ Option failed",
        description: err.data.message || "Was an error to create an option",
      });
    }
  };

  const onSaveEdit = async () => {
    if (!editingId || !editingName.trim()) return;

    try {
      await updateGroup({
        //@ts-ignore
        groupId: editingId,
        name: editingName,
        required: editingRequired,
        minSelectable: editingMin,
        showImages: editingShowImages, // ➕ nuevo campo
        maxSelectable: editingMax,
      }).unwrap();
      setEditingId(null);
      toast({
        className: "border-l-4 border-green-500",
        title: "✅ Success",
        description: "Your option have been edited succesfully",
      });
    } catch (err) {
      toast({
        className: "border-l-4 border-red-500",
        title: "❌ Error",
        description: err.data.message || "Was an error to edit an option",
      });
    }
  };
  // Handlers
  const handleTriggerDelete = (g: OptionGroup) => {
    setGroupToDelete(g);
  };

  const handleConfirmDelete = async () => {
    if (!groupToDelete) return;
    try {
      await deleteGroup(groupToDelete.id).unwrap();
      if (selectedId === groupToDelete.id) {
        onSelect({
          id: "",
          name: "",
          required: true,
          minSelectable: 0,
          maxSelectable: 0,
          showImages: true,
        });
      }

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
      setGroupToDelete(null);
    }
  };
  const resetForm = () => {
    setEditingId(null);
    setNewName("");

    setNewRequired(true);
    setNewMin(2);
    setNewMax(3);
  };
  const categoryOptions = categories.map((cat) => ({
    id: cat.id,
    label: cat.name,
  }));
  const optionsDrops = optionsData.map((cat) => ({
    id: cat.id,
    label: cat.name,
  }));
  if (error)
    return <DataError title={"Error to load options"} darkTheme={true} />;

  return (
    <div className="w-1/3 bg-[#15203a] border border-sapphire-700 p-4 rounded-2xl ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg">Option Groups</h3>
        <Button variant="ghost" size="sm" onClick={resetForm}>
          <PlusIcon className="h-4 w-4 mr-1" />
          New
        </Button>
      </div>

      <div className="space-y-2 max-h-[30vh] overflow-y-auto">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-2 rounded bg-gray-700 animate-pulse"
              >
                {/* Texto principal */}
                <div className="space-y-1 flex-1">
                  <div className="h-4 w-3/5 bg-gray-600 rounded" />
                  <div className="h-3 w-1/2 bg-gray-600 rounded" />
                </div>
                {/* Iconos de acción */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-600 rounded" />
                  <div className="h-4 w-4 bg-gray-600 rounded" />
                </div>
              </div>
            ))
          : groups.map((g) => (
              <div
                key={g.id}
                className={`flex justify-between items-center mx-2 p-2 rounded cursor-pointer ${
                  g.id === selectedId
                    ? "bg-sapphire-600"
                    : "hover:bg-sapphire-950"
                }`}
                onClick={() => onSelect(g)}
              >
                <div>
                  <div className="font-medium">{g.name}</div>
                  <div className="text-xs text-gray-400">
                    required: {g.required ? "yes" : "no"}, min {g.minSelectable}
                    , max {g.maxSelectable}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IoMdCreate
                    size={16}
                    className="text-yellow-400 hover:text-yellow-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(g.id);
                    }}
                  />
                  <IoMdClose
                    size={16}
                    className="text-red-500 hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTriggerDelete(g);
                    }}
                  />
                </div>
              </div>
            ))}
      </div>

      <ConfirmDialog
        open={Boolean(groupToDelete)}
        onOpenChange={(val) => {
          if (!val) setGroupToDelete(null);
        }}
        darkTheme={true}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        title={`Delete "${groupToDelete?.name}"?`}
        description="This action cannot be undone."
      />
      <div className="mt-4 space-y-2">
        <Input
          placeholder={editingId ? "Edit group name" : "New group name"}
          value={editingId ? editingName : newName}
          onChange={(e) =>
            editingId
              ? setEditingName(e.target.value)
              : setNewName(e.target.value)
          }
        />
        {!editingId && (
          <div className="w-full">
            <h3 className="text-white font-ArialRegular mb-1 text-sm">
              Select a category{" "}
              <span className="text-xs text-gray-400">(only one)</span>
            </h3>
            <Dropdown
              label={selectedCategory?.label || "Choose category"}
              options={categoryOptions.map((opt) => opt.label)}
              onSelect={(label) => {
                const selected = categoryOptions.find(
                  (opt) => opt.label === label
                );
                setSelectedCategory(selected);
                setSelectedOptionGroup(null);
              }}
              styles="rounded-md px-3 py-1 text-base"
              borderColor="border border-sapphire-80"
              focusBorder="focus:ring-1 ring-sapphire-500"
            />
          </div>
        )}
        {!editingId && (
          <div className="w-full">
            <h3 className="text-white font-ArialRegular mb-1 text-sm">
              Or duplicate existing options{" "}
              <span className="text-xs text-gray-400">(only one)</span>
            </h3>

            <Dropdown
              label={selectedOptionGroup?.label || "Choose options"}
              options={optionsDrops.map((opt) => opt.label)}
              onSelect={(label) => {
                const selected = optionsDrops.find(
                  (opt) => opt.label === label
                );
                setSelectedOptionGroup(selected);
                setSelectedCategory(null); // ❗Limpiar la otra selección
              }}
              styles="rounded-md px-3 py-1 text-base"
              borderColor="border border-sapphire-80"
              focusBorder="focus:ring-1 ring-sapphire-500"
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Switch
            className="!bg-gray-800 data-[state=checked]:!bg-sapphire-600"
            checked={editingId ? editingRequired : newRequired}
            onCheckedChange={(v) =>
              editingId ? setEditingRequired(v) : setNewRequired(v)
            }
          />
          <span className="text-sm">Required?</span>
        </div>
        {!(editingId ? editingRequired : newRequired) && (
          <div className="flex items-center space-x-2">
            <Switch
              className="!bg-gray-800 data-[state=checked]:!bg-sapphire-600"
              checked={editingId ? editingShowImages : newShowImages}
              onCheckedChange={(v) =>
                editingId ? setEditingShowImages(v) : setNewShowImages(v)
              }
            />
            <span className="text-sm">
              Show images in this option (visual only)
            </span>
          </div>
        )}
        <div className="flex gap-2">
          <div className="w-1/2">
            <h3 className="text-white font-ArialRegular mb-1 text-sm">
              Min quantity
            </h3>
            <InputNumber
              variant="integer"
              placeholder="Min"
              value={editingId ? editingMin : newMin}
              onChange={(val) =>
                editingId ? setEditingMin(Number(val)) : setNewMin(Number(val))
              }
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-white font-ArialRegular mb-1 text-sm">
              Max quantity
            </h3>
            <InputNumber
              variant="integer"
              placeholder="Max"
              value={editingId ? editingMax : newMax}
              onChange={(val) =>
                editingId ? setEditingMax(Number(val)) : setNewMax(Number(val))
              }
            />
          </div>
        </div>

        <Button
          onClick={editingId ? onSaveEdit : onAdd}
          disabled={
            (editingId ? editingName.trim() : newName.trim()).length === 0
          }
          className="flex items-center justify-center w-full"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          {editingId
            ? isUpdating
              ? "Loading..."
              : "Save Group"
            : isCreateing
            ? "Loading"
            : "Add Group"}
        </Button>
      </div>
    </div>
  );
}
