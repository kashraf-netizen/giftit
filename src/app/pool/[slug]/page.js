"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PoolPage() {
  const { slug } = useParams();
  const [pool, setPool] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of window.location after hydration
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error: fetchError } = await supabase
        .from("gift_pools")
        .select("recipient_name, occasion, target_amount")
        .eq("share_slug", slug)
        .single();

      if (cancelled) return;

      if (fetchError) setError(fetchError.message);
      else setPool(data);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-pink-50 to-white">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">
          Pool created! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Share this link with friends.
        </p>

        {loading && <p className="text-gray-500">Loading…</p>}

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {error}
          </p>
        )}

        {pool && (
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-8 space-y-4 text-left">
            <Row label="Recipient" value={pool.recipient_name} />
            <Row label="Occasion" value={pool.occasion || "—"} />
            <Row
              label="Target"
              value={`$${Number(pool.target_amount).toLocaleString()}`}
            />
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Share URL
              </div>
              <input
                readOnly
                value={shareUrl}
                onFocus={(e) => e.target.select()}
                className="w-full rounded-lg border border-gray-200 bg-pink-50 px-4 py-2 text-gray-900 text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-pink-50 pb-2">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );
}
