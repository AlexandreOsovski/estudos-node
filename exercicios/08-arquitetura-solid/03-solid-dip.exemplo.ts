// EXEMPLO — Dependency Inversion Principle
// Rode com: npx ts-node 03-solid-dip.exemplo.ts

export interface CanalDeNotificacao {
  enviar(destinatario: string, mensagem: string): Promise<void>;
}

export class NotificacaoPorEmail implements CanalDeNotificacao {
  async enviar(destinatario: string, mensagem: string): Promise<void> {
    console.log(`[EMAIL] Para ${destinatario}: ${mensagem}`);
  }
}

export class NotificacaoPorSMS implements CanalDeNotificacao {
  async enviar(destinatario: string, mensagem: string): Promise<void> {
    console.log(`[SMS] Para ${destinatario}: ${mensagem}`);
  }
}

export class NotificacaoService {
  // depende da INTERFACE, injetada via construtor — não sabe qual implementação é
  constructor(private canal: CanalDeNotificacao) {}

  async notificarPedidoEnviado(destinatario: string) {
    await this.canal.enviar(destinatario, 'Seu pedido foi enviado!');
  }
}

async function main() {
  const servicoEmail = new NotificacaoService(new NotificacaoPorEmail());
  const servicoSMS = new NotificacaoService(new NotificacaoPorSMS());

  await servicoEmail.notificarPedidoEnviado('ana@email.com');
  await servicoSMS.notificarPedidoEnviado('+55 41 99999-0000');
}

if (require.main === module) {
  main();
}

// "Inversão de dependência" não é o mesmo que "injeção de dependência"
// (que é a técnica). O princípio: módulos de alto nível não devem
// depender de módulos de baixo nível — ambos devem depender de abstrações.
