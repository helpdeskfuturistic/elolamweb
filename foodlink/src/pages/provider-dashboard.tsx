import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  useGetMyProvider,
  useGetProviderStats,
  useListMenuItems,
  useCreateMenuItem,
  useUpdateMenuItem,
  useDeleteMenuItem,
  useListOrders,
  useUpdateOrderStatus,
  getListMenuItemsQueryKey,
  getListOrdersQueryKey,
  getGetProviderStatsQueryKey,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ShoppingBag, TrendingUp, Plus, Edit2, Trash2, Loader2,
  CheckCircle2, PackageCheck, Store, Clock,
} from 'lucide-react';
import { ORDER_STATUS_CONFIG } from '@/lib/locale-pt';

const NEXT_STATUS: Record<string, string | null> = {
  pending: 'accepted', accepted: 'preparing', preparing: 'ready_for_pickup', ready_for_pickup: null,
};

type MenuItemForm = { name: string; description: string; category: string; price: string; currency: string; available: boolean };
const emptyForm = (): MenuItemForm => ({ name: '', description: '', category: '', price: '', currency: 'NAD', available: true });

export default function ProviderDashboard() {
  useAuth();
  const queryClient = useQueryClient();

  const { data: provider, isLoading: loadingProvider } = useGetMyProvider();
  const providerId = provider?.id;
  const { data: stats } = useGetProviderStats(providerId!, { query: { enabled: !!providerId } });
  const { data: menuItems, isLoading: loadingMenu } = useListMenuItems(providerId!, { query: { enabled: !!providerId } });
  const { data: orders, isLoading: loadingOrders } = useListOrders({ query: { refetchInterval: 15_000 } });
  const createMenuItem = useCreateMenuItem();
  const updateMenuItem = useUpdateMenuItem();
  const deleteMenuItem = useDeleteMenuItem();
  const updateOrderStatus = useUpdateOrderStatus();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<MenuItemForm>(emptyForm());

  const openCreate = () => { setEditingId(null); setForm(emptyForm()); setDialogOpen(true); };
  const openEdit = (item: any) => {
    setEditingId(item.id);
    setForm({ name: item.name, description: item.description ?? '', category: item.category ?? '', price: String(item.price), currency: item.currency, available: item.available });
    setDialogOpen(true);
  };

  const saveItem = () => {
    if (!providerId) return;
    const data = { name: form.name, description: form.description || null, category: form.category || null, price: Number(form.price), currency: form.currency, available: form.available };
    if (editingId) {
      updateMenuItem.mutate({ itemId: editingId, data }, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListMenuItemsQueryKey(providerId) }); setDialogOpen(false); },
      });
    } else {
      createMenuItem.mutate({ providerId, data }, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListMenuItemsQueryKey(providerId) }); queryClient.invalidateQueries({ queryKey: getGetProviderStatsQueryKey(providerId) }); setDialogOpen(false); },
      });
    }
  };

  const removeItem = (id: number) => {
    if (!providerId) return;
    deleteMenuItem.mutate({ itemId: id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListMenuItemsQueryKey(providerId) }) });
  };

  const advanceOrder = (orderId: number, status: string) => {
    updateOrderStatus.mutate({ orderId, data: { status: status as any } }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() }) });
  };

  const activeOrders = orders?.filter(o => !['delivered', 'cancelled'].includes(o.status)) ?? [];

  if (loadingProvider) {
    return <Layout><div className="max-w-5xl mx-auto px-4 py-8 space-y-4"><Skeleton className="h-32 rounded-2xl" /><Skeleton className="h-64 rounded-2xl" /></div></Layout>;
  }

  if (!provider) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"><Store className="h-8 w-8 text-primary" /></div>
          <h2 className="text-2xl font-bold mb-2">Configure o perfil de parceiro</h2>
          <p className="text-muted-foreground mb-6">
            Registe o seu negócio na ElOlam Meal para receber pedidos — com ou sem restaurante registrado.
          </p>
          <Link href="/provider/register"><Button className="bg-primary hover:bg-primary/90">Registar como parceiro</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{provider.businessName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={provider.verificationStatus === 'verified' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'}>
                {provider.verificationStatus === 'verified' ? 'Verificado' : 'Verificação pendente'}
              </Badge>
              {provider.verificationStatus === 'verified' && !provider.subscriptionCurrent && (
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">Subscrição por pagar</Badge>
              )}
            </div>
          </div>
        </div>

        {provider.verificationStatus === 'verified' && !provider.subscriptionCurrent && (
          <div className="mb-8 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
            O seu negócio não é visível para clientes até pagar a subscrição mensal. Pode continuar a gerir a conta.
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total de pedidos', value: stats?.totalOrders ?? 0, icon: <ShoppingBag className="h-5 w-5 text-primary" /> },
            { label: 'Concluídos', value: stats?.completedOrders ?? 0, icon: <PackageCheck className="h-5 w-5 text-green-600" /> },
            { label: 'Pendentes', value: stats?.pendingOrders ?? 0, icon: <Clock className="h-5 w-5 text-amber-500" /> },
            { label: `Receita (${stats?.currency ?? 'NAD'})`, value: (stats?.totalRevenue ?? 0).toFixed(0), icon: <TrendingUp className="h-5 w-5 text-blue-600" /> },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">{s.icon}</div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Pedidos ativos {activeOrders.length > 0 && `(${activeOrders.length})`}</TabsTrigger>
            <TabsTrigger value="menu">Itens do cardápio</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            {loadingOrders ? (
              <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
            ) : activeOrders.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">Sem pedidos ativos. Aparecerão aqui quando chegarem.</div>
            ) : (
              <div className="space-y-3">
                {activeOrders.map(order => {
                  const cfg = ORDER_STATUS_CONFIG[order.status];
                  const next = NEXT_STATUS[order.status];
                  return (
                    <Card key={order.id}>
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm">Pedido #{order.id}</span>
                            <Badge className={`text-xs border ${cfg?.color}`}>{cfg?.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.customerName ?? 'Cliente'}</p>
                          <p className="text-sm font-semibold text-primary mt-1">{order.currency} {order.total.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                          {next && (
                            <Button size="sm" className="bg-primary hover:bg-primary/90 gap-1.5" onClick={() => advanceOrder(order.id, next)} disabled={updateOrderStatus.isPending}>
                              <CheckCircle2 className="h-3.5 w-3.5" />{ORDER_STATUS_CONFIG[next]?.label ?? next}
                            </Button>
                          )}
                          <Button size="sm" variant="destructive" onClick={() => advanceOrder(order.id, 'cancelled')} disabled={updateOrderStatus.isPending}>Cancelar</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="menu">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">{menuItems?.length ?? 0} itens no cardápio</p>
              <Button size="sm" className="bg-primary hover:bg-primary/90 gap-1.5" onClick={openCreate}><Plus className="h-4 w-4" />Adicionar item</Button>
            </div>
            {loadingMenu ? (
              <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
            ) : !menuItems?.length ? (
              <div className="text-center py-12 text-muted-foreground">Ainda sem itens. Adicione o primeiro para receber pedidos.</div>
            ) : (
              <div className="space-y-3">
                {menuItems.map(item => (
                  <Card key={item.id} className={!item.available ? 'opacity-60' : ''}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-sm">{item.name}</p>
                          {item.category && <Badge variant="secondary" className="text-xs">{item.category}</Badge>}
                          {!item.available && <Badge variant="outline" className="text-xs text-muted-foreground">Oculto</Badge>}
                        </div>
                        {item.description && <p className="text-xs text-muted-foreground line-clamp-1 mb-1">{item.description}</p>}
                        <p className="text-sm font-bold text-primary">{item.currency} {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(item)}><Edit2 className="h-3.5 w-3.5" /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => removeItem(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Editar item do cardápio' : 'Adicionar item ao cardápio'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Nome *</Label>
                <Input placeholder="ex.: Prato Kapana" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Descrição</Label>
                <Textarea placeholder="O que inclui este prato?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Categoria</Label>
                  <Input placeholder="ex.: Grelhados" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Moeda</Label>
                  <Input value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Preço *</Label>
                <Input type="number" placeholder="0.00" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.available} onCheckedChange={v => setForm(f => ({ ...f, available: v }))} />
                <Label>Disponível para encomenda</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={saveItem} disabled={!form.name || !form.price || createMenuItem.isPending || updateMenuItem.isPending}>
                {(createMenuItem.isPending || updateMenuItem.isPending) ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId ? 'Guardar alterações' : 'Adicionar item'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
