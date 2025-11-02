export function TypeBadge({ type }) {
  const colorMap = {
    A: "bg-green-100 text-green-700 border-green-300",
    B: "bg-orange-100 text-orange-700 border-orange-300",
    C: "bg-gray-100 text-gray-600 border-gray-300",
  };
  const classes = colorMap[type] || colorMap.C;

  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${classes}`}>
      {type}
    </span>
  );
}
