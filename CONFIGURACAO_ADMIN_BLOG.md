# Configuração Inicial do Painel do Blog Bahdev

Este procedimento é executado uma única vez por quem administra Supabase, Render e o deploy do site.

## 1. Aplicar a estrutura no Supabase

Há duas opções.

### Pelo painel do Supabase

1. Abra o projeto usado pelo site.
2. Entre no **SQL Editor**.
3. Abra o arquivo `supabase/migrations/20260718183000_blog_admin.sql` do projeto.
4. Copie todo o conteúdo, cole no editor e execute.

### Pela CLI

Com o projeto Supabase vinculado:

```bash
npx supabase db push
```

A migration cria:

- `blog_admins`;
- `blog_posts`;
- funções de autorização;
- políticas RLS;
- bucket público `blog-images` com escrita restrita ao administrador em AAL2.

## 2. Criar a única conta autorizada

No Supabase:

1. abra **Authentication → Users**;
2. crie o usuário administrador com seu e-mail e uma senha longa e exclusiva;
3. copie o UUID do usuário;
4. volte ao **SQL Editor** e execute, substituindo o valor:

```sql
insert into public.blog_admins (user_id)
values ('COLE-AQUI-O-UUID-DO-SEU-USUARIO')
on conflict (user_id) do nothing;
```

Confirme que existe apenas uma autorização:

```sql
select a.user_id, u.email, a.created_at
from public.blog_admins a
join auth.users u on u.id = a.user_id;
```

Para revogar uma conta, use o UUID exato:

```sql
delete from public.blog_admins
where user_id = 'UUID-EXATO-A-REVOGAR';
```

## 3. Impedir novos cadastros

Depois de criar a sua conta:

1. abra as configurações gerais do Supabase Auth;
2. desative **Allow new users to sign up**;
3. mantenha logins anônimos desativados;
4. não adicione uma tela de cadastro ao site.

Mesmo que outro usuário exista no Auth, ele não entra no painel sem um registro manual em `blog_admins`. A desativação de cadastro reduz ainda mais a superfície de ataque.

## 4. Conferir as variáveis públicas do site

Na Render, o Static Site deve ter:

```txt
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=SUA_CHAVE_PUBLICAVEL
```

A chave publicável/anon pode estar no front-end porque o acesso real é controlado pelas políticas RLS. Nunca use `SUPABASE_SERVICE_ROLE_KEY` no front-end.

Build e diretório de publicação:

```txt
Build Command: npm ci && npm run build
Publish Directory: dist
```

Mantenha o rewrite de SPA:

```txt
Source: /*
Destination: /index.html
Action: Rewrite
```

## 5. Configurar atualização automática na Render

No serviço do site na Render:

1. abra **Settings**;
2. localize o **Deploy Hook**;
3. copie a URL secreta;
4. não coloque essa URL no front-end, no Git ou em uma variável `VITE_`.

No terminal, com a CLI do Supabase autenticada e o projeto vinculado:

```bash
npx supabase secrets set RENDER_DEPLOY_HOOK_URL="COLE-A-URL-SECRETA-DA-RENDER"
npx supabase functions deploy trigger-blog-deploy
```

A função só encaminha o pedido à Render quando recebe uma sessão pertencente a `blog_admins` e já validada em duas etapas (`aal2`).

## 6. Fazer o primeiro deploy do site

Publique os arquivos do projeto no repositório conectado à Render e aguarde o build. Após o deploy, abra:

```txt
https://www.bahdev.com.br/admin/blog/login
```

## 7. Ativar o segundo fator

1. entre com o e-mail e a senha criados;
2. clique para ativar a proteção em duas etapas;
3. leia o QR Code com um aplicativo autenticador;
4. guarde a chave manual em um gerenciador de senhas seguro;
5. informe o código de seis dígitos para concluir.

Sem o segundo fator, as próprias políticas do banco bloqueiam leitura administrativa, gravação e upload, mesmo que alguém tente contornar a interface.

Por segurança, a sessão não fica gravada permanentemente no navegador e o painel encerra o acesso após 30 minutos sem atividade.

## 8. Importar as matérias atuais

No painel vazio, clique em **Importar matérias iniciais**. A operação copia os cinco conteúdos de `src/content/blog-posts.json` para o banco e solicita um novo deploy.

Depois disso, use apenas o painel para publicar e atualizar matérias.

## 9. Checklist de segurança

- [ ] Somente seu UUID aparece em `blog_admins`.
- [ ] Cadastro público está desativado.
- [ ] Login anônimo está desativado.
- [ ] Senha longa e exclusiva está guardada em gerenciador de senhas.
- [ ] TOTP foi configurado e testado.
- [ ] A chave manual do TOTP está armazenada em local seguro.
- [ ] A chave `service_role` não está no código nem na Render como `VITE_*`.
- [ ] O Deploy Hook está somente nos secrets da Edge Function.
- [ ] `/admin/blog/login` abre via HTTPS.
- [ ] Uma conta não autorizada recebe a tela **Acesso não autorizado**.

## 10. Recuperação de acesso

Se perder o celular ou o TOTP, não crie atalhos públicos no código. Use o painel do Supabase, confirme sua identidade administrativa e remova o fator perdido da sua conta. No próximo login, o painel pedirá o cadastro de um novo autenticador.

Se suspeitar que a senha vazou:

1. troque a senha do usuário no Supabase;
2. encerre as sessões ativas;
3. regenere o Deploy Hook na Render se houver suspeita de exposição;
4. revise os logs de autenticação e as alterações recentes em `blog_posts`.
