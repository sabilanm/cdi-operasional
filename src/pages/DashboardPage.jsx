import React, { Suspense } from "react";
import Dashboard from "../features/dashboard/ui/Dashboard";

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
        </Suspense>
    );
}
