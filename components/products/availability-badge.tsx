import { Badge } from "@/components/ui";

interface AvailabilityBadgeProps {
  available: boolean;
}

export const AvailabilityBadge = ({ available }: AvailabilityBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className={
        available
          ? "border-0 bg-green-600/10 font-normal text-green-600"
          : "border-0 bg-red-600/10 font-normal text-red-600"
      }
    >
      {available ? "Dostępny" : "Niedostępny"}
    </Badge>
  );
};
