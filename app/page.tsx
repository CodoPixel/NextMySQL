"use client";

import { useCallback, useState } from "react";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>();
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/get');
      console.log(res);
      setResponse(res);
    } catch (e) {
      console.log(e);
      setResponse(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
  <h1>yo</h1>
  <hr />
  <button onClick={fetchData} disabled={loading}>{loading ? "Chargement..." : "Fetch Data"}</button>
  <pre style={{whiteSpace: "pre", wordBreak: "break-all"}}>{JSON.stringify(response)}</pre>
    </div>
  )
}
