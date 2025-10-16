import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate({ href: "/login" });
    }, 500);
  }, []);
  return <div>Loading...</div>;
}
