import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

interface Props {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: any;
  borderColor: string;
  focusBorder: string;
  styles?: string;
}
// Simple Headless UI dropdown
export const Dropdown = ({
  label,
  options,
  onSelect,
  borderColor,
  focusBorder,
  styles,
}: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <Menu.Button
        className={`w-full text-left  ${borderColor} ${focusBorder}  ${styles} flex items-center justify-between`}
      >
        <span className="text-gray-200">{label}</span>
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1 w-full bg-gray-800 rounded shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          {options.map((opt) => (
            <Menu.Item key={opt}>
              {({ active }) => (
                <button
                  onClick={() => onSelect(opt)}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    active ? "bg-[#3956b7] text-white" : "text-gray-300"
                  }`}
                >
                  {opt}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
