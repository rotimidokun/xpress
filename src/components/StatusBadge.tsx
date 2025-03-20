
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "awaiting" | "deactivated";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusClasses = () => {
    switch (status) {
      case "active":
        return "status-badge status-active";
      case "awaiting":
        return "status-badge status-awaiting";
      case "deactivated":
        return "status-badge status-deactivated";
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

  return (
    <div className={cn(getStatusClasses())}>
      {getStatusText()}
    </div>
  );
};

export default StatusBadge;
