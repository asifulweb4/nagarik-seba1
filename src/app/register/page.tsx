"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
    const { registerUser } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(formData.name, formData.email, formData.phone, formData.password);
            alert("রেজিস্ট্রেশন সফল হয়েছে! দয়া করে লগইন করুন।");
            router.push("/login");
        } catch (error: any) {
            alert("রেজিস্ট্রেশন ব্যর্থ হয়েছে: " + (error.message || "Unknown error"));
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
                maxWidth: "450px",
                width: "100%",
                padding: "40px",
            }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
                    <Image src="/logo.jpg" alt="Nagarik Seba Logo" width={150} height={150} style={{ objectFit: "contain", borderRadius: "50%" }} />
                </div>
                <h2 className="section-title" style={{ marginBottom: "20px", fontSize: "1.8rem" }}>রেজিস্ট্রেশন করুন</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>আপনার নাম</label>
                        <input
                            type="text"
                            required
                            placeholder="নাম লিখুন"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--glass-border)",
                                padding: "12px",
                                borderRadius: "8px",
                                color: "white",
                                outline: "none"
                            }}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>ইমেইল এড্রেস</label>
                        <input
                            type="email"
                            required
                            placeholder="example@mail.com"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--glass-border)",
                                padding: "12px",
                                borderRadius: "8px",
                                color: "white",
                                outline: "none"
                            }}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>ফোন নাম্বার</label>
                        <input
                            type="text"
                            required
                            placeholder="01XXXXXXXXX"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--glass-border)",
                                padding: "12px",
                                borderRadius: "8px",
                                color: "white",
                                outline: "none"
                            }}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>পাসওয়ার্ড</label>
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
                    <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>
                        অ্যাকাউন্ট তৈরি করুন
                    </button>
                </form>
                <p style={{ marginTop: "20px", textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    ইতিমধ্যে অ্যাকাউন্ট আছে? <Link href="/login" style={{ color: "var(--primary)", fontWeight: "600" }}>লগইন করুন</Link>
                </p>
            </div>
        </div>
    );
}
