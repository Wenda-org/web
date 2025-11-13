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

export function Users() {
  const { t } = useTranslation();
  const {
    items: users,
    meta,
    loading,
    error,
    refetch,
    create,
    remove,
    update,
    query,
    setQuery,
    role,
    setRole,
    page,
    setPage,
    perPage,
    setPerPage,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // sync API users into local UI shape when available
  // users are provided by the `useUsers` hook (normalized LocalUser[])

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
            try {
              await create({
                name: u.name,
                email: u.email,
                role: u.role as any,
                isActive: u.status === "active",
              } as any);
              await refetch();
              notifySuccess(t("users.messages.created") || "User created");
            } catch (err: any) {
              notifyError(
                t("users.messages.create_failed") ||
                  String(err) ||
                  "Could not create user"
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
            <div className="flex items-center gap-3">
              <SearchBar
                placeholder={t("common.search_users_placeholder")}
                className="w-80"
                value={query}
                onChange={(v) => {
                  setQuery(v);
                  setPage(1);
                }}
              />

              <select
                value={role ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setRole(val === "" ? undefined : val);
                  setPage(1);
                }}
                className="rounded-xl border border-border px-3 py-2 bg-input-background"
              >
                <option value="">{t("users.filters.all") || "All"}</option>
                <option value="admin">
                  {t("users.roles.admin") || "Admin"}
                </option>
                <option value="user">{t("users.roles.user") || "User"}</option>
              </select>

              <select
                value={perPage}
                onChange={(e) => {
                  const v = Number(e.target.value) || 25;
                  setPerPage(v);
                  setPage(1);
                }}
                className="rounded-xl border border-border px-3 py-2 bg-input-background"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
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
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-6"
                  >
                    {t("loading") || "A carregar..."}
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-6"
                  >
                    {t("users.no_results") || "Nenhum usuário encontrado"}
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "admin" ? "default" : "secondary"
                        }
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
                            setSelectedUser(u as User);
                            setIsProfileOpen(true);
                          }
                        }}
                        onEdit={(id) => {
                          const u = users.find((x) => x.id === id);
                          if (u) {
                            setSelectedUser(u as User);
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
                          } catch (err: any) {
                            notifyError(
                              t("users.messages.delete_failed") ||
                                String(err) ||
                                "Could not delete user"
                            );
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <div className="flex items-center justify-end gap-3 p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {meta && meta.total
              ? `${meta.total} ${t("users.total_label") || "users"}`
              : null}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
            >
              {t("common.prev") || "Prev"}
            </Button>
            <div className="px-3 text-sm">
              {t("common.page") || "Page"} {page}
              {meta && (meta.total || meta.totalItems) ? (
                <span>
                  {" "}
                  {t("common.of") || "of"}{" "}
                  {meta.totalPages ??
                    Math.ceil((meta.total ?? meta.totalItems) / perPage)}
                </span>
              ) : null}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={
                meta &&
                (meta.totalPages
                  ? page >= meta.totalPages
                  : meta.total &&
                    page >=
                      Math.ceil((meta.total ?? meta.totalItems) / perPage))
              }
            >
              {t("common.next") || "Next"}
            </Button>
          </div>
        </div>
      </Card>

      {/* View / Edit Dialogs (now using dedicated components) */}
      <ViewUser
        open={isProfileOpen}
        onOpenChange={(open) => setIsProfileOpen(open)}
        user={selectedUser}
        onSave={async (u: User) => {
          // refresh from API to keep UI in sync
          try {
            await refetch();
            setIsProfileOpen(false);
            notifySuccess(t("users.messages.updated") || "User updated");
          } catch (err: any) {
            notifyError(
              t("users.messages.update_failed") ||
                String(err) ||
                "Could not update user"
            );
          }
        }}
        onCancel={() => setIsProfileOpen(false)}
      />

      <EditUser
        open={isEditOpen}
        onOpenChange={(open) => setIsEditOpen(open)}
        initial={selectedUser}
        onSubmit={async (payload: User) => {
          try {
            if (payload.id) {
              await update(payload.id, {
                name: payload.name,
                email: payload.email,
                role: payload.role,
                isActive: payload.status === "active",
              } as any);
              await refetch();
              notifySuccess(t("users.messages.updated") || "User updated");
            }
          } catch (err: any) {
            notifyError(
              t("users.messages.update_failed") ||
                String(err) ||
                "Could not update user"
            );
          } finally {
            setIsEditOpen(false);
          }
        }}
        onCancel={() => setIsEditOpen(false)}
      />
    </div>
  );
}
