import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PendingIcon } from "@/assets";

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationSuccessModal = ({
  isOpen,
  onClose,
}: RegistrationSuccessModalProps) => {
  const navigate = useNavigate();

  const handleDone = () => {
    onClose();
    navigate("/signin");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <div className="flex justify-center">
          <div className=" flex items-center justify-center">
            <PendingIcon />
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-xpress-orange text-center mb-2">
            Pending
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm font-normal text-xpress-gray mb-6">
          Your registration is awaiting approval from our partnership team
        </p>

        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleDone}
            className="w-full py-3 bg-xpress-blue text-white rounded-sm font-medium button-transition"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationSuccessModal;
