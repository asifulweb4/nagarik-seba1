"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";
import PaymentInfo from "@/components/PaymentInfo";
import Footer from "@/components/Footer";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div style={{ height: "100vh", background: "var(--background)" }} />;
  }

  return (
    <main>
      <Navbar />
      <div className="container" style={{ paddingTop: "70px" }}>
        <div className="glass-card animate-fade-in" style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div>
            <h2 style={{
              fontSize: "clamp(1.2rem, 5vw, 1.8rem)",
              marginBottom: "5px",
            }}>
              আসসালামু আলাইকুম, {user.name}!
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.85rem, 3vw, 1rem)" }}>
              আপনার আজকের সার্ভিস ড্যাশবোর্ডে আপনাকে স্বাগতম।
            </p>
          </div>
          <div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "5px" }}>
              সার্ভিস এক্সেস টোকেন
            </p>
            <div style={{
              background: "rgba(34, 197, 94, 0.1)",
              color: "#22c55e",
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "600",
              display: "inline-block",
              border: "1px solid rgba(34, 197, 94, 0.2)"
            }}>
              Active Session
            </div>
          </div>
        </div>
      </div>
      <Hero />
      <ServiceGrid />
      <PaymentInfo />
      <Footer />
    </main>
  );
}