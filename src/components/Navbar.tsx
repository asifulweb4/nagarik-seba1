"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: scrolled ? "10px 0" : "15px 0",
            transition: "all 0.3s ease",
            background: scrolled ? "rgba(15, 23, 42, 0.95)" : "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--glass-border)",
        }}>
            <div className="container" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
            }}>
                <Link href="/" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    textDecoration: "none",
                    flexShrink: 0,
                }}>
                    <Image
                        src="/logo.jpg"
                        alt="Nagarik Seba Logo"
                        width={50}
                        height={50}
                        style={{ objectFit: "contain", borderRadius: "50%" }}
                    />
                </Link>

                <div style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                }}>
                    {user ? (
                        <>
                            <Link href="/recharge" style={{
                                fontSize: "0.8rem",
                                color: "var(--primary)",
                                fontWeight: "600",
                                background: "rgba(99, 102, 241, 0.1)",
                                padding: "5px 10px",
                                borderRadius: "20px",
                                textDecoration: "none",
                                border: "1px solid rgba(99, 102, 241, 0.2)",
                                whiteSpace: "nowrap",
                            }}>রিচার্জ করুন</Link>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                gap: "1px",
                            }}>
                                <span style={{ fontSize: "0.75rem", color: "white", fontWeight: "600", whiteSpace: "nowrap" }}>
                                    স্বাগতম, {user.name}
                                </span>
                                <span style={{ fontSize: "0.7rem", color: "var(--primary)", fontWeight: "700" }}>
                                    ব্যালেন্স: {user.balance}৳
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                className="btn-primary"
                                style={{ padding: "6px 12px", fontSize: "0.8rem", background: "var(--error)", whiteSpace: "nowrap" }}
                            >
                                লগআউট
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--text-muted)" }}>লগইন</Link>
                            <Link href="/register" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.9rem" }}>রেজিস্ট্রেশন</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}