"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RechargePage() {
    const { user, isLoading, updateBalance } = useAuth();
    const router = useRouter();
    const [accountType, setAccountType] = useState<"Personal" | "Business">("Personal");
    const [formData, setFormData] = useState({
        senderNumber: "",
        gmail: "",
        transactionId: "",
        amount: ""
    });
    const [error, setError] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isBkashCopied, setIsBkashCopied] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    const minAmount = accountType === "Personal" ? 500 : 1200;

    const handleCopy = () => {
        navigator.clipboard.writeText("01873290088");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleBkashCopy = () => {
        navigator.clipboard.writeText("01827536645");
        setIsBkashCopied(true);
        setTimeout(() => setIsBkashCopied(false), 2000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const amountNum = parseFloat(formData.amount);
        if (amountNum < minAmount) {
            setError(`${accountType} একাউন্ট এর জন্য সর্বনিম্ন ${minAmount} টাকা রিচার্জ করতে হবে।`);
            return;
        }

        updateBalance(amountNum);
        alert(`রিচার্জ সফল হয়েছে! আপনার একাউন্টে ${amountNum}৳ যোগ করা হয়েছে।`);
        router.push("/");
    };

    if (isLoading || !user) return <div style={{ height: "100vh", background: "var(--background)" }}></div>;

    return (
        <main style={{ minHeight: "100vh", background: "var(--background)" }}>
            <Navbar />
            <div className="container" style={{ paddingTop: "140px", paddingBottom: "100px" }}>
                <div style={{ maxWidth: "600px", margin: "0 auto" }} className="animate-fade-in">
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <h1 className="section-title">ব্যালেন্স রিচার্জ করুন</h1>
                        <p style={{ color: "var(--text-muted)", marginTop: "10px" }}>
                            আপনার একাউন্টে ব্যালেন্স যোগ করতে নিচের ফর্মটি পূরণ করুন
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: "40px" }}>
                        <div style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "30px",
                            padding: "5px",
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "12px"
                        }}>
                            <button
                                onClick={() => setAccountType("Personal")}
                                style={{
                                    flex: 1,
                                    padding: "12px",
                                    borderRadius: "8px",
                                    border: "none",
                                    background: accountType === "Personal" ? "var(--primary)" : "transparent",
                                    color: "white",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                Personal Account
                            </button>
                            <button
                                onClick={() => setAccountType("Business")}
                                style={{
                                    flex: 1,
                                    padding: "12px",
                                    borderRadius: "8px",
                                    border: "none",
                                    background: accountType === "Business" ? "var(--primary)" : "transparent",
                                    color: "white",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                Business Account
                            </button>
                        </div>

                        <div style={{
                            background: "rgba(99, 102, 241, 0.1)",
                            padding: "15px",
                            borderRadius: "10px",
                            marginBottom: "15px",
                            border: "1px solid rgba(99, 102, 241, 0.2)",
                            textAlign: "center"
                        }}>
                            <p style={{ color: "var(--primary)", fontWeight: "600", fontSize: "1.1rem" }}>
                                {accountType} একাউন্ট এর জন্য সর্বনিম্ন {minAmount} টাকা অ্যাড করতে হবে।
                            </p>
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "15px",
                            marginBottom: "25px"
                        }}>
                            {/* bKash Card */}
                            <div style={{
                                background: "rgba(236, 72, 153, 0.1)",
                                border: "1px solid rgba(236, 72, 153, 0.2)",
                                padding: "15px",
                                borderRadius: "10px",
                                textAlign: "center"
                            }}>
                                <p style={{ fontSize: "0.8rem", color: "#ec4899", fontWeight: "700", marginBottom: "5px" }}>bKash (Personal)</p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                    <p style={{ fontSize: "1.1rem", color: "white", fontWeight: "800" }}>01827536645</p>
                                    <button
                                        onClick={handleBkashCopy}
                                        style={{
                                            background: isBkashCopied ? "#22c55e" : "rgba(255, 255, 255, 0.1)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            color: "white",
                                            padding: "6px 12px",
                                            borderRadius: "8px",
                                            fontSize: "0.75rem",
                                            cursor: "pointer",
                                            fontWeight: "700",
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            boxShadow: isBkashCopied ? "0 0 15px rgba(34, 197, 94, 0.4)" : "none"
                                        }}
                                    >
                                        {isBkashCopied ? (
                                            <>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                </svg>
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Nagad Card */}
                            <div style={{
                                background: "rgba(249, 115, 22, 0.1)",
                                border: "1px solid rgba(249, 115, 22, 0.2)",
                                padding: "15px",
                                borderRadius: "10px",
                                textAlign: "center",
                                position: "relative"
                            }}>
                                <p style={{ fontSize: "0.8rem", color: "#f97316", fontWeight: "700", marginBottom: "5px" }}>Nagad (Personal)</p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                    <p style={{ fontSize: "1.1rem", color: "white", fontWeight: "800" }}>01873290088</p>
                                    <button
                                        onClick={handleCopy}
                                        style={{
                                            background: isCopied ? "#22c55e" : "rgba(255, 255, 255, 0.1)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            color: "white",
                                            padding: "6px 12px",
                                            borderRadius: "8px",
                                            fontSize: "0.75rem",
                                            cursor: "pointer",
                                            fontWeight: "700",
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            boxShadow: isCopied ? "0 0 15px rgba(34, 197, 94, 0.4)" : "none"
                                        }}
                                    >
                                        {isCopied ? (
                                            <>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                </svg>
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Sender Number (bKash/Nagad)</label>
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
                                    value={formData.senderNumber}
                                    onChange={(e) => setFormData({ ...formData, senderNumber: e.target.value })}
                                />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Gmail</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="example@gmail.com"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid var(--glass-border)",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        color: "white",
                                        outline: "none"
                                    }}
                                    value={formData.gmail}
                                    onChange={(e) => setFormData({ ...formData, gmail: e.target.value })}
                                />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Transaction ID</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="TRX12345678"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid var(--glass-border)",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        color: "white",
                                        outline: "none"
                                    }}
                                    value={formData.transactionId}
                                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Amount</label>
                                <input
                                    type="number"
                                    required
                                    placeholder={`Min ${minAmount}`}
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid var(--glass-border)",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        color: "white",
                                        outline: "none"
                                    }}
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>

                            {error && (
                                <p style={{ color: "var(--error)", fontSize: "0.9rem", textAlign: "center" }}>{error}</p>
                            )}

                            <button type="submit" className="btn-primary" style={{ marginTop: "10px", padding: "15px" }}>
                                রিচার্জ রিকোয়েস্ট পাঠান
                            </button>

                            <button
                                type="button"
                                onClick={() => router.push("/")}
                                style={{
                                    background: "transparent",
                                    border: "1px solid var(--glass-border)",
                                    color: "var(--text-muted)",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                রিচার্জ করতে চাই না, হোমে ফিরে যান
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}