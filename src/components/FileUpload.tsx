import { useRef, useState } from "react";
import { DragEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { PaperClipIcon, UploadIcon } from "@/assets";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  previewUrl: string | null;
  maxSize?: number; // in MB
  accept?: string;
  label?: string;
}

export function FileUpload({
  onFileChange,
  previewUrl,
  maxSize = 10,
  accept = "image/*",
  label = "Image (Logo)",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File | null) => {
    if (!file) return;

    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum upload size is ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }

    onFileChange(file);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget === dropAreaRef.current) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        ref={dropAreaRef}
        className={`border border-dashed border-[#ABA7AF] rounded-md p-4 text-center transition-colors ${
          isDragging
            ? "border-xpress-blue bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="flex flex-col items-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-32 object-contain mb-2"
            />
            <button
              type="button"
              onClick={() => onFileChange(null)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <UploadIcon className="mx-auto h-12 w-12 " />
            <p className="mt-2 text-xs font-normal text-xpress-gray">
              {isDragging
                ? "Drop your file here"
                : "Drag here or click the button below to upload"}
            </p>
            <label
              htmlFor="file-upload"
              className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-normal rounded-md shadow-sm text-white bg-xpress-blue hover:bg-blue-600 focus:outline-none cursor-pointer"
            >
              <PaperClipIcon className="mr-2" /> Choose file
            </label>
            <input
              id="file-upload"
              name="file"
              type="file"
              onChange={handleFileChange}
              accept={accept}
              className="sr-only"
            />
            <p className="mt-2 text-sm text-xpress-gray">
              Maximum upload size: {maxSize}MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}
