type Props = {
  score: number;
};

export default function ScoreCircle({ score }: Props) {
  const color =
    score >= 80
      ? "text-green-600 border-green-500 bg-green-50"
      : score >= 60
      ? "text-yellow-600 border-yellow-500 bg-yellow-50"
      : "text-red-600 border-red-500 bg-red-50";

  const label =
    score >= 80
      ? "Excellent"
      : score >= 60
      ? "Good"
      : "Needs Improvement";

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-24 w-24 items-center justify-center rounded-full border-4 text-3xl font-bold ${color}`}
      >
        {score}
      </div>

      <p className="mt-3 font-semibold">
        {label}
      </p>
    </div>
  );
}