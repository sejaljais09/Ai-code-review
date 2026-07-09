import {
  Bot,
  FileCode2,
  History,
  BarChart3,
} from "lucide-react";

import FeatureCard from "./feature-card";

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold">
          Why Choose Our Platform?
        </h2>

        <p className="mt-4 text-muted-foreground">
          Everything you need to improve your code quality.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          icon={<Bot size={36} />}
          title="AI Review"
          description="Receive intelligent suggestions and bug detection powered by AI."
        />

        <FeatureCard
          icon={<FileCode2 size={36} />}
          title="File Upload"
          description="Upload source code files for instant analysis."
        />

        <FeatureCard
          icon={<BarChart3 size={36} />}
          title="Code Analysis"
          description="Understand complexity, quality, and best practices."
        />

        <FeatureCard
          icon={<History size={36} />}
          title="Review History"
          description="Access and manage all your previous reviews."
        />
      </div>
    </section>
  );
}