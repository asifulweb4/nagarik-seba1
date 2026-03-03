"use client";

export default function PaymentInfo() {
    return (
        <section style={{ padding: "100px 0", backgroundColor: "rgba(15, 23, 42, 0.3)" }}>
            <div className="container">
                <div className="glass-card" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "60px",
                    padding: "40px",
                    alignItems: "center"
                }}>
                    <div>
                        <h2 style={{ fontSize: "2.5rem", marginBottom: "25px", color: "white" }}>একাউন্টের ধরন ও সুবিধা</h2>
                        <div style={{ color: "var(--text-muted)", marginBottom: "30px", fontSize: "1rem", lineHeight: "1.6" }}>
                            <h3 style={{ fontSize: "1.2rem", color: "var(--primary)", marginBottom: "15px" }}>📢 বিজনেস একাউন্ট vs পার্সোনাল একাউন্ট – পার্থক্য জানেন তো?</h3>
                            <p style={{ marginBottom: "15px" }}>
                                অনেকেই এখনো বুঝে উঠতে পারেন না —<br />
                                বিজনেস একাউন্ট আর পার্সোনাল একাউন্ট এর আসল পার্থক্য কী! 🤔<br />
                                চলুন সহজভাবে জেনে নেই 👇
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
                                <div style={{ background: "rgba(99, 102, 241, 0.1)", padding: "15px", borderRadius: "8px", borderLeft: "4px solid var(--primary)" }}>
                                    <h4 style={{ color: "white", marginBottom: "8px" }}>🔹 বিজনেস একাউন্ট:</h4>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>✔️ প্রতি সেবায় ৫ টাকা কম চার্জ</li>
                                        <li>✔️ নিয়মিত কাজ করা দোকানদার ও উদ্যোক্তাদের জন্য বিশেষ সুবিধা</li>
                                        <li>✔️ বেশি কাজ, কম খরচ</li>
                                    </ul>
                                </div>
                                <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "15px", borderRadius: "8px", borderLeft: "4px solid var(--text-muted)" }}>
                                    <h4 style={{ color: "white", marginBottom: "8px" }}>🔹 পার্সোনাল একাউন্ট:</h4>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>✔️ সাধারণ ব্যবহারকারীদের জন্য</li>
                                        <li>✔️ প্রতি সেবায় ৫ টাকা বেশি রেট প্রযোজ্য</li>
                                    </ul>
                                </div>
                            </div>

                            <div style={{ textAlign: "center", padding: "15px", background: "rgba(34, 197, 94, 0.1)", borderRadius: "8px", border: "1px dashed #22c55e" }}>
                                <p style={{ color: "white", fontWeight: "600", marginBottom: "10px" }}>💼 আপনি যদি নিয়মিত কাজ করেন, তাহলে বিজনেস একাউন্ট নিলেই লাভবান হবেন।</p>
                                <p style={{ color: "#22c55e", fontSize: "1.1rem", fontWeight: "700" }}>৫০০ টাকা অ্যাড করলে পার্সোনাল একাউন্ট।</p>
                                <p style={{ color: "var(--primary)", fontSize: "1.1rem", fontWeight: "700" }}>১২০০ টাকা অ্যাড করলে বিজনেস একাউন্ট হবে।</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
