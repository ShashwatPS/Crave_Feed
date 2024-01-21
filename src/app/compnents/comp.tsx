"use client";
import { trpc } from "../_utils/client";
import { useState } from "react";
import { z } from "zod";

// Define a schema for user input
const userInputSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
  bio: z.string(),
});

export function TestFunctionality() {
  const pushUser = trpc.user.signUp.useMutation();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    bio: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = () => {
    const { email, username, password, bio } = formData;

    try {
      userInputSchema.parse({ email, username, password, bio });
      pushUser.mutate({ email, username, password, bio });
      console.log("Works");
    } catch (error) {
      console.error("Validation error:", error.errors);
    }
  };

  return (
    <div>
      <h1>Email</h1>
      <input
        type="text"
        value={formData.email}
        onChange={(event) => handleChange("email", event.target.value)}
      />
      <h1>Username</h1>
      <input
        type="text"
        value={formData.username}
        onChange={(event) => handleChange("username", event.target.value)}
      />
      <h1>Password</h1>
      <input
        type="text"
        value={formData.password}
        onChange={(event) => handleChange("password", event.target.value)}
      />
      <h1>Bio</h1>
      <input
        type="text"
        value={formData.bio}
        onChange={(event) => handleChange("bio", event.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}