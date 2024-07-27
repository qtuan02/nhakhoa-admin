"use client"
import OverviewComponent from "@/components/overview/Index";
import { store } from "@/redux/store";

export default function OverviewPage() {
    console.log(store);
	return (
        <OverviewComponent />
    );
}