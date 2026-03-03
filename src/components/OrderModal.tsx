"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName: string;
    servicePrice: string;
}

export default function OrderModal({ isOpen, onClose, serviceName, servicePrice }: OrderModalProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        details: "",
    });

    const convertBengaliToEnglishNumbers = (str: string) => {
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return str.replace(/[০-৯]/g, (match) => bengaliDigits.indexOf(match).toString());
    };

    const { user, updateBalance } = useAuth();

    if (!isOpen) return null;

    const serviceInfoMap: Record<string, string> = {
        "নাম্বার টু লোকেশন": "মোবাইল নাম্বার",
        "স্মার্ট কার্ড pdf": "আইডি নাম্বার / জন্ম তারিখ",
        "Nid pdf": "আইডি নাম্বার / জন্ম তারিখ",
        "অফিসিয়াল সার্ভার কপি (NID)": "আইডি নাম্বার / জন্ম তারিখ",
        "নাম ঠিকানা দিয়ে আইডি কার্ড": "নাম (পিতামাতা সহ ব্যক্তির নাম) / থানা সহ ঠিকানা",
        "কল লিস্ট (৩ মাস)": "মোবাইল নাম্বার",
        "কল লিস্ট (৬ মাস)": "মোবাইল নাম্বার",
        "SMS list (৩ মাস)": "মোবাইল নাম্বার",
        "SMS list (৬ মাস)": "মোবাইল নাম্বার",
        "SIM Biometric - BL": "মোবাইল নাম্বার",
        "SIM Biometric - GP": "মোবাইল নাম্বার",
        "SIM Biometric - Robi/Airtel": "মোবাইল নাম্বার",
        "SIM Biometric - Teletalk": "মোবাইল নাম্বার",
        "Imei টু সকল নাম্বার": "IMEI নাম্বার",
        "অরিজিনাল স্মার্ট কার্ড": "নাম / আইডি নাম্বার",
        "টিন সার্টিফিকেট": "আইডি কার্ড ইনফরমেশন",
        "বিকাশ ইনফরমেশন": "বিকাশ নাম্বার",
        "নগদ ইনফরমেশন": "নগদ নাম্বার",
        "নতুন জন্ম নিবন্ধন": "আবেদনকারীর তথ্য",
        "BMET সেবা": "পাসপোর্ট নাম্বার / প্রয়োজনীয় তথ্য",
        "ভূমি সেবা": "জমির তথ্য / প্রয়োজনীয় তথ্য",
        "NID সাইন কপি (ভোটার নাম্বার)": "আইডি নাম্বার / জন্ম তারিখ",
        "ফরম নাম্বার দিয়ে সাইন কপি": "আইডি নাম্বার / জন্ম তারিখ",
        "আইডি কার্ড সংশোধন": "আপনার প্রয়োজনীয় ডকুমেন্টসের লিংক বা বিস্তারিত তথ্য (নিচে বিস্তারিত দেখুন)",
        "ভোটার স্লিপ দিয়ে আইডি কার্ড": "স্লিপ নাম্বার"
    };

    const infoRequirement = serviceInfoMap[serviceName] || "নাম/নাম্বার/বিস্তারিত তথ্য";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Extract numeric price (e.g., "১৯০৳" -> 190)
        const englishPrice = convertBengaliToEnglishNumbers(servicePrice);
        const priceValue = parseInt(englishPrice.replace(/[^0-9]/g, "")) || 0;

        if (!user) {
            alert("অনুগ্রহ করে আগে লগইন করুন।");
            router.push("/login");
            onClose();
            return;
        }

        if (user.balance < priceValue) {
            alert(`আপনার ব্যালেন্স পর্যাপ্ত নয়! \nপ্রয়োজন: ${priceValue}৳\nবর্তমান ব্যালেন্স: ${user.balance}৳\nদয়া করে রিচার্জ করুন।`);
            router.push("/recharge");
            onClose();
            return;
        }

        try {
            // Insert into Supabase
            const { error } = await supabase.from('orders').insert({
                user_id: user.id,
                service_name: serviceName,
                service_price: priceValue,
                details: formData.details,
                status: 'pending'
            });

            if (error) throw error;

            await updateBalance(-priceValue);

            alert(`অর্ডার সফল হয়েছে! \nসার্ভিস: ${serviceName}\n${priceValue}৳ আপনার ব্যালেন্স থেকে কেটে নেয়া হয়েছে।`);
            onClose();
            setFormData({ details: "" });
        } catch (error: any) {
            console.error("Order error:", error);
            alert("অর্ডার করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
        }
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "20px",
            backdropFilter: "blur(5px)"
        }}>
            <div className="glass-card" style={{
                maxWidth: "500px",
                width: "100%",
                padding: "30px", // Reduced padding
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto",
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "15px",
                        right: "20px",
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        fontSize: "1.5rem",
                        cursor: "pointer"
                    }}
                >
                    &times;
                </button>

                <h2 style={{ marginBottom: "10px", color: "white" }}>অর্ডার করুন</h2>
                <p style={{ color: "var(--primary)", fontWeight: "700", marginBottom: "25px", fontSize: "1.2rem" }}>
                    {serviceName} - {servicePrice}
                </p>

                {serviceName === "আইডি কার্ড সংশোধন" && (
                    <div style={{ marginBottom: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        <h4 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '1rem' }}>📄 প্রয়োজনীয় ডকুমেন্টস:</h4>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '15px' }}>
                            <li><b>১️⃣ জন্ম সনদ:</b> অবশ্যই অনলাইন ভেরিফায়েড হতে হবে (ইউনিয়ন/পৌরসভা/সিটি কর্পোরেশন থেকে ইস্যুকৃত)</li>
                            <li><b>২️⃣ শিক্ষাগত সনদ (যদি থাকে):</b> JSC / SSC / HSC / সমমান (যেখানে জন্ম তারিখ উল্লেখ আছে)</li>
                            <li><b>৩️⃣ পাসপোর্ট (যদি থাকে):</b> MRP বা ই-পাসপোর্ট</li>
                            <li><b>৪️⃣ পুরাতন কাগজপত্র (যদি থাকে):</b> স্কুল রেজিস্ট্রেশন কার্ড, হাসপাতালের জন্ম রেকর্ড বা সরকারি কোনো পুরাতন ডকুমেন্ট</li>
                            <li><b>৫️⃣ বর্তমান NID কার্ড / NID স্লিপ</b></li>
                            <li><b>৬️⃣ আবেদনপত্র:</b> অনলাইনে পূরণ করা আবেদন (প্রয়োজন হলে এফিডেভিট)</li>
                        </ul>
                        <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <p style={{ marginBottom: '8px' }}><b>🖥️ আবেদন করার জায়গা:</b> অনলাইনে আবেদন করতে হয় (যাচাই ও অনুমোদন করে বাংলাদেশ নির্বাচন কমিশন)</p>
                            <p><b>⏳ সময় ও ফি:</b> সাধারণত ৪–৬ কর্মদিবস। ফি সংশোধনের ধরন অনুযায়ী ভিন্ন হতে পারে।</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>প্রয়োজনীয় তথ্য ({infoRequirement})</label>
                        <textarea
                            required
                            rows={3}
                            placeholder={`${infoRequirement} এখানে লিখুন...`}
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--glass-border)",
                                padding: "12px",
                                borderRadius: "8px",
                                color: "white",
                                outline: "none",
                                resize: "none",
                                fontFamily: "inherit"
                            }}
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>
                        অর্ডার কনফার্ম করুন
                    </button>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
                        অর্ডার করার পর সার্ভিস চার্জ আপনার ব্যালেন্স থেকে কেটে নেয়া হবে। ব্যালেন্স না থাকলে রিচার্জ করুন।
                    </p>
                </form>
            </div>
        </div>
    );
}
