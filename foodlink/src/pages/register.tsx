import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useRegisterUser, useListCountries, useListCitiesByCountry, getGetMeQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

export default function Register() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryId, setCountryId] = useState<number | undefined>();
  const [cityId, setCityId] = useState<number | undefined>();
  const [error, setError] = useState('');

  const { data: countries } = useListCountries();
  const { data: cities } = useListCitiesByCountry(countryId!, {
    query: { enabled: !!countryId },
  });

  const registerMutation = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    registerMutation.mutate(
      {
        data: {
          fullName,
          email,
          password,
          role: 'customer',
          countryId: countryId ?? null,
          cityId: cityId ?? null,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
          navigate('/discover');
        },
        onError: (err: any) => {
          setError(err?.data?.error ?? 'Registo falhou. Tente novamente.');
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F2] to-[#FFE8CC] flex items-center justify-center p-4 py-12">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-lg">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <BrandLogo iconClassName="w-10 h-10 shadow-lg" textClassName="text-2xl font-black" />
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Criar a sua conta</CardTitle>
            <CardDescription>Registe-se para encomendar comida na ElOlam Meal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input id="fullName" placeholder="Maria Nakamura" value={fullName} onChange={e => setFullName(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="voce@exemplo.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Palavra-passe</Label>
                <Input id="password" type="password" placeholder="Mín. 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>País</Label>
                  <Select onValueChange={v => { setCountryId(Number(v)); setCityId(undefined); }}>
                    <SelectTrigger><SelectValue placeholder="Selecionar país" /></SelectTrigger>
                    <SelectContent>
                      {countries?.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Cidade</Label>
                  <Select onValueChange={v => setCityId(Number(v))} disabled={!countryId}>
                    <SelectTrigger><SelectValue placeholder={countryId ? 'Selecionar cidade' : 'Escolha o país primeiro'} /></SelectTrigger>
                    <SelectContent>
                      {cities?.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.cityName}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</p>}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />A criar conta…</> : 'Criar conta'}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              Já tem conta?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">Entrar</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
