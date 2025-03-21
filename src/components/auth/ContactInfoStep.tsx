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
import { PasswordInput } from "@/components/PasswordInput";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";

interface ContactInfoStepProps {
  control: Control<any>;
  onPrevious: () => void;
  isLoading: boolean;
  password: string;
}

export function ContactInfoStep({
  control,
  onPrevious,
  isLoading,
  password,
}: ContactInfoStepProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-xpress-blue pb-4">
        Business Address
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-10 gap-4">
          <FormField
            control={control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel className="!text-xpress-label-black font-medium">
                  House Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-sm"
                    placeholder="Enter house number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="street"
            render={({ field }) => (
              <FormItem className="col-span-7">
                <FormLabel className="!text-xpress-label-black font-medium">
                  Street
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-sm"
                    placeholder="Enter street"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-xpress-label-black font-medium">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-sm"
                    placeholder="Enter city"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-xpress-label-black font-medium">
                  State
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-sm">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="abuja">Abuja</SelectItem>
                    <SelectItem value="rivers">Rivers</SelectItem>
                    <SelectItem value="kano">Kano</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h2 className="text-sm font-medium text-xpress-blue pt-4">
          Contact Person Information
        </h2>

        <FormField
          control={control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-xpress-label-black font-medium">
                Contact Name
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-sm capitalize"
                  placeholder="Enter contact name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-xpress-label-black font-medium">
                Contact Phone Number
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
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-xpress-label-black font-medium">
                Contact Email Address
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-sm"
                  placeholder="Enter contact email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-xl font-medium text-xpress-blue pt-4">Password</h2>

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-xpress-label-black font-medium">
                Password
              </FormLabel>
              <PasswordInput
                control={control}
                name="password"
                label=""
                placeholder="Enter password"
              />
              <PasswordStrengthIndicator password={password} />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-xpress-label-black font-medium">
                Confirm Password
              </FormLabel>
              <PasswordInput
                control={control}
                name="confirmPassword"
                label=""
                placeholder="Confirm password"
              />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <Button
            type="button"
            onClick={onPrevious}
            variant="outline"
            className="px-4 py-2 text-sm border border-gray-300 rounded-sm hover:bg-gray-50"
          >
            Back
          </Button>

          <div className="text-gray-500 text-sm mr-auto ml-4">Step 2 of 2</div>

          <Button
            type="submit"
            disabled={isLoading}
            className="px-10 py-2 bg-xpress-blue text-white rounded-sm font-medium button-transition"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
