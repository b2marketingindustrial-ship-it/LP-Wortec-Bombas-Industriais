"use client";

import useUtm from "../../hooks/useUtm";

export default function UtmWrapper({ children }) {
  useUtm();
  return children;
}
