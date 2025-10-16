// ColorPalette.jsx
import React from "react";

const ColorPalette = () => {
  const colors = {
    darkMode: [
      { name: "Primary Background", code: "#151821", usage: "Main layout background" },
      { name: "Secondary Background", code: "#242938", usage: "Card & table panels" },
      { name: "Accent Gradient", code: "linear-gradient(to left, #3b82f6, #4f46e5)", usage: "Buttons, active menu" },
      { name: "Hover Background", code: "#1f2937", usage: "Hover effects" },
      { name: "Text Primary", code: "#ffffff", usage: "Main text" },
      { name: "Text Secondary", code: "#9ca3af", usage: "Muted/label text" },
      { name: "Border / Divider", code: "#2d2d3a", usage: "Table borders" },
      { name: "Success / Active", code: "#22c55e", usage: "Success indicators" },
      { name: "Danger / Error", code: "#ef4444", usage: "Error indicators" },
      { name: "Highlight Blue", code: "#3b82f6", usage: "Buttons & progress" },
      { name: "Highlight Indigo", code: "#6366f1", usage: "Accent highlight" },
    ],
    lightMode: [
      { name: "Primary Background", code: "#ffffff", usage: "Main background" },
      { name: "Secondary Background", code: "#f8fafc", usage: "Dashboard background" },
      { name: "Accent Gradient", code: "linear-gradient(to bottom right, #e0e7ff, #f9fafb)", usage: "Panel backgrounds" },
      { name: "Sidebar Background", code: "#ffffff", usage: "Sidebar area" },
      { name: "Text Primary", code: "#111827", usage: "Primary text" },
      { name: "Text Secondary", code: "#6b7280", usage: "Muted text" },
      { name: "Border / Divider", code: "#e5e7eb", usage: "Borders" },
      { name: "Button Primary", code: "#3b82f6", usage: "Action buttons" },
      { name: "Button Hover", code: "#2563eb", usage: "Hover buttons" },
      { name: "Success / Active", code: "#16a34a", usage: "Success text/bar" },
      { name: "Error / Danger", code: "#dc2626", usage: "Error text" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-950 text-white p-10 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🎨 Parking Management System — Color Palette</h1>

      {/* Dark Mode Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">🌑 Dark Mode</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colors.darkMode.map((color, index) => (
            <div key={index} className="p-4 rounded-xl bg-[#1e1f28] border border-gray-700 shadow-md">
              <div
                className="h-16 w-full rounded-md mb-3"
                style={{ background: color.code.includes("linear") ? color.code : color.code }}
              ></div>
              <p className="font-semibold">{color.name}</p>
              <p className="text-gray-400 text-sm">{color.code}</p>
              <p className="text-gray-500 text-xs mt-1">{color.usage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Light Mode Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-yellow-300">☀️ Light Mode</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colors.lightMode.map((color, index) => (
            <div key={index} className="p-4 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-md">
              <div
                className="h-16 w-full rounded-md mb-3"
                style={{ background: color.code.includes("linear") ? color.code : color.code }}
              ></div>
              <p className="font-semibold">{color.name}</p>
              <p className="text-gray-600 text-sm">{color.code}</p>
              <p className="text-gray-500 text-xs mt-1">{color.usage}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ColorPalette;
