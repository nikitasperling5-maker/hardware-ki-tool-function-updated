
import React, { useState } from "react";

const profiles = [
  "Gaming",
  "Office",
  "KI-Training",
  "Content Creation",
  "Streaming",
];

export default function HardwareAdvisor() {
  const [answers, setAnswers] = useState({
    usage: "",
    budget: "",
    brand: "",
    upgrade: "",
  });
  const [recommendation, setRecommendation] = useState(null);

  const handleChange = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const generateRecommendation = () => {
    const { usage, budget, brand, upgrade } = answers;
    if (!usage || !budget) return;

    const rec = {
      CPU:
        usage === "Gaming"
          ? brand === "AMD"
            ? "Ryzen 7 7800X3D"
            : "Intel i7-14700K"
          : usage === "KI-Training"
          ? "Threadripper PRO 7995WX"
          : usage === "Office"
          ? "Intel i5-13400"
          : "Ryzen 9 7950X",
      GPU:
        usage === "Gaming"
          ? "RTX 4070 Super"
          : usage === "KI-Training"
          ? "NVIDIA A100"
          : usage === "Office"
          ? "Integrated Graphics"
          : "Radeon Pro W6600",
      RAM: budget === "High" ? "64GB DDR5" : budget === "Mid" ? "32GB" : "16GB",
      Storage: upgrade === "Yes" ? "2TB NVMe + 1TB HDD" : "1TB SSD",
      Brand: brand || "Keine Präferenz",
    };
    setRecommendation(rec);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🔧 Deine persönliche Hardware-KI</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Was willst du hauptsächlich machen?</label>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => handleChange("usage", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Bitte auswählen
            </option>
            {profiles.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Wie hoch ist dein Budget?</label>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => handleChange("budget", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Bitte auswählen
            </option>
            <option value="Low">Unter 800 €</option>
            <option value="Mid">800 – 1500 €</option>
            <option value="High">Über 1500 €</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Bevorzugte Marke?</label>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => handleChange("brand", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Keine Präferenz
            </option>
            <option value="AMD">AMD</option>
            <option value="Intel">Intel</option>
            <option value="NVIDIA">NVIDIA</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Soll dein System aufrüstbar sein?</label>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => handleChange("upgrade", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Bitte auswählen
            </option>
            <option value="Yes">Ja</option>
            <option value="No">Nein</option>
          </select>
        </div>

        <button
          onClick={generateRecommendation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          🔍 Empfehlung generieren
        </button>

        {recommendation && (
          <div className="mt-6 bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">💡 Empfohlene Konfiguration:</h2>
            <ul className="list-disc pl-5 space-y-1">
              {Object.entries(recommendation).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
