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
            padding: scrolled ? "15px 0" : "25px 0",
            transition: "all 0.3s ease",
            background: scrolled ? "rgba(15, 23, 42, 0.8)" : "transparent",
            backdropFilter: scrolled ? "blur(10px)" : "none",
            borderBottom: scrolled ? "1px solid var(--glass-border)" : "none",
        }}>
            <div className="container" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Link href="/" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    textDecoration: "none"
                }}>
                    <Image
                        src="/logo.jpg"
                        alt="Nagarik Seba Logo"
                        width={80}
                        height={80}
                        style={{
                            objectFit: "contain",
                            borderRadius: "50%"
                        }}
                    />
                </Link>

                <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
                    {user ? (
                        <>
                            <Link href="/recharge" style={{
                                fontSize: "0.9rem",
                                color: "var(--primary)",
                                fontWeight: "600",
                                background: "rgba(99, 102, 241, 0.1)",
                                padding: "6px 15px",
                                borderRadius: "20px",
                                textDecoration: "none",
                                border: "1px solid rgba(99, 102, 241, 0.2)"
                            }}>রিচার্জ করুন</Link>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                gap: "2px"
                            }}>
                                <span style={{ fontSize: "0.9rem", color: "white", fontWeight: "600" }}>স্বাগতম, {user.name}</span>
                                <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: "700" }}>ব্যালেন্স: {user.balance}৳</span>
                            </div>
                            <button
                                onClick={logout}
                                className="btn-primary"
                                style={{ padding: "8px 20px", fontSize: "0.9rem", background: "var(--error)" }}
                            >
                                লগআউট
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--text-muted)", transition: "color 0.3s" }}>লগইন</Link>
                            <Link href="/register" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.9rem" }}>রেজিস্ট্রেশন</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
