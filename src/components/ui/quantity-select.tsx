import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuantitySelectProps {
  value: number;
  onChange: (value: number) => void;
  maxValue?: number;
  label?: string;
}

export function QuantitySelect({ value, onChange, maxValue = 10, label = "Select quantity" }: QuantitySelectProps) {
  return (
    <Select value={value.toString()} onValueChange={(v) => onChange(parseInt(v))}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {[...Array(maxValue)].map((_, i) => (
          <SelectItem key={i + 1} value={(i + 1).toString()}>
            {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function PanoSelect({ value, onChange }: QuantitySelectProps) {
  return (
    <Select value={value.toString()} onValueChange={(v) => onChange(parseInt(v))}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select panos" />
      </SelectTrigger>
      <SelectContent>
        {[...Array(4)].map((_, i) => (
          <SelectItem key={i + 1} value={(i + 1).toString()}>
            {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}