import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import Select from "../Select.tsx";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../../icons/index.ts";
import DatePicker from "../date-picker.tsx";

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <ComponentCard title="Default Inputs">
      <div className="space-y-6">
        <div>
          <Label htmlFor="inputTwo">Input with Placeholder</Label>
          <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
        </div>
        <div>
          <Label>Password Input</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
