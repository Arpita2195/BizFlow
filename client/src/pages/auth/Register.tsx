import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../../components/ui/Primitives";
import AuthShell from "./AuthShell";
import { Field } from "./Login";
import { useApp } from "../../context/AppContext";

export default function Register() {
  const navigate = useNavigate();
  const { registerUserSession } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    registerUserSession(name || "Business Owner", email);
    navigate("/onboarding");
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start free — no credit card required."
      footer={<>Already have an account? <Link to="/login" className="text-espresso font-medium underline underline-offset-2">Sign in</Link></>}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field label="Full name">
          <Input placeholder="e.g. Arpita Shah" value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field label="Email">
          <Input type="email" placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Field>
        <Field label="Password">
          <Input type="password" placeholder="Create a password" required />
        </Field>
        <Button type="submit" className="w-full mt-2">Create account</Button>
        <p className="text-xs text-bronze text-center">By continuing you agree to BizFlow's Terms & Privacy Policy.</p>
      </form>
    </AuthShell>
  );
}
