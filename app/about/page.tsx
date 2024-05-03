import LandingPageNavbar from "@/components/landingPageNavbar";
import { Link } from "lucide-react";


export default function About() {

    return (
        <div className="text-white bg-gray-800 h-screen flex flex-col overflow-y-auto">
            <LandingPageNavbar/>
            <div className="p-4">
            <p className="text-5xl font-bold text-green-300">About</p>
            <p>Mochi AI is a Japanese language learning website featuring an AI chatbot. Created by <span className="text-amber-300">Ralph John E. Policarpio</span>, it was designed to enhance Japanese learning through conversation practice. While Mochi AI is currently in prototype stage, there are limitations such as a restricted number of AI requests.
            </p>
            </div>
        </div>
    );
}