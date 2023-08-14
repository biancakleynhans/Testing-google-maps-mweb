import { useState } from "react";

interface ToggleProps {
  disabled: boolean;
  label: string;
  onToggle: (enabled: boolean) => void;
}

export default function MwebToggle({ disabled, label, onToggle }: ToggleProps) {
  const [enabled, setEnabled] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      const newEnabled = !enabled;
      setEnabled(newEnabled);
      onToggle(newEnabled);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center color mt-5 mb-5">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            disabled={disabled}
          />
          <div
            onClick={handleClick}
            className={`w-11 h-6 bg-mwPrimary-100 rounded-full peer ${disabled
              ? "opacity-50"
              : "cursor-pointer"
              }  peer-focus:ring peer-focus:ring-mwLightTeal-200 peer-checked:focus:ring-mwLightTeal-200 peer-hover:bg-mwPrimary-200 peer-checked:after:translate-x-full  peer-checked:after:ring-mwLightTeal-200 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mwPrimary-900 peer-checked:hover:bg-mwPrimary-800`}
          >
            <span className="ml-[55px] text-sm font-medium text-mwGrey-900" style={{ whiteSpace: 'nowrap' }}>
              {label}
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
