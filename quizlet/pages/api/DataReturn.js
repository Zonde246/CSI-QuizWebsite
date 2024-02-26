import { getCookie } from "cookies-next";

export default function handler(req, res) {
  if (req.method === "POST") {
    
  } else {
    res.status("500").json({ message: "Incorrect method" });
  }
}
