import { Outlet, useLocation } from "react-router-dom";
import { Container, CardBody, Spinner } from "reactstrap";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./layout.css";
import { useEffect, useState } from "react";

const FullLayout = () => {
    const location = useLocation();
    const isDashboard = location.pathname === "/dashboard";
    const teamName = Cookies.get("elearning_name") || "Guest";

    // State untuk kontrol spinner
    const [loading, setLoading] = useState(false);

    // Dapatkan hari ini dalam format lokal
    const today = new Date();
    const dayName = today.toLocaleDateString("id-ID", { weekday: "long" });
    const dateString = today.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const hour = today.getHours();

    let greeting;
    const minutes = today.getMinutes(); // Mendapatkan menit sekarang

    if (hour >= 5 && hour < 12) {
        greeting = "Selamat Pagi";
    } else if (
        hour === 12 ||
        (hour > 12 && (hour < 15 || (hour === 15 && minutes < 30)))
    ) {
        greeting = "Selamat Siang";
    } else if (hour >= 15 && hour < 17) {
        greeting = "Selamat Sore";
    } else if (hour === 17 && hour < 18) {
        greeting = "Hampir pulang nih, Semangat!!!";
    } else if (hour >= 18 && hour < 24) {
        greeting = "Selamat Malam";
    } else {
        greeting = "Selamat Malam";
    }
    const colors = ["#ff5733", "#A89C29", "#FBA518"];
    const [isBlinking, setIsBlinking] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlinking((prevIndex) => (prevIndex + 1) % colors.length);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            <div className="pageWrapper d-lg-flex min-vh-100">
                {/* <div className="pageWrapper d-flex flex-column min-vh-100"> */}
                {/********Sidebar**********/}
                <aside className="sidebarArea shadow" id="sidebarArea">
                    <Sidebar />
                </aside>

                {/********Content Area**********/}
                {/* <div className="contentArea"> */}
                <div
                    className="contentArea d-flex flex-column flex-grow-1"
                    // style={{ backgroundColor: "#1d5471ff" }}
                    style={{ backgroundColor: "#edecef" }}
                >
                    {/********header**********/}
                    <Header />
                    {/********Conditional Container Header**********/}

                    {/* Wave Background */}
                    <div className="absolute top-19 left-0 w-full z-0">
                        <svg
                            className="w-full h-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                            // preserveAspectRatio="none"
                        >
                            <path
                                fill="#B2EBF2"
                                fillOpacity="1"
                                d="M0,128L1440,256L1440,0L0,0Z"
                            ></path>
                        </svg>
                    </div>
                    {/* <Container className="p-4 wrapper" fluid> */}
                    <Container className="relative z-10 -mt-0 p-6" fluid>
                        {location.pathname === "/dashboard" ? (
                            <div>
                                <Outlet />
                            </div>
                        ) : (
                            <div style={{ paddingTop: "65px" }}>
                                <Outlet />
                            </div>
                        )}
                    </Container>
                    {/********Footer**********/}
                    {/******** Footer (Bootstrap) **********/}
                    <footer
                        className="footer text-center py-3 mt-auto"
                        // style={{ backgroundColor: "#AAB99A" }}
                        style={{
                            color: "#ADB5BD",
                            // fontSize: "13px",
                        }}
                    >
                        <p className="mb-0">© 2025 Cobra Dental.</p>
                    </footer>
                </div>
            </div>
        </main>
    );
};

export default FullLayout;
