import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-xl border p-6 transition hover:shadow-lg">
      <div className="mb-4 text-blue-600">{icon}</div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}