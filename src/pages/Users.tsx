import { useTranslation } from 'react-i18next';
import { Users as UsersIcon, UserPlus, Shield, Eye } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import '../i18n/config';
import { SearchBar } from '../components/SearchBar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const mockUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2 hours ago',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    role: 'editor',
    status: 'active',
    lastLogin: '5 hours ago',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    role: 'viewer',
    status: 'active',
    lastLogin: '1 day ago',
  },
  {
    id: '4',
    name: 'Ana Ferreira',
    email: 'ana.ferreira@email.com',
    role: 'editor',
    status: 'inactive',
    lastLogin: '3 days ago',
  },
];

export function Users() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{t('users.title')}</h1>
          <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
        </div>
        <Button className="bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl">
          <UserPlus className="w-5 h-5 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title={t('users.total')}
          value="1,247"
          icon={UsersIcon}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title={t('users.active')}
          value="1,189"
          icon={UsersIcon}
          subtitle="95.3% of total"
        />
        <StatCard
          title="Admins"
          value="12"
          icon={Shield}
        />
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User List</CardTitle>
            <SearchBar placeholder="Search users..." className="w-80" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === 'admin' ? 'default' : 'secondary'}
                      className="rounded-lg"
                    >
                      {t(`users.roles.${user.role}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className={`rounded-lg ${
                        user.status === 'active'
                          ? 'bg-[#06D6A0] hover:bg-[#06D6A0]/90'
                          : 'bg-muted'
                      }`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
