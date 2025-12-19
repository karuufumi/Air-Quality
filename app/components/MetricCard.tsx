type Props = {
  label: string;
  value: string;
  unit?: string;
};

export default function MetricCard({ label, value, unit }: Props) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold mt-2">
        {value} <span className="text-lg">{unit}</span>
      </p>
    </div>
  );
}