import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FoodCardProps {
  id: string;
  name: string;
  type: "food" | "fruit" | "vegetable";
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function FoodCard({
  id,
  name,
  type,
  checked,
  onCheckedChange,
}: FoodCardProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${type}-${id}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={`${type}-${id}`} className="cursor-pointer">
        {name}
      </Label>
    </div>
  );
}
