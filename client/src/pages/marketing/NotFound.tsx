import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Primitives";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center text-center px-6">
      <span className="font-display text-6xl text-gold mb-4">404</span>
      <h1 className="font-display text-2xl text-charcoal mb-2">This page took a wrong turn</h1>
      <p className="text-bronze mb-6 max-w-sm">The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/"><Button>Back to home</Button></Link>
    </div>
  );
}
