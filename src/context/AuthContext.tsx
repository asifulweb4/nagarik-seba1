"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    balance: number;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
    updateBalance: (amount: number) => Promise<void>;
    registerUser: (name: string, email: string, phone: string, pass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // ৫ সেকেন্ডের মধ্যে load না হলে জোর করে বন্ধ করো
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        const initAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    await fetchUserData(session.user.id, session.user.email || '');
                } else {
                    setIsLoading(false);
                }
            } catch {
                setIsLoading(false);
            } finally {
                clearTimeout(timeout);
            }
        };

        initAuth();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === "SIGNED_IN" && session?.user) {
                    await fetchUserData(session.user.id, session.user.email || '');
                } else if (event === "SIGNED_OUT") {
                    setUser(null);
                    setIsLoading(false);
                }
            }
        );

        return () => {
            clearTimeout(timeout);
            authListener.subscription.unsubscribe();
        };
    }, []);

    const fetchUserData = async (userId: string, email: string) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (data) {
                setUser({
                    id: data.id,
                    name: data.name || '',
                    email: email,
                    phone: data.phone || '',
                    balance: data.balance || 0,
                });
            } else {
                console.error("fetchUserData error:", error);
                setUser({
                    id: userId,
                    name: email.split('@')[0],
                    email: email,
                    balance: 0,
                });
            }
        } catch (error) {
            console.error("fetchUserData catch:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, pass: string) => {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: pass,
        });
        if (error) {
            setIsLoading(false);
            throw error;
        }
        if (data?.user) {
            await fetchUserData(data.user.id, data.user.email || '');
        }
    };

    const registerUser = async (name: string, email: string, phone: string, pass: string) => {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password: pass,
        });
        if (error) {
            setIsLoading(false);
            throw error;
        }
        if (data.user) {
            await supabase.from('users').insert([{
                id: data.user.id,
                name,
                phone,
                balance: 0
            }]);
        }
        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);
        await supabase.auth.signOut();
        setUser(null);
        setIsLoading(false);
        router.push("/login");
    };

    const updateBalance = async (amount: number) => {
        if (!user) return;
        const newBalance = user.balance + amount;
        const { error } = await supabase
            .from('users')
            .update({ balance: newBalance })
            .eq('id', user.id);
        if (!error) {
            setUser({ ...user, balance: newBalance });
        } else {
            console.error("Failed to update balance:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateBalance, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}