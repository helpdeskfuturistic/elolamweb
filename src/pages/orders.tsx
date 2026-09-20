import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useListOrders, useUpdateOrderStatus, getListOrdersQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag, Clock, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { LOCALE_DATE, ORDER_STATUS_CONFIG } from '@/lib/locale-pt';

const PROVIDER_NEXT_STATUSES: Record<string, string[]> = {
  pending: ['accepted', 'cancelled'],
  accepted: ['preparing'],
  preparing: ['ready_for_pickup'],
};

export default function Orders() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useListOrders({ query: { refetchInterval: 15_000 } });
  const updateStatusMutation = useUpdateOrderStatus();

  const changeStatus = (orderId: number, status: string) => {
    updateStatusMutation.mutate(
      { orderId, data: { status: status as any } },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() }) }
    );
  };

  const isProvider = user?.role === 'provider';

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">{isProvider ? 'Pedidos recebidos' : 'Os meus pedidos'}</h1>
          <p className="text-muted-foreground">
            {isProvider ? 'Gerir e atualizar o estado dos pedidos recebidos.' : 'Acompanhe pedidos atuais e anteriores.'}
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
          </div>
        ) : !orders?.length ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ainda sem pedidos</h3>
            <p className="text-muted-foreground mb-6">
              {isProvider ? 'Os pedidos aparecerão aqui quando os clientes comprarem do seu cardápio.' : 'Ainda não fez nenhum pedido.'}
            </p>
            {!isProvider && (
              <Link href="/discover">
                <Button className="bg-primary hover:bg-primary/90">Explorar comida</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const config = ORDER_STATUS_CONFIG[order.status] ?? { label: order.status, color: 'bg-muted text-muted-foreground' };
              const nextStatuses = isProvider ? (PROVIDER_NEXT_STATUSES[order.status] ?? []) : [];

              return (
                <motion.div key={order.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm">Pedido #{order.id}</span>
                            <Badge className={`text-xs border ${config.color}`}>{config.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {isProvider ? `Cliente: ${order.customerName ?? 'Cliente'}` : `Fornecedor: ${order.providerName ?? 'Fornecedor'}`}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            {new Date(order.createdAt).toLocaleDateString(LOCALE_DATE, { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{order.currency} {order.total.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">incl. {order.currency} {order.deliveryFee.toFixed(2)} entrega</p>
                        </div>
                      </div>

                      {nextStatuses.length > 0 && (
                        <div className="flex gap-2 flex-wrap mt-3 pt-3 border-t border-border">
                          {nextStatuses.map(s => (
                            <Button
                              key={s}
                              size="sm"
                              variant={s === 'cancelled' ? 'destructive' : 'default'}
                              className={s !== 'cancelled' ? 'bg-primary hover:bg-primary/90' : ''}
                              onClick={() => changeStatus(order.id, s)}
                              disabled={updateStatusMutation.isPending}
                            >
                              {s === 'cancelled' ? <XCircle className="h-3.5 w-3.5 mr-1" /> : <CheckCircle2 className="h-3.5 w-3.5 mr-1" />}
                              {ORDER_STATUS_CONFIG[s]?.label ?? s}
                            </Button>
                          ))}
                        </div>
                      )}

                      {!isProvider && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <Link href={`/orders/${order.id}`}>
                            <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary">
                              Ver detalhes <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
