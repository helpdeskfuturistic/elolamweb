import { motion } from 'framer-motion';
import { useGetDashboardStats } from '@workspace/api-client-react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, LogOut, ShoppingBag, TrendingUp, Star } from 'lucide-react';
import { LOCALE_DATE, ROLE_LABELS } from '@/lib/locale-pt';

export default function Profile() {
  const { user, logout } = useAuth();
  const { data: stats } = useGetDashboardStats();

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                    {user.fullName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{user.fullName}</h1>
                  <Badge className="mt-1 bg-primary/10 text-primary border-primary/20">
                    {ROLE_LABELS[user.role] ?? user.role}
                  </Badge>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{user.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>
                    Membro desde{' '}
                    {new Date(user.createdAt).toLocaleDateString(LOCALE_DATE, { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {stats && (
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">A sua atividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {stats.totalOrders != null && (
                    <div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold">{stats.totalOrders}</p>
                      <p className="text-xs text-muted-foreground">Total de pedidos</p>
                    </div>
                  )}
                  {stats.completedOrders != null && (
                    <div>
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                        <Star className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold">{stats.completedOrders}</p>
                      <p className="text-xs text-muted-foreground">Concluídos</p>
                    </div>
                  )}
                  {stats.totalRevenue != null && stats.role === 'provider' && (
                    <div>
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold">{(stats.totalRevenue ?? 0).toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">Receita ({stats.currency})</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Button variant="destructive" className="w-full gap-2" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Terminar sessão
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}
