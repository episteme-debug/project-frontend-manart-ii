"use client";
import { useRouter } from "next/navigation";    // Para leer parámetro de URL
import { useState, useEffect } from "react";    // Para estado y efectos secundarios
import axios from "axios";                     // Cliente HTTP

export default function RegionPage() {
  const router = useRouter();
  const { region } = router.query;

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);


}