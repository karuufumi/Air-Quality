type Props = {
  title: string;
  value?: number;
  unit: string;
};

export default function MetricCard({ title, value, unit }: Props) {
  return (
    <div className="rounded-xl border p-6 shadow-sm bg-white">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold">
        {value !== undefined ? `${value} ${unit}` : "—"}
      </p>
    </div>
  );
}