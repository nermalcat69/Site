import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? request.ip;
  return json({ ip });
};

export default function Ip() {
  const { ip } = useLoaderData();

  return (
    <div>
      <h1>Your IP Address is: {ip}</h1>
    </div>
  );
}