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

export interface OptionGroup {
  id: string;
  name: string;
  required: boolean;
  minSelectable: number;
  maxSelectable: number;
}

interface Props {
  onSelect: (group: OptionGroup) => void;
  selectedId?: string;
}

export default function OptionGroupsPanel({ onSelect, selectedId }: Props) {
  const { data: groups = [], isLoading, error } = useGetOptionGroupsQuery();
  const [createGroup] = useCreateOptionGroupMutation();
  const [updateGroup] = useUpdateOptionGroupMutation();
  const [deleteGroup] = useDeleteOptionGroupMutation();

  // — Nuevo grupo —
  const [newName, setNewName] = useState("");
  const [newRequired, setNewRequired] = useState(true);
  const [newMin, setNewMin] = useState(2);
  const [newMax, setNewMax] = useState(3);

  // — Edición de grupo —
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingRequired, setEditingRequired] = useState(true);
  const [editingMin, setEditingMin] = useState(2);
  const [editingMax, setEditingMax] = useState(3);

  // Cuando abrimos edición, precargamos el form
  useEffect(() => {
    if (!editingId) return;
    const g = groups.find((x) => x.id === editingId);
    if (g) {
      setEditingName(g.name);
      setEditingRequired(g.required);
      setEditingMin(g.minSelectable);
      setEditingMax(g.maxSelectable);
    }
  }, [editingId, groups]);

  const onAdd = async () => {
    if (!newName.trim()) return;
    await createGroup({
      name: newName,
      required: newRequired,
      minSelectable: newMin,
      maxSelectable: newMax,
    }).unwrap();
    setNewName("");
    setNewRequired(true);
    setNewMin(2);
    setNewMax(3);
  };

  const onSaveEdit = async () => {
    if (!editingId || !editingName.trim()) return;
    // 🔑 Aquí pasamos `groupId` en lugar de `id`, para coincidir con la firma de la mutación
    await updateGroup({
      //@ts-ignore
      groupId: editingId,
      name: editingName,
      required: editingRequired,
      minSelectable: editingMin,
      maxSelectable: editingMax,
    }).unwrap();
    setEditingId(null);
  };

  const onRemove = async (id: string) => {
    if (confirm("Delete this group?")) {
      await deleteGroup(id).unwrap();
      if (selectedId === id) {
        onSelect({
          id: "",
          name: "",
          required: true,
          minSelectable: 0,
          maxSelectable: 0,
        });
      }
    }
  };

  if (isLoading) return <p>Loading groups…</p>;
  if (error) return <p className="text-red-400">Error loading groups</p>;

  return (
    <div className="w-1/3 bg-[#0c0014] p-4 rounded-2xl border border-purple-800">
      <h3 className="text-lg mb-4">Option Groups</h3>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {groups.map((g) => (
          <div
            key={g.id}
            className={`flex justify-between items-center p-2 rounded cursor-pointer ${
              g.id === selectedId ? "bg-purple-700" : "hover:bg-gray-800"
            }`}
            onClick={() => onSelect(g)}
          >
            <div>
              <div className="font-medium">{g.name}</div>
              <div className="text-xs text-gray-400">
                required: {g.required ? "yes" : "no"}, min {g.minSelectable},
                max {g.maxSelectable}
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
                  onRemove(g.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 📋 Formulario añadir / editar */}
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

        <div className="flex items-center space-x-2">
          <Switch
            className="!bg-gray-800 data-[state=checked]:!bg-pink-600"
            checked={editingId ? editingRequired : newRequired}
            onCheckedChange={(v) =>
              editingId ? setEditingRequired(v) : setNewRequired(v)
            }
          />
          <span className="text-sm">Required?</span>
        </div>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={editingId ? editingMin : newMin}
            onChange={(e) =>
              editingId
                ? setEditingMin(Number(e.target.value))
                : setNewMin(Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="Max"
            value={editingId ? editingMax : newMax}
            onChange={(e) =>
              editingId
                ? setEditingMax(Number(e.target.value))
                : setNewMax(Number(e.target.value))
            }
          />
        </div>

        <Button
          onClick={editingId ? onSaveEdit : onAdd}
          disabled={
            (editingId ? editingName.trim() : newName.trim()).length === 0
          }
          className="flex items-center justify-center w-full"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          {editingId ? "Save Group" : "Add Group"}
        </Button>
      </div>
    </div>
  );
}
