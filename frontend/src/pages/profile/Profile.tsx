import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", avatar: "" });

  useEffect(() => {
    api.get("/profile").then(res => {
      setProfile(res.data);
      setForm({
        name: res.data.name,
        email: res.data.email,
        avatar: res.data.avatar
      });
    });
  }, []);

  const handleSave = async () => {
    await api.put("/profile", form);
    alert("Profile updated");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>

      <Input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <Input
        placeholder="Avatar URL"
        value={form.avatar}
        onChange={e => setForm({ ...form, avatar: e.target.value })}
      />

      <Button onClick={handleSave}>Save</Button>

      <div className="mt-6">
        <p>Total books: {profile.totalBooks}</p>
        <h2 className="font-semibold">Exchange Requests:</h2>
        <ul className="space-y-2">
          {profile.exchangeRequests.map((req: any) => (
            <li key={req.id} className="border p-2 rounded">
              <b>{req.sender_name}</b> ({req.sender_email})  
              <br /> {req.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
