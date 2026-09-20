import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import {
  useGetProvider,
  useListMenuItems,
  useCreateOrder,
  getListOrdersQueryKey,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, MapPin, Truck, Shield, AlertCircle, Plus, Minus, ShoppingBag, Loader2 } from 'lucide-react';
import { deliveryFeeLabel, PROVIDER_TYPE_LABELS, VERIFICATION } from '@/lib/locale-pt';

function VerificationBadge({ status, registered }: { status: string; registered?: boolean }) {
  if (status === 'verified' && registered)
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200 gap-1">
        <Shield className="h-3 w-3" />
        {VERIFICATION.registeredBusiness}
      </Badge>
    );
  if (status === 'verified')
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1">
        <AlertCircle className="h-3 w-3" />
        {VERIFICATION.individualSeller}
      </Badge>
    );
  return <Badge variant="secondary">{VERIFICATION.pending}</Badge>;
}

type CartItem = { id: number; name: string; price: number; quantity: number; currency: string };

export default function ProviderDetail() {
  const params = useParams<{ id: string }>();
  const providerId = Number(params.id);
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [placingOrder, setPlacingOrder] = useState(false);

  const { data: provider, isLoading: loadingProvider } = useGetProvider(providerId);
  const { data: menuItems, isLoading: loadingMenu } = useListMenuItems(providerId);
  const createOrderMutation = useCreateOrder();

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, currency: item.currency }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (!existing || existing.quantity <= 1) return prev.filter(c => c.id !== id);
      return prev.map(c => c.id === id ? { ...c, quantity: c.quantity - 1 } : c);
    });
  };

  const cartTotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const currency = cart[0]?.currency ?? 'NAD';
  const deliveryFeeAmount = provider?.deliveryFee ?? 25;

  const placeOrder = async () => {
    if (!user) { navigate('/login'); return; }
    setPlacingOrder(true);
    createOrderMutation.mutate(
      {
        data: {
          providerId,
          currency,
          items: cart.map(c => ({ menuItemId: c.id, quantity: c.quantity })),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() });
          setCart([]);
          navigate('/orders');
        },
        onSettled: () => setPlacingOrder(false),
      }
    );
  };

  if (loadingProvider) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-40" />
          <div className="grid gap-3 mt-8">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
          </div>
        </div>
      </Layout>
    );
  }

  if (!provider) {
    return (
      <Layout>
        <div className="p-8 text-center text-muted-foreground">Fornecedor não encontrado.</div>
      </Layout>
    );
  }

  const categories = [...new Set(menuItems?.filter(i => i.category).map(i => i.category!))] as string[];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl font-black text-primary shrink-0">
              {provider.businessName.slice(0, 1)}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold mb-1">{provider.businessName}</h1>
              <p className="text-muted-foreground text-sm mb-3">{PROVIDER_TYPE_LABELS[provider.providerType] ?? provider.providerType}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <VerificationBadge status={provider.verificationStatus} registered={provider.registeredCompany} />
                {provider.rating && (
                  <Badge variant="outline" className="gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {provider.rating.toFixed(1)}
                  </Badge>
                )}
                {provider.cityName && (
                  <Badge variant="outline" className="gap-1"><MapPin className="h-3 w-3" />{provider.cityName}</Badge>
                )}
                {provider.deliveryMethod && (
                  <Badge variant="outline" className="gap-1">
                    <Truck className="h-3 w-3" />
                    {deliveryFeeLabel(provider)}
                  </Badge>
                )}
              </div>
              {provider.description && <p className="text-sm text-muted-foreground leading-relaxed">{provider.description}</p>}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Cardápio</h2>
            {loadingMenu ? (
              <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
            ) : !menuItems?.length ? (
              <p className="text-muted-foreground">Ainda não há itens no cardápio.</p>
            ) : (
              <div className="space-y-6">
                {(categories.length > 0 ? categories : [undefined]).map(cat => (
                  <div key={cat ?? 'all'}>
                    {cat && <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{cat}</h3>}
                    <div className="space-y-3">
                      {menuItems.filter(i => cat ? i.category === cat : true).map(item => {
                        const cartItem = cart.find(c => c.id === item.id);
                        return (
                          <motion.div key={item.id} layout>
                            <Card className="hover:shadow-sm transition-shadow">
                              <CardContent className="p-4 flex items-center gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <p className="font-semibold text-sm">{item.name}</p>
                                    {!item.available && <Badge variant="secondary" className="text-xs">Indisponível</Badge>}
                                  </div>
                                  {item.description && <p className="text-xs text-muted-foreground mb-1 line-clamp-2">{item.description}</p>}
                                  <p className="text-primary font-bold">{item.currency} {item.price.toFixed(2)}</p>
                                </div>
                                {item.available && (
                                  <div className="flex items-center gap-2 shrink-0">
                                    {cartItem ? (
                                      <>
                                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                                          <Minus className="h-3.5 w-3.5" />
                                        </Button>
                                        <span className="w-6 text-center text-sm font-bold">{cartItem.quantity}</span>
                                        <Button size="icon" className="h-8 w-8 bg-primary hover:bg-primary/90" onClick={() => addToCart(item)}>
                                          <Plus className="h-3.5 w-3.5" />
                                        </Button>
                                      </>
                                    ) : (
                                      <Button size="sm" variant="outline" className="gap-1.5 border-primary/40 text-primary hover:bg-primary/5" onClick={() => addToCart(item)}>
                                        <Plus className="h-3.5 w-3.5" />Adicionar
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  O seu pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Adicione itens do cardápio para começar.</p>
                ) : (
                  <>
                    <div className="space-y-2 mb-4">
                      {cart.map(c => (
                        <div key={c.id} className="flex justify-between text-sm">
                          <span className="truncate mr-2">{c.name} × {c.quantity}</span>
                          <span className="shrink-0 font-medium">{c.currency} {(c.price * c.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <Separator className="mb-3" />
                    <div className="flex justify-between text-sm mb-1">
                      <span>Subtotal</span><span className="font-medium">{currency} {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span>Taxa de entrega</span><span className="font-medium">{currency} {deliveryFeeAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold mb-5">
                      <span>Total</span><span className="text-primary">{currency} {(cartTotal + deliveryFeeAmount).toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={placeOrder}
                      disabled={placingOrder || createOrderMutation.isPending}
                    >
                      {placingOrder || createOrderMutation.isPending
                        ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />A enviar pedido…</>
                        : `Encomendar · ${currency} ${(cartTotal + deliveryFeeAmount).toFixed(2)}`}
                    </Button>
                    {!user && <p className="text-xs text-muted-foreground text-center mt-2">Será pedido que inicie sessão</p>}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
