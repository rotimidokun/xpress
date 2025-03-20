
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationSuccessModal = ({ isOpen, onClose }: RegistrationSuccessModalProps) => {
  const navigate = useNavigate();

  const handleDone = () => {
    onClose();
    navigate("/signin");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-xpress-orange" />
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-xpress-orange text-center mb-2">
            Pending
          </DialogTitle>
        </DialogHeader>

        <p className="text-lg text-gray-700 mb-6">
          Your registration is awaiting approval from our partnership team
        </p>

        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleDone}
            className="w-full py-3 bg-xpress-blue text-white rounded-md font-medium button-transition"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationSuccessModal;
