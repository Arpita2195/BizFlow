import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../../components/ui/Primitives";
import AuthShell from "./AuthShell";
import { useApp } from "../../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUserSession } = useApp();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginUserSession(email);
    navigate("/app");
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to keep your business moving."
      footer={<>New to BizFlow? <Link to="/register" className="text-espresso font-medium underline underline-offset-2">Create an account</Link></>}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field label="Email">
          <Input type="email" placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Field>
        <Field label="Password">
          <Input type="password" placeholder="••••••••" required />
        </Field>
        <div className="flex justify-end -mt-1">
          <Link to="/forgot-password" className="text-xs text-bronze hover:text-espresso">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full mt-2">Sign in</Button>
      </form>
    </AuthShell>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm text-charcoal font-medium">{label}</span>
      {children}
    </label>
  );
}
