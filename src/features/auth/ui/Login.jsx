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

        // === HANDLER DEFINISI ===
        const mouseMoveHandler = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const clickHandler = (e) => {
            const clickX = e.clientX;
            const clickY = e.clientY;

            particlesArray.forEach((p) => {
                const dx = p.x - clickX;
                const dy = p.y - clickY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    p.speedX = dx / 6;
                    p.speedY = dy / 6;
                }
            });
        };

        // REGISTER EVENT
        window.addEventListener("mousemove", mouseMoveHandler);
        window.addEventListener("click", clickHandler);

        // --- Particle class ---
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = 3;
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = (Math.random() - 0.5) * 1.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
                if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

                if (mouse.x !== undefined && mouse.y !== undefined) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        this.x += dx / 60;
                        this.y += dy / 60;
                    }
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

        for (let i = 0; i < maxParticles; i++) {
            particlesArray.push(new Particle());
        }

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
                        ctx.lineWidth = 0.3;
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach((p) => {
                p.update();
                p.draw();
            });
            drawLines();
            requestAnimationFrame(animate);
        };

        animate();

        // === CLEANUP YANG BENAR ===
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", mouseMoveHandler);
            window.removeEventListener("click", clickHandler);
        };
    }, []);

    if (isLoggedIn) return <Navigate to="/dashboard" />;

    return (
        <div className="position-relative z-3">
            <title>Operasional</title>
            <div className="flex flex-col min-h-screen items-center justify-center bg-[linear-gradient(-45deg,#0f2027,#203a43,#2c5364)] relative">
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

                {/* <div className="flex w-full items-center justify-center relative z-10"> */}
                <div className="flex-1 w-full flex items-center justify-center">
                    <div className="shadow-[0_8px_34px_rgba(31,38,135,0.37)] bg-white/20 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md">
                        {/* Logo */}
                        <div className="flex justify-center mb-10">
                            <img src={logo} alt="logo" className="w-20 h-20" />
                        </div>

                        {/* Welcome Text */}
                        <h1 className="text-2xl text-center mt-4 font-bold text-white mb-6 font-orbitron">
                            Operasional Login
                        </h1>

                        <Form onSubmit={handleLogin} className="">
                            {/* Username */}
                            <div className="relative z-0 w-full group mb-3">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="peer block py-2 px-3 w-full text-base text-white bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:border-white placeholder-white"
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
                                    className="peer block py-2 px-3 w-full text-base text-white bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:border-white placeholder-white"
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
                                className="w-full py-2 font-semibold text-lg bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white rounded-lg shadow-md hover:bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] hover:scale-105 transition-transform"
                                style={{ border: "2px solid black" }}
                            >
                                {loading ? <Spinner size="sm" /> : "Login"}
                            </Button>
                        </Form>
                    </div>
                </div>
                <footer className="text-white text-sm py-4 z-10 font-orbitron text-center">
                    Cobra Dental Indonesia © 2025
                </footer>
            </div>
        </div>
    );
};

export default Login;
