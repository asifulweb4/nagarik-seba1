import { useState, useMemo } from "react";
import OrderModal from "./OrderModal";

const services = [
    { id: 1, category: "NID & Smart Card", name: "নাম্বার টু লোকেশন", price: "১৯০৳" },
    { id: 2, category: "NID & Smart Card", name: "NID সাইন কপি (ভোটার নাম্বার)", price: "১৮৳" },
    { id: 3, category: "NID & Smart Card", name: "ফরম নাম্বার দিয়ে সাইন কপি", price: "২৩৳" },
    { id: 4, category: "NID & Smart Card", name: "অফিসিয়াল সার্ভার কপি (NID)", price: "৫৯৳" },
    { id: 26, category: "NID & Smart Card", name: "সার্ভার কপি", price: "১৫৳" },
    { id: 5, category: "NID & Smart Card", name: "অরিজিনাল স্মার্ট কার্ড", price: "১০৫০৳" },
    { id: 6, category: "NID & Smart Card", name: "স্মার্ট কার্ড pdf", price: "৮৫৳" },
    { id: 23, category: "NID & Smart Card", name: "Nid pdf", price: "২৫৳" },
    { id: 7, category: "NID & Smart Card", name: "নাম ঠিকানা দিয়ে আইডি কার্ড", price: "১৮০৳" },
    { id: 8, category: "SIM & Biometric", name: "SIM Biometric - BL", price: "৪৫৳" },
    { id: 9, category: "SIM & Biometric", name: "SIM Biometric - GP", price: "৫০৳" },
    { id: 10, category: "SIM & Biometric", name: "SIM Biometric - Robi/Airtel", price: "৫০৳" },
    { id: 11, category: "SIM & Biometric", name: "SIM Biometric - Teletalk", price: "১০০৳" },
    { id: 12, category: "Call & Storage", name: "কল লিস্ট (৩ মাস)", price: "৫১০৳" },
    { id: 13, category: "Call & Storage", name: "কল লিস্ট (৬ মাস)", price: "৭৮০৳" },
    { id: 14, category: "Call & Storage", name: "SMS list (৩ মাস)", price: "৮৩০৳" },
    { id: 15, category: "Call & Storage", name: "SMS list (৬ মাস)", price: "১২০০৳" },
    { id: 16, category: "Mobile Finance", name: "বিকাশ ইনফরমেশন", price: "২৪০৳" },
    { id: 17, category: "Mobile Finance", name: "নগদ ইনফরমেশন", price: "৩১০৳" },
    { id: 18, category: "Doc & Services", name: "টিন সার্টিফিকেট", price: "৪৫৳" },
    { id: 19, category: "Doc & Services", name: "নতুন জন্ম নিবন্ধন", price: "৫১০৳" },
    { id: 20, category: "Doc & Services", name: "Imei টু সকল নাম্বার", price: "২১০৳" },
    { id: 21, category: "Other Services", name: "BMET সেবা", price: "আলোচনা সাপেক্ষে" },
    { id: 22, category: "Other Services", name: "ভূমি সেবা", price: "আলোচনা সাপেক্ষে" },
    { id: 24, category: "NID & Smart Card", name: "আইডি কার্ড সংশোধন", price: "আলোচনা সাপেক্ষে" },
    { id: 25, category: "NID & Smart Card", name: "ভোটার স্লিপ দিয়ে আইডি কার্ড", price: "আলোচনা সাপেক্ষে" },
];

export default function ServiceGrid() {
    const [selectedService, setSelectedService] = useState<{ name: string, price: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", ...new Set(services.map(s => s.category))];

    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || service.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const groupedServices = useMemo(() => {
        const groups: Record<string, typeof services> = {};
        filteredServices.forEach(s => {
            if (!groups[s.category]) groups[s.category] = [];
            groups[s.category].push(s);
        });
        return groups;
    }, [filteredServices]);

    return (
        <section id="services" style={{ padding: "60px 0" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "40px" }} className="animate-fade-in">
                    <h2 className="section-title">আমাদের প্রিমিয়াম সার্ভিস সমূহ</h2>
                    <p style={{ color: "var(--text-muted)", marginTop: "10px" }}>আপনার প্রয়োজনীয় সার্ভিসটি সহজেই খুঁজে নিন</p>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    marginBottom: "40px",
                    alignItems: "center"
                }} className="animate-slide-up">
                    {/* Search Bar */}
                    <div style={{ width: "100%", maxWidth: "600px" }}>
                        <input
                            type="text"
                            placeholder="সার্ভিস খুঁজুন..."
                            style={{
                                width: "100%",
                                padding: "12px 20px",
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid var(--glass-border)",
                                borderRadius: "30px",
                                color: "white",
                                fontSize: "1rem",
                                outline: "none",
                                boxSizing: "border-box",
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Category Tabs */}
                    <div style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        padding: "0 10px",
                    }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: "6px 14px",
                                    borderRadius: "20px",
                                    border: "1px solid var(--glass-border)",
                                    background: activeCategory === cat ? "var(--primary)" : "rgba(255, 255, 255, 0.05)",
                                    color: activeCategory === cat ? "white" : "var(--text-muted)",
                                    cursor: "pointer",
                                    fontSize: "0.85rem",
                                    fontWeight: "600",
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {Object.keys(groupedServices).length > 0 ? (
                    Object.keys(groupedServices).map((category, index) => (
                        <div key={category} className="animate-slide-up" style={{ marginBottom: "40px", animationDelay: `${index * 0.1}s` } as any}>
                            <h3 style={{
                                fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
                                marginBottom: "20px",
                                paddingLeft: "15px",
                                borderLeft: "4px solid var(--primary)",
                                color: "white"
                            }}>{category}</h3>

                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
                                gap: "15px"
                            }}>
                                {groupedServices[category].map(service => (
                                    <div key={service.id} className="glass-card" style={{
                                        padding: "18px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "15px",
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: "clamp(0.95rem, 3vw, 1.15rem)", marginBottom: "4px", color: "white" }}>
                                                    {service.name}
                                                </h4>
                                                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Premium Digital Service</p>
                                            </div>
                                            <div style={{
                                                color: "var(--primary)",
                                                fontWeight: "800",
                                                fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
                                                background: "rgba(99, 102, 241, 0.15)",
                                                padding: "5px 10px",
                                                borderRadius: "8px",
                                                whiteSpace: "nowrap",
                                                flexShrink: 0,
                                            }}>
                                                {service.price}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedService({ name: service.name, price: service.price })}
                                            className="btn-primary"
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            অর্ডার করুন
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
                        <p style={{ fontSize: "1.1rem" }}>দুঃখিত, কোনো সার্ভিস খুঁজে পাওয়া যায়নি।</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                            style={{
                                marginTop: "20px",
                                background: "none",
                                border: "1px solid var(--primary)",
                                color: "var(--primary)",
                                padding: "8px 25px",
                                borderRadius: "20px",
                                cursor: "pointer"
                            }}
                        >
                            সব সার্ভিস দেখুন
                        </button>
                    </div>
                )}
            </div>

            <OrderModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                serviceName={selectedService?.name || ""}
                servicePrice={selectedService?.price || ""}
            />
        </section>
    );
}