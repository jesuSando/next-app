"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { authService } from "@/services/auth.service";
import { scheduleRefresh } from "@/utils/helper";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [error, setError] = useState("");

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.login({ email, password, rememberMe });
            localStorage.setItem("exp", data.exp);
            scheduleRefresh();
            router.push("/dashboard");
        } catch (err) {
            console.error("Error en login:", err);
            setError(err.message || "Error en el servidor");
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        console.log("Registrando:", { registerUsername, registerEmail, registerPassword });
    };

    return (
        <div className="min-h-screen flex items-center justify-center space-x-6">
            <div className="w-30 flex justify-end">
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={showRegister ? "register-title" : "login-title"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl font-bold"
                    >
                        {showRegister ? "Register" : "Login"}
                    </motion.h1>
                </AnimatePresence>
            </div>

            <motion.div
                className="w-1 bg-[var(--color-text)] rounded origin-top"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.5 }}
                style={{ height: "7.5rem" }}
            />

            <div className="w-full max-w-md">
                <AnimatePresence mode="wait">
                    {!showRegister ? (
                        <motion.form
                            key="login"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            onSubmit={handleSubmit}
                            className=" w-full bg-[var(--color-background)] p-6 rounded-lg shadow-md"
                        >
                            {error && <p style={{ color: "red" }}>{error}</p>}

                            <label htmlFor="email" className="block font-medium mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full mb-4 p-2 border border-[var(--color-text)] rounded"
                            />

                            <label htmlFor="password" className="block font-medium mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full mb-4 p-2 border border-[var(--color-text)] rounded"
                            />

                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-3 w-3 text-[var(--color-primary)]"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="ml-2 text-[var(--color-muted-dark)]">Remember me</span>
                            </label>

                            <button
                                type="submit"
                                className="w-full py-2 bg-[var(--color-primary)] rounded my-4 text-white"
                            >
                                Login
                            </button>

                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-1">
                                    <p className="text-sm text-[var(--color-muted-dark)]">Forgot your </p>
                                    <Link href="/forgot-password">
                                        <span className="text-md text-[var(--color-info)] hover:underline">
                                            password?
                                        </span>
                                    </Link>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <p className="text-sm text-[var(--color-muted-dark)]">
                                        New here?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setShowRegister(true)}
                                            className="text-[var(--color-info)] hover:underline"
                                        >
                                            Create an account
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="register"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            onSubmit={handleRegisterSubmit}
                            className=" w-full bg-[var(--color-background)] p-6 rounded-lg shadow-md"
                        >
                            {error && <p style={{ color: "red" }}>{error}</p>}

                            <label htmlFor="register-username" className="block font-medium mb-1">
                                Username
                            </label>
                            <input
                                id="register-username"
                                type="text"
                                placeholder="John Doe"
                                value={registerUsername}
                                onChange={(e) => setRegisterUsername(e.target.value)}
                                className="block w-full p-2 border border-[var(--color-text)] rounded mb-4"
                            />

                            <label htmlFor="register-email" className="block font-medium mb-1">
                                Email
                            </label>
                            <input
                                id="register-email"
                                type="email"
                                placeholder="example@email.com"
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                className="block w-full p-2 border border-[var(--color-text)] rounded mb-4"
                            />

                            <div className="flex space-x-2">
                                <div className="w-1/2">
                                    <label htmlFor="register-password" className="block font-medium mb-1">
                                        Password
                                    </label>
                                    <input
                                        id="register-password"
                                        type="password"
                                        placeholder="Password"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                        className="block w-full p-2 border border-[var(--color-text)] rounded"
                                    />
                                </div>
                                <div className="w-1/2 mb-4">
                                    <label htmlFor="register-confirm-password" className="block font-medium mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="register-confirm-password"
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={registerConfirmPassword}
                                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                                        className="block w-full p-2 border border-[var(--color-text)] rounded"
                                    />
                                </div>
                            </div>

                            <label className="inline-flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    required
                                    className="form-checkbox h-3 w-3 text-[var(--color-primary)]"
                                />
                                <span className="ml-2 text-sm text-[var(--color-muted-dark)]">
                                    I agree to the Terms and Privacy Policy
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="w-full py-2 bg-[var(--color-primary)] text-white rounded my-4"
                            >
                                Sign up
                            </button>

                            <p className="text-sm text-[var(--color-muted-dark)]">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setShowRegister(false)}
                                    className="text-[var(--color-info)] hover:underline"
                                >
                                    Login
                                </button>
                            </p>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
