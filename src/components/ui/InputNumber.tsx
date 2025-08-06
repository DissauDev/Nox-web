import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  variant?: "integer" | "price";
  placeholder?: string;
  className?: string;
}

export const InputNumber = ({
  value,
  onChange,
  disabled = false,
  min,
  max,
  step,
  variant = "integer",
  placeholder,
  className,
}: InputNumberProps) => {
  const defaultStep = step ?? (variant === "price" ? 0.1 : 1);

  // Estado local para edición libre del campo
  const [inputValue, setInputValue] = React.useState<string>("");

  React.useEffect(() => {
    // Sincronizar valor externo con el input local (al cambiar desde fuera)
    setInputValue(
      variant === "price" ? value.toFixed(2) : Math.round(value).toString()
    );
  }, [value, variant]);

  const handleMinus = () => {
    let newValue = value - defaultStep;
    if (min !== undefined && newValue < min) newValue = min;
    if (max !== undefined && newValue > max) newValue = max;
    onChange(Number(newValue.toFixed(2)));
  };

  const handlePlus = () => {
    let newValue = value + defaultStep;
    if (min !== undefined && newValue < min) newValue = min;
    if (max !== undefined && newValue > max) newValue = max;
    onChange(Number(newValue.toFixed(2)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = Number(inputValue.replace(",", "."));
    if (!isNaN(parsed)) {
      let newValue = parsed;
      if (min !== undefined && newValue < min) newValue = min;
      if (max !== undefined && newValue > max) newValue = max;
      onChange(Number(newValue.toFixed(2)));
    } else {
      // Restaurar al valor anterior si input no válido
      setInputValue(
        variant === "price" ? value.toFixed(2) : Math.round(value).toString()
      );
    }
  };

  return (
    <div
      className={cn(
        "flex items-stretch h-9 rounded-md border border-input bg-transparent shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "min-w-0 flex-grow bg-transparent px-2 outline-none text-base md:text-sm placeholder:text-muted-foreground",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        inputMode={variant === "price" ? "decimal" : "numeric"}
        pattern={variant === "price" ? "[0-9]*[.,]?[0-9]*" : "[0-9]*"}
      />
      <div className="flex-shrink-0 flex items-center space-x-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground text-sapphire-300"
          disabled={disabled}
          onClick={handleMinus}
        >
          <FaMinus size={14} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground text-sapphire-300"
          disabled={disabled}
          onClick={handlePlus}
        >
          <FaPlus size={14} />
        </Button>
      </div>
    </div>
  );
};

InputNumber.displayName = "InputNumber";
