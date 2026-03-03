"use client";

export default function Hero() {
    return (
        <section style={{
            padding: "160px 0 100px",
            textAlign: "center",
            background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)"
        }}>
            <div className="container">
                <h1 className="section-title" style={{ fontSize: "4rem", marginBottom: "20px" }}>আপনার বিশ্বস্ত <br /> প্রিমিয়াম সার্ভিস পার্টনার</h1>
                <p style={{
                    fontSize: "1.2rem",
                    color: "var(--text-muted)",
                    maxWidth: "700px",
                    margin: "0 auto 40px",
                }}>
                    একই প্ল্যাটফর্মে পেয়ে যান NID, SIM, জন্ম নিবন্ধন সহ সকল গুরুত্বপূর্ণ ডিজিটাল সার্ভিস। দ্রুত ডেলিভারি ও ১০০% বিশ্বস্ততার নিশ্চয়তা।
                </p>
                <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                    <a href="#services" className="btn-primary" style={{ padding: "15px 40px", fontSize: "1.1rem", textDecoration: "none" }}>সার্ভিস দেখুন</a>
                    <a href="#contact" style={{
                        background: "transparent",
                        border: "1px solid var(--glass-border)",
                        color: "white",
                        padding: "15px 40px",
                        borderRadius: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        backdropFilter: "blur(5px)",
                        textDecoration: "none"
                    }}>যোগাযোগ করুন</a>
                </div>
            </div>
        </section>
    );
}
