// Base API client yang dipakai semua halaman
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",   // wajib: agar cookie (refresh token) ikut dikirim/diterima
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Terjadi kesalahan");
  }

  return res.json();
}