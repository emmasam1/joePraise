"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer() {
  const token = useAuthStore((state) => state.token);
  const getMe = useAuthStore((state) => state.getMe);

  useEffect(() => {
    if (token) {
      getMe();
    }
  }, [token, getMe]);

  return null;
}