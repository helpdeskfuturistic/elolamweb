import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLoginUser, getGetMeQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

export default function Login() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loginMutation = useLoginUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate(
      { data: { email, password } },
      {
        onSuccess: (user) => {
          queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
          const role = user.role;
          if (role === 'provider') navigate('/provider/dashboard');
          else if (role === 'delivery_partner') navigate('/driver/dashboard');
          else if (role === 'admin') navigate('/admin');
          else navigate('/discover');
        },
        onError: () => setError('E-mail ou palavra-passe inválidos.'),
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F2] to-[#FFE8CC] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Link href="/">
            <BrandLogo iconClassName="w-10 h-10 shadow-lg" textClassName="text-2xl font-black" />
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription>Inicie sessão na sua conta ElOlam Meal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Palavra-passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />A entrar…
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Ainda não tem conta?{' '}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Criar conta
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
              <p className="font-medium mb-1">Contas de demonstração (palavra-passe: password123)</p>
              <div className="space-y-0.5">
                <p>Cliente: amara@foodlink.com</p>
                <p>Fornecedor: maria@foodlink.com</p>
                <p>Entregador: david@foodlink.com</p>
                <p>Admin: admin@foodlink.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
