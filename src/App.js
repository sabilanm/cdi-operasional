// src/App.js
import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

const App = () => {
    const routing = useRoutes(ThemeRoutes);

    return (
        <div className="dark font-sans">
            {/* <div className="dark"> */}
            {routing}
            <ToastContainer /> {/* Add ToastContainer here */}
        </div>
    );
};

export default App;
