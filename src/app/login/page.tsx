"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
    const [formData, setFormData] = useState({ identifier: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            let loginEmail = formData.identifier;

            if (!formData.identifier.includes("@")) {
                const { data, error } = await supabase.rpc('get_email_by_phone', { p_phone: formData.identifier });
                if (error || !data) {
                    throw new Error("এই ফোন নাম্বার দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।");
                }
                loginEmail = data;
            }

            await login(loginEmail, formData.password);
            router.push("/");
        } catch (err: any) {
            setError(err.message || "লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
        }}>
            <div className="glass-card" style={{
                maxWidth: "400px",
                width: "100%",
                padding: "40px",
            }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
                    <Image src="/logo.jpg" alt="Nagarik Seba Logo" width={150} height={150} style={{ objectFit: "contain", borderRadius: "50%" }} />
                </div>
                <h2 className="section-title" style={{ marginBottom: "20px", fontSize: "1.8rem" }}>লগইন করুন</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>ইমেইল অথবা ফোন নাম্বার</label>
                        <input
                            type="text"
                            required
                            placeholder="example@mail.com অথবা 01XXXXXXXXX"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--glass-border)",
                                padding: "12px",
                                borderRadius: "8px",
                                color: "white",
                                outline: "none"
                            }}
                            value={formData.identifier}
                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>পাসওয়ার্ড</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--glass-border)",
                                padding: "12px",
                                borderRadius: "8px",
                                color: "white",
                                outline: "none"
                            }}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {error && (
                        <p style={{ color: "var(--error)", fontSize: "0.9rem", textAlign: "center" }}>{error}</p>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSubmitting}
                        style={{ marginTop: "10px", opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
                    >
                        {isSubmitting ? "লগইন হচ্ছে..." : "লগইন"}
                    </button>
                </form>
                <p style={{ marginTop: "20px", textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    অ্যাকাউন্ট নেই? <Link href="/register" style={{ color: "var(--primary)", fontWeight: "600" }}>রেজিস্ট্রেশন করুন</Link>
                </p>
            </div>
        </div>
    );
}