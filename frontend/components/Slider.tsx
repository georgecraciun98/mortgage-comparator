interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    suffix?: string;
    prefix?: string;
    onChange: (value: number) => void;
  }
  
  export default function Slider({
    label,
    value,
    min,
    max,
    step = 1,
    suffix = "",
    prefix = "",
    onChange,
  }: SliderProps) {
    const percentage = ((value - min) / (max - min)) * 100;
  
    return (
      <div className="space-y-3">
  
        <div className="flex justify-between">
  
          <span className="font-semibold text-slate-700">
            {label}
          </span>
  
          <span className="text-xl font-bold text-blue-600">
            {prefix}
            {value.toLocaleString()}
            {suffix}
          </span>
  
        </div>
  
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
          style={{
            background: `linear-gradient(to right,
              #2563EB 0%,
              #2563EB ${percentage}%,
              #CBD5E1 ${percentage}%,
              #CBD5E1 100%)`,
          }}
        />
  
      </div>
    );
  }