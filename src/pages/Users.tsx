import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Users as UsersIcon, UserPlus, Shield } from "lucide-react";
import { StatCard } from "../components/StatCard";
import "../i18n/config";
import { SearchBar } from "../components/SearchBar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import AddUserModal from "../components/users/AddUserModal";
import UserActions from "../components/users/UserActions";
import UserForm, { User } from "../components/users/UserForm";
import UserProfile from "../components/users/UserProfile";
import ViewUser from "../components/users/ViewUser";
import EditUser from "../components/users/EditUser";
import useUsers, { LocalUser } from "../hooks/useUsers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { notifySuccess, notifyError } from "../components/ui/notification";

const mockUsers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    role: "admin",
    status: "active",
    lastLogin: "2 hours ago",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    role: "editor",
    status: "active",
    lastLogin: "5 hours ago",
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@email.com",
    role: "viewer",
    status: "active",
    lastLogin: "1 day ago",
  },
  {
    id: "4",
    name: "Ana Ferreira",
    email: "ana.ferreira@email.com",
    role: "editor",
    status: "inactive",
    lastLogin: "3 days ago",
  },
];

export function Users() {
  const { t } = useTranslation();
  const {
    items: apiUsers,
    loading,
    error,
    refetch,
    create,
    remove,
    update,
  } = useUsers();

  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // sync API users into local UI shape when available
  React.useEffect(() => {
    if (apiUsers && apiUsers.length) {
      // map LocalUser -> component User shape
      const mapped = apiUsers.map(
        (u: LocalUser) =>
          ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: (u.role as any) || "viewer",
            status: (u.status as any) || "active",
            lastLogin: u.lastLogin,
          } as User)
      );
      setUsers(mapped);
    }
  }, [apiUsers]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{t("users.title")}</h1>
          <p className="text-muted-foreground mt-1">{t("users.description")}</p>
        </div>
        <AddUserModal
          trigger={
            <Button className="bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl">
              <UserPlus className="w-5 h-5 mr-2" />
              {t("users.add")}
            </Button>
          }
          onCreate={async (u: User) => {
            // try creating via API, fallback to local mock
            try {
              await create({
                name: u.name,
                email: u.email,
                role: u.role as any,
                isActive: u.status === "active",
              } as any);
              await refetch();
              notifySuccess(t("users.messages.created") || "User created");
            } catch (err) {
              // fallback to local state
              const id = u.id ?? Date.now().toString();
              setUsers((prev) => [{ ...u, id }, ...prev]);
              notifyError(
                t("users.messages.create_failed") || "Could not create user"
              );
            }
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title={t("users.total")}
          value="1,247"
          icon={UsersIcon}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title={t("users.active")}
          value="1,189"
          icon={UsersIcon}
          subtitle="95.3% of total"
        />
        <StatCard title={t("users.stats.admins")} value="12" icon={Shield} />
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t("users.table.title")}</CardTitle>
            <SearchBar
              placeholder={t("common.search_users_placeholder")}
              className="w-80"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("users.table.name")}</TableHead>
                <TableHead>{t("users.table.email")}</TableHead>
                <TableHead>{t("users.table.role")}</TableHead>
                <TableHead>{t("users.table.status")}</TableHead>
                <TableHead>{t("users.table.last_login")}</TableHead>
                <TableHead>{t("users.table.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                      className="rounded-lg"
                    >
                      {t(`users.roles.${user.role}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                      className={`rounded-lg ${
                        user.status === "active"
                          ? "bg-[#06D6A0] hover:bg-[#06D6A0]/90"
                          : "bg-muted"
                      }`}
                    >
                      {t(`users.${user.status}`) || user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.lastLogin ?? "-"}
                  </TableCell>
                  <TableCell>
                    <UserActions
                      userId={user.id ?? ""}
                      onView={(id) => {
                        const u = users.find((x) => x.id === id);
                        if (u) {
                          setSelectedUser(u);
                          setIsProfileOpen(true);
                        }
                      }}
                      onEdit={(id) => {
                        const u = users.find((x) => x.id === id);
                        if (u) {
                          setSelectedUser(u);
                          setIsEditOpen(true);
                        }
                      }}
                      onDelete={async (id: string) => {
                        try {
                          await remove(id);
                          await refetch();
                          notifySuccess(
                            t("users.messages.deleted") || "User deleted"
                          );
                        } catch (err) {
                          // fallback: remove locally
                          setUsers((prev) => prev.filter((x) => x.id !== id));
                          notifyError(
                            t("users.messages.delete_failed") || String(err)
                          );
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View / Edit Dialogs (now using dedicated components) */}
      <ViewUser
        open={isProfileOpen}
        onOpenChange={(open) => setIsProfileOpen(open)}
        user={selectedUser}
        onSave={(u: User) => {
          setUsers((prev) => prev.map((x) => (x.id === u.id ? u : x)));
          setIsProfileOpen(false);
          notifySuccess(t("users.messages.updated") || "User updated");
        }}
        onCancel={() => setIsProfileOpen(false)}
      />

      <EditUser
        open={isEditOpen}
        onOpenChange={(open) => setIsEditOpen(open)}
        initial={selectedUser}
        onSubmit={(payload: User) => {
          setUsers((prev) =>
            prev.map((x) => (x.id === payload.id ? { ...x, ...payload } : x))
          );
          setIsEditOpen(false);
          notifySuccess(t("users.messages.updated") || "User updated");
        }}
        onCancel={() => setIsEditOpen(false)}
      />
    </div>
  );
}
