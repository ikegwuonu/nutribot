import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor?: string;
  iconColor?: string;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  bgColor = "bg-green-50",
  iconColor = "text-green-600",
}: FeatureCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
      <div
        className={`w-12 h-12 ${
          bgColor === "bg-green-50"
            ? "bg-green-100"
            : bgColor === "bg-red-50"
            ? "bg-red-100"
            : "bg-yellow-100"
        } rounded-full flex items-center justify-center mb-4`}
      >
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
