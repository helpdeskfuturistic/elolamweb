import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  useGetAdminStats,
  useListAdminProviders,
  useVerifyProvider,
  useUpdateProviderSubscription,
  useListCountries,
  useListCitiesByCountry,
  getListAdminProvidersQueryKey,
  getGetAdminStatsQueryKey,
} from '@workspace/api-client-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Store, ShoppingBag, Truck, TrendingUp, CheckCircle, XCircle, Clock, Plus } from 'lucide-react';
import { PROVIDER_TYPE_LABELS } from '@/lib/locale-pt';

const PROVIDER_TYPES = [
  { value: 'registered_restaurant', label: PROVIDER_TYPE_LABELS.registered_restaurant },
  { value: 'food_business', label: PROVIDER_TYPE_LABELS.food_business },
  { value: 'home_cook', label: PROVIDER_TYPE_LABELS.home_cook },
  { value: 'food_truck', label: PROVIDER_TYPE_LABELS.food_truck },
  { value: 'individual_seller', label: PROVIDER_TYPE_LABELS.individual_seller },
  { value: 'other', label: PROVIDER_TYPE_LABELS.other },
] as const;

async function createAdminProvider(body: Record<string, unknown>) {
  const res = await fetch('/api/admin/providers', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || 'Não foi possível criar o fornecedor');
  }
  return data;
}

export default function Admin() {
  const queryClient = useQueryClient();
  const { data: stats } = useGetAdminStats();
  const { data: pendingProviders, isLoading } = useListAdminProviders(
    { verificationStatus: 'pending' },
    { query: { staleTime: 30_000 } }
  );
  const { data: allProviders } = useListAdminProviders({}, { query: { staleTime: 30_000 } });
  const verifyMutation = useVerifyProvider();
  const subscriptionMutation = useUpdateProviderSubscription();
  const [addOpen, setAddOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [ownerFullName, setOwnerFullName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [providerType, setProviderType] = useState('registered_restaurant');
  const [countryId, setCountryId] = useState<number | undefined>();
  const [cityId, setCityId] = useState<number | undefined>();
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('25');
  const [activateSubscription, setActivateSubscription] = useState(true);
  const [verified, setVerified] = useState(true);

  const { data: countries } = useListCountries();
  const { data: cities } = useListCitiesByCountry(countryId!, { query: { enabled: !!countryId } });

  const createMutation = useMutation({
    mutationFn: createAdminProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListAdminProvidersQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
      setAddOpen(false);
      setFormError('');
      setOwnerFullName('');
      setOwnerEmail('');
      setOwnerPassword('');
      setOwnerPhone('');
      setBusinessName('');
      setAddress('');
      setDescription('');
      setDeliveryFee('25');
    },
    onError: (err: Error) => {
      setFormError(err.message || 'Não foi possível criar o fornecedor');
    },
  });

  const canSubmit = useMemo(() => {
    return (
      ownerFullName.trim().length >= 2 &&
      ownerEmail.trim().includes('@') &&
      ownerPassword.trim().length >= 6 &&
      businessName.trim().length >= 2 &&
      !!countryId &&
      !!cityId &&
      deliveryFee !== '' &&
      Number(deliveryFee) >= 0
    );
  }, [ownerFullName, ownerEmail, ownerPassword, businessName, countryId, cityId, deliveryFee]);

  const verify = (providerId: number, status: 'verified' | 'rejected') => {
    verifyMutation.mutate(
      { providerId, data: { verificationStatus: status } },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListAdminProvidersQueryKey() }) }
    );
  };

  const setSubscription = (providerId: number, active: boolean) => {
    subscriptionMutation.mutate(
      { providerId, data: { active } },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListAdminProvidersQueryKey() }) }
    );
  };

  const submitProvider = () => {
    setFormError('');
    createMutation.mutate({
      ownerFullName: ownerFullName.trim(),
      ownerEmail: ownerEmail.trim(),
      ownerPassword: ownerPassword.trim(),
      ownerPhone: ownerPhone.trim() || null,
      businessName: businessName.trim(),
      providerType,
      countryId,
      cityId,
      address: address.trim() || null,
      description: description.trim() || null,
      deliveryFee: Number(deliveryFee),
      verificationStatus: verified ? 'verified' : 'pending',
      activateSubscription,
    });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Painel de administração</h1>
            <p className="text-muted-foreground">Visão geral da plataforma e verificação de fornecedores.</p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar fornecedor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar fornecedor</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <p className="text-sm font-semibold">Conta do proprietário</p>
                <div className="space-y-1.5">
                  <Label>Nome completo *</Label>
                  <Input value={ownerFullName} onChange={e => setOwnerFullName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>E-mail de login *</Label>
                  <Input type="email" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Palavra-passe temporária *</Label>
                  <Input type="password" value={ownerPassword} onChange={e => setOwnerPassword(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Telefone</Label>
                  <Input value={ownerPhone} onChange={e => setOwnerPhone(e.target.value)} />
                </div>
                <p className="text-sm font-semibold pt-2">Negócio</p>
                <div className="space-y-1.5">
                  <Label>Nome do negócio *</Label>
                  <Input value={businessName} onChange={e => setBusinessName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Tipo *</Label>
                  <Select value={providerType} onValueChange={setProviderType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PROVIDER_TYPES.map(t => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>País *</Label>
                    <Select
                      value={countryId ? String(countryId) : undefined}
                      onValueChange={v => {
                        setCountryId(Number(v));
                        setCityId(undefined);
                      }}
                    >
                      <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                      <SelectContent>
                        {countries?.map(c => (
                          <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Cidade *</Label>
                    <Select
                      value={cityId ? String(cityId) : undefined}
                      onValueChange={v => setCityId(Number(v))}
                      disabled={!countryId}
                    >
                      <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                      <SelectContent>
                        {cities?.map(c => (
                          <SelectItem key={c.id} value={String(c.id)}>{c.cityName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Morada</Label>
                  <Input value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Descrição</Label>
                  <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} />
                </div>
                <div className="space-y-1.5">
                  <Label>Taxa de entrega *</Label>
                  <Input type="number" min="0" step="0.01" value={deliveryFee} onChange={e => setDeliveryFee(e.target.value)} />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={verified} onChange={e => setVerified(e.target.checked)} />
                  Marcar como verificado
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={activateSubscription} onChange={e => setActivateSubscription(e.target.checked)} />
                  Ativar subscrição (visível para clientes)
                </label>
                {formError && <p className="text-sm text-destructive">{formError}</p>}
                <Button className="w-full" disabled={!canSubmit || createMutation.isPending} onClick={submitProvider}>
                  {createMutation.isPending ? 'A criar…' : 'Criar fornecedor'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Utilizadores', value: stats?.totalUsers ?? '—', icon: <Users className="h-5 w-5 text-blue-600" /> },
            { label: 'Fornecedores', value: stats?.totalProviders ?? '—', icon: <Store className="h-5 w-5 text-primary" /> },
            { label: 'Verificação pendente', value: stats?.pendingVerifications ?? '—', icon: <Clock className="h-5 w-5 text-amber-500" /> },
            { label: 'Subscrições por pagar', value: stats?.unpaidSubscriptions ?? '—', icon: <TrendingUp className="h-5 w-5 text-orange-500" /> },
            { label: 'Total de pedidos', value: stats?.totalOrders ?? '—', icon: <ShoppingBag className="h-5 w-5 text-purple-600" /> },
            { label: 'Entregadores', value: stats?.totalDeliveryPartners ?? '—', icon: <Truck className="h-5 w-5 text-green-600" /> },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">{s.icon}</div>
                  <div>
                    <p className="text-xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">
              Verificação pendente {pendingProviders && pendingProviders.length > 0 && `(${pendingProviders.length})`}
            </TabsTrigger>
            <TabsTrigger value="all">Todos os fornecedores</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {isLoading ? (
              <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
            ) : !pendingProviders?.length ? (
              <div className="text-center py-16 text-muted-foreground">
                <CheckCircle className="h-10 w-10 mx-auto mb-3 text-green-500 opacity-60" />
                <p>Nenhum fornecedor aguarda revisão.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingProviders.map(provider => (
                  <Card key={provider.id}>
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold">{provider.businessName}</p>
                          {provider.registeredCompany && <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">Empresa</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{PROVIDER_TYPE_LABELS[provider.providerType] ?? provider.providerType}</p>
                        <p className="text-xs text-muted-foreground">{provider.cityName}, {provider.countryName}</p>
                        {provider.registrationNumber && (
                          <p className="text-xs text-muted-foreground mt-1">Reg. n.º {provider.registrationNumber}</p>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 gap-1.5" onClick={() => verify(provider.id, 'verified')} disabled={verifyMutation.isPending}>
                          <CheckCircle className="h-3.5 w-3.5" />Aprovar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => verify(provider.id, 'rejected')} disabled={verifyMutation.isPending}>
                          <XCircle className="h-3.5 w-3.5 mr-1" />Rejeitar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all">
            {!allProviders?.length ? (
              <div className="text-center py-16 text-muted-foreground">Ainda não há fornecedores registados.</div>
            ) : (
              <div className="space-y-3">
                {allProviders.map(provider => {
                  const statusConfig = {
                    verified: { label: 'Verificado', color: 'bg-green-100 text-green-700 border-green-200' },
                    pending: { label: 'Pendente', color: 'bg-amber-100 text-amber-700 border-amber-200' },
                    rejected: { label: 'Rejeitado', color: 'bg-red-100 text-red-700 border-red-200' },
                  }[provider.verificationStatus] ?? { label: provider.verificationStatus, color: 'bg-muted' };

                  return (
                    <Card key={provider.id}>
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{provider.businessName}</p>
                            <Badge className={`text-xs border ${statusConfig.color}`}>{statusConfig.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{PROVIDER_TYPE_LABELS[provider.providerType] ?? provider.providerType} · {provider.cityName}, {provider.countryName}</p>
                          {provider.verificationStatus === 'verified' && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {provider.subscriptionCurrent ? 'Subscrição paga' : 'Por pagar — oculto dos clientes'}
                            </p>
                          )}
                        </div>
                        {provider.verificationStatus === 'pending' && (
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => verify(provider.id, 'verified')} disabled={verifyMutation.isPending}>Aprovar</Button>
                            <Button size="sm" variant="destructive" onClick={() => verify(provider.id, 'rejected')} disabled={verifyMutation.isPending}>Rejeitar</Button>
                          </div>
                        )}
                        {provider.verificationStatus === 'verified' && (
                          <div className="flex gap-2">
                            {provider.subscriptionCurrent ? (
                              <Button size="sm" variant="destructive" onClick={() => setSubscription(provider.id, false)} disabled={subscriptionMutation.isPending}>Desativar</Button>
                            ) : (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => setSubscription(provider.id, true)} disabled={subscriptionMutation.isPending}>Ativar</Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
