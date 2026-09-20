import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useRegisterDeliveryPartner, useListCountries, useListCitiesByCountry, getGetMyDeliveryProfileQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const VEHICLES = [
  { value: 'bicycle', label: 'Bicicleta', icon: '🚲', desc: 'Distâncias curtas, ecológico' },
  { value: 'motorbike', label: 'Motociclo', icon: '🏍️', desc: 'Entrega rápida na cidade' },
  { value: 'car', label: 'Carro', icon: '🚗', desc: 'Pedidos grandes, maior alcance' },
  { value: 'van', label: 'Carrinha', icon: '🚐', desc: 'Entregas em volume' },
] as const;

export default function DriverRegister() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [vehicleType, setVehicleType] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [countryId, setCountryId] = useState<number | undefined>();
  const [cityId, setCityId] = useState<number | undefined>();
  const [error, setError] = useState('');

  const { data: countries } = useListCountries();
  const { data: cities } = useListCitiesByCountry(countryId!, { query: { enabled: !!countryId } });
  const registerMutation = useRegisterDeliveryPartner();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    registerMutation.mutate(
      { data: { vehicleType: vehicleType as any, licenseNumber: licenseNumber || null, countryId: countryId!, cityId: cityId! } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetMyDeliveryProfileQueryKey() });
          navigate('/driver/dashboard');
        },
        onError: () => setError('Registo falhou. Tente novamente.'),
      }
    );
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1">Registar como entregador</h1>
            <p className="text-muted-foreground">Configure o seu perfil de parceiro de entrega na ElOlam Meal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">O seu veículo</Label>
              <div className="grid grid-cols-2 gap-3">
                {VEHICLES.map(v => (
                  <button
                    key={v.value}
                    type="button"
                    onClick={() => setVehicleType(v.value)}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all',
                      vehicleType === v.value ? 'border-primary bg-primary/8' : 'border-border hover:border-primary/40'
                    )}
                  >
                    <span className="text-2xl">{v.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{v.label}</p>
                      <p className="text-xs text-muted-foreground">{v.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Número de carta / identificação (opcional)</Label>
              <Input placeholder="ex.: WK 2024 NMB" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>País *</Label>
                <Select onValueChange={v => { setCountryId(Number(v)); setCityId(undefined); }}>
                  <SelectTrigger><SelectValue placeholder="País" /></SelectTrigger>
                  <SelectContent>{countries?.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Cidade *</Label>
                <Select onValueChange={v => setCityId(Number(v))} disabled={!countryId}>
                  <SelectTrigger><SelectValue placeholder={countryId ? 'Cidade' : 'Escolha o país'} /></SelectTrigger>
                  <SelectContent>{cities?.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.cityName}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={!vehicleType || !countryId || !cityId || registerMutation.isPending}
            >
              {registerMutation.isPending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />A registar…</> : 'Concluir registo'}
            </Button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
