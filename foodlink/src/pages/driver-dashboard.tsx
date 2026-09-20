import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  useGetMyDeliveryProfile,
  useUpdateDeliveryStatus,
  useListOrders,
  useUpdateOrderStatus,
  getGetMyDeliveryProfileQueryKey,
  getListOrdersQueryKey,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Truck, MapPin, Package, CheckCircle2 } from 'lucide-react';

const VEHICLE_LABELS: Record<string, string> = {
  bicycle: 'Bicicleta',
  motorbike: 'Motociclo',
  car: 'Carro',
  van: 'Carrinha',
};

export default function DriverDashboard() {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useGetMyDeliveryProfile();
  const updateStatus = useUpdateDeliveryStatus();
  const { data: orders } = useListOrders({ query: { refetchInterval: 15_000 } });
  const updateOrderStatus = useUpdateOrderStatus();

  const toggleOnline = () => {
    if (!profile) return;
    const next = profile.availabilityStatus === 'online' ? 'offline' : 'online';
    updateStatus.mutate(
      { data: { availabilityStatus: next } },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetMyDeliveryProfileQueryKey() }) }
    );
  };

  const acceptDelivery = (orderId: number) => {
    updateOrderStatus.mutate(
      { orderId, data: { status: 'picked_up' } },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() }) }
    );
  };

  const completeDelivery = (orderId: number) => {
    updateOrderStatus.mutate(
      { orderId, data: { status: 'delivered' } },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() }) }
    );
  };

  const availableOrders = orders?.filter(o => o.status === 'ready_for_pickup') ?? [];
  const activeDeliveries = orders?.filter(o => o.status === 'picked_up') ?? [];

  if (isLoading) {
    return <Layout><div className="max-w-3xl mx-auto px-4 py-8 space-y-4"><Skeleton className="h-32 rounded-2xl" /><Skeleton className="h-48 rounded-2xl" /></div></Layout>;
  }

  if (!profile) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"><Truck className="h-8 w-8 text-primary" /></div>
          <h2 className="text-2xl font-bold mb-2">Configure o perfil de entregador</h2>
          <p className="text-muted-foreground mb-6">Registe-se como parceiro de entrega na ElOlam Meal.</p>
          <Link href="/driver/register"><Button className="bg-primary hover:bg-primary/90">Registar como entregador</Button></Link>
        </div>
      </Layout>
    );
  }

  const isOnline = profile.availabilityStatus === 'online';

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Painel do entregador</h1>
          <p className="text-muted-foreground">Gerir disponibilidade e entregas.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold">{VEHICLE_LABELS[profile.vehicleType] ?? profile.vehicleType}</span>
                      <Badge className={isOnline ? 'bg-green-100 text-green-700 border-green-200' : 'bg-muted text-muted-foreground'}>
                        {isOnline ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                    {profile.licenseNumber && <p className="text-sm text-muted-foreground">Carta/ID: {profile.licenseNumber}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Label className="text-sm font-medium">{isOnline ? 'Ficar offline' : 'Ficar online'}</Label>
                  <Switch
                    checked={isOnline}
                    onCheckedChange={toggleOnline}
                    disabled={updateStatus.isPending}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {activeDeliveries.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Package className="h-5 w-5 text-primary" />Entregas ativas</h2>
            <div className="space-y-3">
              {activeDeliveries.map(order => (
                <Card key={order.id} className="border-primary/30 bg-primary/5">
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold">Pedido #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.providerName}</p>
                      {order.deliveryAddress && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{order.deliveryAddress}</p>}
                      <p className="text-primary font-semibold text-sm mt-1">{order.currency} {order.total.toFixed(2)}</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 gap-1.5" onClick={() => completeDelivery(order.id)}>
                      <CheckCircle2 className="h-3.5 w-3.5" />Marcar entregue
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-bold mb-3">Disponíveis para recolha</h2>
          {!isOnline ? (
            <div className="text-center py-12 text-muted-foreground">
              <Truck className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>Fique online para ver pedidos disponíveis.</p>
            </div>
          ) : availableOrders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhum pedido pronto para recolha. Volte em breve.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {availableOrders.map(order => (
                <Card key={order.id}>
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold">Pedido #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.providerName}</p>
                      <p className="text-primary font-semibold text-sm mt-1">{order.currency} {order.total.toFixed(2)}</p>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 gap-1.5" onClick={() => acceptDelivery(order.id)}>
                      <Truck className="h-3.5 w-3.5" />Aceitar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
