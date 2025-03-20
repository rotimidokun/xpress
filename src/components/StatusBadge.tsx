import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "awaiting" | "deactivated";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusClasses = () => {
    switch (status) {
      case "active":
        return "status-badge status-active !rounded-lg !text-sm !font-normal !w-max";
      case "awaiting":
        return "status-badge status-awaiting !rounded-lg !text-sm !font-normal !w-max";
      case "deactivated":
        return "status-badge status-deactivated !rounded-lg !text-sm !font-normal !w-max";
      default:
        return "status-badge";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "active":
        return "Active";
      case "awaiting":
        return "Awaiting approval";
      case "deactivated":
        return "Deactivated";
      default:
        return status;
    }
  };

  return <div className={cn(getStatusClasses())}>{getStatusText()}</div>;
};

export default StatusBadge;
