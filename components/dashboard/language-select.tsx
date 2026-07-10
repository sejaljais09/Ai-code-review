"use client";

type Props = {
  language: string;
  setLanguage: (language: string) => void;
};

const languages = [
  "java",
  "cpp",
  "python",
  "javascript",
  "typescript",
  "csharp",
  "go",
  "rust",
];

export default function LanguageSelect({
  language,
  setLanguage,
}: Props) {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
}