import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useCreateProvider,
  useListCountries,
  useListCitiesByCountry,
  getGetMyProviderQueryKey,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, UtensilsCrossed, Store, Truck, User, ChefHat, ShoppingCart, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const PROVIDER_TYPES = [
  { value: 'registered_restaurant', label: 'Restaurante', icon: <UtensilsCrossed className="h-6 w-6" />, desc: 'Restaurante ou cozinha comercial' },
  { value: 'food_business', label: 'Negócio de alimentos', icon: <Store className="h-6 w-6" />, desc: 'Empresa registrada de alimentos' },
  { value: 'home_cook', label: 'Cozinheiro(a) em casa', icon: <ChefHat className="h-6 w-6" />, desc: 'Cozinha em casa — sem restaurante formal' },
  { value: 'food_truck', label: 'Food truck', icon: <Truck className="h-6 w-6" />, desc: 'Veículo de comida móvel' },
  { value: 'individual_seller', label: 'Vendedor individual', icon: <User className="h-6 w-6" />, desc: 'Vendedor independente' },
  { value: 'other', label: 'Outro', icon: <ShoppingCart className="h-6 w-6" />, desc: 'Outro modelo de venda' },
] as const;

const STEPS = ['Tipo', 'Detalhes', 'Localização', 'Entrega'];

export default function ProviderRegister() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [providerType, setProviderType] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [registeredCompany, setRegisteredCompany] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [countryId, setCountryId] = useState<number | undefined>();
  const [cityId, setCityId] = useState<number | undefined>();
  const [address, setAddress] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('25');
  const [deliveryRadius, setDeliveryRadius] = useState('5');
  const [error, setError] = useState('');

  const { data: countries } = useListCountries();
  const { data: cities } = useListCitiesByCountry(countryId!, { query: { enabled: !!countryId } });
  const createProvider = useCreateProvider();

  const canNext = [
    !!providerType,
    !!businessName,
    !!countryId && !!cityId,
    deliveryFee !== '' && Number(deliveryFee) >= 0,
  ][step];

  const submit = () => {
    setError('');
    createProvider.mutate(
      {
        data: {
          businessName,
          providerType: providerType as any,
          countryId: countryId!,
          cityId: cityId!,
          registeredCompany,
          registrationNumber: registrationNumber || null,
          description: description || null,
          address: address || null,
          deliveryMethod: 'self' as any,
          deliveryFee: Number(deliveryFee),
          deliveryRadius: Number(deliveryRadius),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetMyProviderQueryKey() });
          navigate('/provider/dashboard');
        },
        onError: () => setError('Registo falhou. Tente novamente.'),
      }
    );
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Registar como parceiro</h1>
          <p className="text-muted-foreground">
            Configure o seu negócio na ElOlam Meal em 4 passos — incluindo quem não tem restaurante registrado.
          </p>
        </div>

        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                i < step ? 'bg-primary text-white' : i === step ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
              )}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <div className="ml-2 text-xs font-medium hidden sm:block" style={{ color: i <= step ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}>{s}</div>
              {i < STEPS.length - 1 && <div className={cn('flex-1 h-px mx-3', i < step ? 'bg-primary' : 'bg-border')} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Que tipo de fornecedor é?</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Escolha o perfil que melhor descreve o seu negócio. Não precisa de restaurante registrado para
                  começar — cozinheiros em casa e vendedores individuais são bem-vindos.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PROVIDER_TYPES.map(t => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setProviderType(t.value)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all',
                        providerType === t.value ? 'border-primary bg-primary/8 text-primary' : 'border-border hover:border-primary/40'
                      )}
                    >
                      {t.icon}
                      <span className="text-sm font-semibold">{t.label}</span>
                      <span className="text-xs text-muted-foreground leading-tight">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">Fale-nos do seu negócio</h2>
                <div className="space-y-1.5">
                  <Label>Nome do negócio *</Label>
                  <Input placeholder="ex.: Cozinha da Maria" value={businessName} onChange={e => setBusinessName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descreva a comida, o estilo e o que o torna especial…" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
                </div>
                <Card className="border-dashed">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <input type="checkbox" id="regCompany" className="rounded" checked={registeredCompany} onChange={e => setRegisteredCompany(e.target.checked)} />
                      <Label htmlFor="regCompany" className="cursor-pointer">Sou uma empresa registrada</Label>
                    </div>
                    {!registeredCompany && (
                      <p className="text-xs text-muted-foreground mb-2">
                        Se não tiver registo comercial, pode continuar — indique o tipo de perfil adequado (ex. cozinheiro em casa).
                      </p>
                    )}
                    {registeredCompany && (
                      <div className="space-y-1.5">
                        <Label>Número de registo</Label>
                        <Input placeholder="ex.: CC/2024/1234" value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">Onde está localizado?</h2>
                <div className="space-y-1.5">
                  <Label>País *</Label>
                  <Select onValueChange={v => { setCountryId(Number(v)); setCityId(undefined); }}>
                    <SelectTrigger><SelectValue placeholder="Selecione o país" /></SelectTrigger>
                    <SelectContent>{countries?.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Cidade *</Label>
                  <Select onValueChange={v => setCityId(Number(v))} disabled={!countryId}>
                    <SelectTrigger><SelectValue placeholder={countryId ? 'Selecione a cidade' : 'Selecione o país primeiro'} /></SelectTrigger>
                    <SelectContent>{cities?.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.cityName}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Morada</Label>
                  <Input placeholder="ex.: Av. Independência 14, Windhoek" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Defina a taxa de entrega</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Entrega própria — a ElOlam Meal não envia motoristas da plataforma. Os clientes pagam a taxa que definir.
                </p>
                <div className="space-y-1.5 mb-4">
                  <Label>Taxa de entrega</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={deliveryFee}
                    onChange={e => setDeliveryFee(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Raio de entrega (km)</Label>
                  <Input type="number" value={deliveryRadius} onChange={e => setDeliveryRadius(e.target.value)} min="1" max="50" />
                </div>
                {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md mt-3">{error}</p>}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 0} className="gap-1.5">
            <ChevronLeft className="h-4 w-4" />Voltar
          </Button>
          {step < 3 ? (
            <Button className="bg-primary hover:bg-primary/90 gap-1.5" onClick={() => setStep(s => s + 1)} disabled={!canNext}>
              Seguinte <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="bg-primary hover:bg-primary/90" onClick={submit} disabled={!canNext || createProvider.isPending}>
              {createProvider.isPending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />A registar…</> : 'Concluir registo'}
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
