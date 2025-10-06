# n8n-nodes-wabot

Community Nodes do **Wabot** para **n8n** (self-hosted). Inclui:
- **Credencial:** Wabot API (baseUrl, accessToken, instanceId)
- **10 nós** prontos: Send Text, Send Media, Send Group Text, Send Group Media, Group Add Number, Group Remove Number, Contact Group Add/Remove, Label Add/Remove
- **Ícone customizado:** `icons/wabot.svg`
- **Sem Instance ID nos nós** — o `instance_id` é injetado automaticamente a partir das credenciais.

> Repositório oficial: https://github.com/webinfinitebr/n8n-nodes-wabot

---

## 🚀 Instalação (GitHub)

No painel do **n8n**:
1. **Settings → Community Nodes → Install**
2. Clique em **Install from GitHub repository**
3. Informe o repositório:
   ```
   https://github.com/webinfinitebr/n8n-nodes-wabot
   ```
4. Confirme e aguarde o restart.

> Alternativa: `npm install n8n-nodes-wabot` (quando publicado no npm).

---

## 🔐 Configurar Credencial Wabot API

1. **Credentials → New → Wabot API**
2. Preencha:
   - **Base URL:** `https://painel.wabot.com.br` (ou o seu endpoint)
   - **Access Token:** seu token
   - **Instance ID:** id da sua instância
3. Clique em **Test** (deve retornar sucesso).

---

## 💬 Nós disponíveis

- **Wabot: Send Text** → `/send` (text)
- **Wabot: Send Media** → `/send` (media)
- **Wabot: Send Group Text** → `/send_group` (text)
- **Wabot: Send Group Media** → `/send_group` (media)
- **Wabot: Group Add Number** → `/group_action` (add)
- **Wabot: Group Remove Number** → `/group_action` (remove)
- **Wabot: Contact Group Add** → `/contact_group_action` (add)
- **Wabot: Contact Group Remove** → `/contact_group_action` (remove)
- **Wabot: Label Add** → `/label_action` (add)
- **Wabot: Label Remove** → `/label_action` (remove)

> **Observação:** `instance_id` é injetado automaticamente via credenciais (não aparece no formulário do nó).

---

## 🧪 Exemplo rápido (Send Text)

1. Adicione o nó **Wabot: Send Text** ao fluxo.
2. **Number:** `5511999999999`  
3. **Message:** `Teste automático com n8n 💬`  
4. Execute o nó — a resposta da API será exibida na saída.

---

## 🔁 Atualizações

Basta **fazer commit/push** no GitHub e, no n8n, ir em:
**Settings → Community Nodes → Installed → Reinstall** (ou **Update**).

---

## 🧱 Desenvolvimento

- Requer Node 18+.
- Instale deps e compile:
  ```bash
  npm install
  npm run build
  ```
- Código-fonte em `nodes/` e `credentials/`; versão compilada em `dist/`.

---

## 📄 Licença

MIT © Web Infinite / Élisson
