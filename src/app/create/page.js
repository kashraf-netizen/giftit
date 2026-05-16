"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function randomSuffix(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export default function CreatePoolPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    recipient_name: "",
    occasion: "",
    target_amount: "",
    deadline: "",
    organizer_name: "",
    organizer_email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const baseSlug = slugify(form.recipient_name) || "gift";
    const share_slug = `${baseSlug}-${randomSuffix()}`;

    const { error: insertError } = await supabase
      .from("gift_pools")
      .insert({
        recipient_name: form.recipient_name,
        occasion: form.occasion || null,
        target_amount: Number(form.target_amount),
        deadline: form.deadline || null,
        organizer_name: form.organizer_name,
        organizer_email: form.organizer_email,
        share_slug,
      });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push(`/pool/${share_slug}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-pink-50 to-white">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            Create a Gift Pool
          </h1>
          <p className="text-gray-600">
            Tell us who it&apos;s for and we&apos;ll handle the rest.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-pink-100 p-8 space-y-5"
        >
          <Field
            label="Recipient name"
            required
            value={form.recipient_name}
            onChange={update("recipient_name")}
            placeholder="Sarah"
          />
          <Field
            label="Occasion"
            value={form.occasion}
            onChange={update("occasion")}
            placeholder="Birthday, Wedding, …"
          />
          <Field
            label="Target amount (USD)"
            type="number"
            min="1"
            step="1"
            required
            value={form.target_amount}
            onChange={update("target_amount")}
            placeholder="200"
          />
          <Field
            label="Deadline"
            type="date"
            value={form.deadline}
            onChange={update("deadline")}
          />
          <Field
            label="Organizer name"
            required
            value={form.organizer_name}
            onChange={update("organizer_name")}
            placeholder="Your name"
          />
          <Field
            label="Organizer email"
            type="email"
            required
            value={form.organizer_email}
            onChange={update("organizer_email")}
            placeholder="you@example.com"
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-semibold py-3 px-8 rounded-full text-lg transition"
          >
            {loading ? "Creating…" : "Create Pool"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({ label, required, ...inputProps }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-pink-600"> *</span>}
      </span>
      <input
        {...inputProps}
        required={required}
        className="w-full rounded-lg border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none px-4 py-2 text-gray-900 placeholder:text-gray-400 transition"
      />
    </label>
  );
}
