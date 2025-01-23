"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link'
import { useState } from "react";
export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirm_password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Update form data state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    // Check if passwords match
    if (formData.password !== formData.confirm_password) {
      setResponseMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResponseMessage(data.error || "Failed to register");
      } else {
        setResponseMessage("Registration successful!");
        setFormData({ email: "", name: "", password: "", confirm_password: "" }); // Clear the form
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-1 space-y-8">
        <div className="flex flex-col space-y-5 items-center justify-center gap-15">
          <h2 className="text-6xl font-bold text-center">Register</h2>
          <h3 className="text-2xl">
            If you already have an account, login{" "}
            <Link href="/login">here</Link>
          </h3>
        </div>
        <div className="space-y-2">
          <Input
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            id="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="text-lg w-204" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
        {responseMessage && <p className="text-center">{responseMessage}</p>}
      </div>
    </form>
  );
}