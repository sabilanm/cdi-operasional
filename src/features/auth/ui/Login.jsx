// src/features/auth/ui/Login.jsx
import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Spinner } from "reactstrap";
import { Navigate } from "react-router-dom";
import gif from "../../../assets/images/bg/login.gif";
import logo from "../../../assets/images/logos/logo.png";
import close from "../../../assets/images/icon/close-eye.png";
import open from "../../../assets/images/icon/view.png";
import { useLoginForm } from "../hooks/useLoginForm";
import "../css/Login.css";

const Login = () => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        showPassword,
        loading,
        setLoading,
        setShowPassword,
        handleLogin,
        isLoggedIn,
    } = useLoginForm();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // === Particle Effect ===
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const particlesArray = [];
        const maxParticles = 100;

        // Mouse tracker
        let mouse = {
            x: undefined,
            y: undefined,
        };

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Klik = efek ledakan
        window.addEventListener("click", () => {
            particlesArray.forEach((p) => {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 50) {
                    p.speedX = dx / 8;
                    p.speedY = dy / 8;
                }
            });
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = 4;
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = (Math.random() - 0.5) * 1.5;
            }

            update() {
                // pergerakan biasa
                this.x += this.speedX;
                this.y += this.speedY;

                // bounce
                if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
                if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

                // ===== INTERAKSI DGN CURSOR =====

                if (mouse.x !== undefined && mouse.y !== undefined) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // 1️⃣ Tarikan ke cursor
                    if (distance < 150) {
                        this.x += dx / 60;
                        this.y += dy / 60;
                    }

                    // 2️⃣ Menjauh jika terlalu dekat
                    if (distance < 70) {
                        this.x -= dx / 20;
                        this.y -= dy / 20;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = "#f7f8fbff";
                ctx.fill();
                ctx.closePath();
            }
        }

        // generate particle
        for (let i = 0; i < maxParticles; i++) {
            particlesArray.push(new Particle());
        }

        // Draw connecting lines
        const drawLines = () => {
            for (let i = 0; i < particlesArray.length; i++) {
                for (let j = i + 1; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.strokeStyle = "rgba(250, 250, 250, 0.8)";
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        };

        // main loop animation
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            drawLines();
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", () => {});
            window.removeEventListener("click", () => {});
        };
    }, []);

    if (isLoggedIn) return <Navigate to="/dashboard" />;

    return (
        <div className="position-relative z-3">
            <title>Operasional</title>
            <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(-45deg,#0f2027,#203a43,#2c5364)] relative">
                {/* Canvas untuk efek partikel */}
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 0, // Lebih rendah dari sidebar
                    }}
                ></canvas>

                <div className="flex w-full items-center justify-center relative z-10">
                    <div className="bg-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-xl">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <img
                                src={logo}
                                alt="logo"
                                className="w-28 h-28 mb-5"
                            />
                        </div>

                        {/* Welcome Text */}
                        <h1 className="text-4xl text-center mt-4 font-bold text-white mb-6">
                            Operasional Login
                        </h1>

                        <Form onSubmit={handleLogin} className="space-y-6">
                            {/* Username */}
                            <div className="relative z-0 w-full group mb-3">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="peer block py-3 px-4 w-full text-base text-white bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:border-white placeholder-white"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            {/* Password */}
                            <div className="relative z-0 w-full group mb-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="peer block py-3 px-4 w-full text-base text-white bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:border-white placeholder-white"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-3 text-black"
                                >
                                    <img
                                        src={showPassword ? open : close}
                                        alt="toggle password"
                                        className="w-5 h-5"
                                    />
                                </button>
                            </div>

                            {/* Button */}
                            <Button
                                type="submit"
                                className="w-full py-3 font-semibold text-lg bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white rounded-lg shadow-md hover:bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] hover:scale-105 transition-transform"
                                style={{ border: "2px solid black" }}
                            >
                                {loading ? <Spinner size="sm" /> : "Login"}
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
