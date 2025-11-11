import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User } from "./UserForm";

type Props = {
  user: User;
  onSave: (u: User) => Promise<void> | void;
  onCancel?: () => void;
};

export default function UserProfile({ user, onSave, onCancel }: Props) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState<User["role"]>(user.role || "viewer");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      await onSave({ ...user, name, email, role });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Role</Label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button onClick={handleSave} disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
