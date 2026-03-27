"use client";
import { useEffect } from "react";

export default function useUtm() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const utmData = {
      utm_source: urlParams.get("utm_source"),
      utm_medium: urlParams.get("utm_medium"),
      utm_campaign: urlParams.get("utm_campaign"),
      utm_content: urlParams.get("utm_content"),
      utm_term: urlParams.get("utm_term"),
    };

    const hasUtm = Object.values(utmData).some(Boolean);

    if (hasUtm) {
      localStorage.setItem("utm", JSON.stringify(utmData));
    }
  }, []);
}