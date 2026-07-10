type Review = {
  score: number;
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
  bugs: string[];
  suggestions: string[];
  improvedCode: string;
};

type Props = {
  review: Review;
};

export default function ReviewPanel({ review }: Props) {
  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          AI Review
        </h2>

        <div className="rounded-full bg-blue-100 px-5 py-2 text-lg font-bold text-blue-700">
          {review.score}/100
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Summary</h3>
        <p className="mt-2 text-gray-600">
          {review.summary}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="font-semibold">
            Time Complexity
          </p>

          <p className="mt-2 text-blue-600">
            {review.timeComplexity}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="font-semibold">
            Space Complexity
          </p>

          <p className="mt-2 text-blue-600">
            {review.spaceComplexity}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg">
          Bugs
        </h3>

        <ul className="mt-3 list-disc pl-6 space-y-2">
          {review.bugs.map((bug, index) => (
            <li key={index} className="text-red-600">
              {bug}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg">
          Suggestions
        </h3>

        <ul className="mt-3 list-disc pl-6 space-y-2">
          {review.suggestions.map((item, index) => (
            <li key={index} className="text-green-700">
              {item}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}