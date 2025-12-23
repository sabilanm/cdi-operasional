import React, { Suspense } from "react";
import Dashboard from "../features/dashboard/ui/DashboardByRole";

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
        </Suspense>
    );
}
