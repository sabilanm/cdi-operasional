import React, { Suspense } from "react";
import Dashboard from "../features/dashboard/ui/DashboardByRole";

export default function Dashboard1Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
        </Suspense>
    );
}
