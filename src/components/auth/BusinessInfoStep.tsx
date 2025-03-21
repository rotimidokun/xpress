import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";

interface BusinessInfoStepProps {
  control: Control<any>;
  onNext: () => void;
  logoPreview: string | null;
  setLogoPreview: (preview: string | null) => void;
  setLogoFile: (file: File | null) => void;
}

export function BusinessInfoStep({
  control,
  onNext,
  logoPreview,
  setLogoPreview,
  setLogoFile,
}: BusinessInfoStepProps) {
  const handleFileChange = (file: File | null) => {
    setLogoFile(file);

    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };

  return (
    <div>
      <h2 className="text-sm font-medium text-xpress-blue pb-4">
        Business Information
      </h2>

      <div className="space-y-6">
        <FormField
          control={control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-xpress-label-black font-medium">
                Business name
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-sm"
                  placeholder="Enter business name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="businessEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-xpress-label-black font-medium">
                Business Email Address
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-sm"
                  placeholder="Enter business email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="businessPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-xpress-label-black font-medium">
                Business Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-sm"
                  placeholder="e.g. 08012345678"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="businessCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-xpress-label-black font-medium">
                Business Category
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="rounded-sm">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="accountNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-xpress-label-black font-medium">
                Account No
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-sm"
                  placeholder="Enter account number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FileUpload
                onFileChange={(file) => {
                  handleFileChange(file);
                  field.onChange(file);
                }}
                previewUrl={logoPreview}
                label="Business Logo"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-4 items-center">
          <Button
            type="button"
            onClick={onNext}
            className="px-10 py-2 bg-xpress-blue text-white rounded-sm text-sm font-medium button-transition"
          >
            Next
          </Button>
          <div className="text-xpress-gray text-sm">Step 1 of 2</div>
        </div>
      </div>
    </div>
  );
}
