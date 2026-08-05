/*
DESAFIO — Single Responsibility Principle

A classe `PedidoServiceJunior` abaixo mistura 4 responsabilidades:
validação, cálculo de total, persistência e notificação. Refatore em
classes separadas, cada uma com um único motivo para mudar:

  - ValidadorPedido: valida que o pedido tem pelo menos 1 item e que
    nenhum item tem preço <= 0
  - CalculadoraDeTotal: calcula o total do pedido (soma dos itens)
  - PedidoRepository: "salva" o pedido (console.log simulando persistência)
  - NotificacaoService: "notifica" o cliente (console.log)

Depois, crie `PedidoService`, que recebe as 4 dependências via
construtor e orquestra a criação de um pedido chamando cada uma na
ordem certa, retornando o total calculado.

Rode com: npx ts-node 01-solid-srp.desafio.ts
*/

export interface ItemPedido {
  nome: string;
  preco: number;
}

// ❌ CLASSE ATUAL — múltiplas responsabilidades misturadas (referência, não mexer)
class PedidoServiceJunior {
  processar(itens: ItemPedido[], clienteEmail: string): number {
    if (itens.length === 0) throw new Error('Pedido sem itens');
    for (const item of itens) {
      if (item.preco <= 0) throw new Error(`Item "${item.nome}" com preço inválido`);
    }
    const total = itens.reduce((soma, item) => soma + item.preco, 0);
    console.log(`INSERT INTO pedidos (total) VALUES (${total})`);
    console.log(`Enviando notificação de pedido para ${clienteEmail}`);
    return total;
  }
}

// TODO: implemente as 4 classes abaixo seguindo o enunciado.

export class ValidadorPedido {
  validar(itens: ItemPedido[]): void {
    // TODO
  }
}

export class CalculadoraDeTotal {
  calcular(itens: ItemPedido[]): number {
    // TODO
    return 0;
  }
}

export class PedidoRepository {
  salvar(total: number): void {
    // TODO
  }
}

export class NotificacaoService {
  notificar(clienteEmail: string): void {
    // TODO
  }
}

export class PedidoService {
  constructor(
    private validador: ValidadorPedido,
    private calculadora: CalculadoraDeTotal,
    private repo: PedidoRepository,
    private notificacao: NotificacaoService
  ) {}

  processar(itens: ItemPedido[], clienteEmail: string): number {
    // TODO: orquestre validador -> calculadora -> repo -> notificacao, nessa ordem,
    // e retorne o total calculado.
    throw new Error('não implementado');
  }
}

function main() {
  const itens: ItemPedido[] = [{ nome: 'Teclado', preco: 250 }, { nome: 'Mouse', preco: 80 }];

  console.log('--- Versão júnior ---');
  console.log(new PedidoServiceJunior().processar(itens, 'ana@email.com'));

  console.log('--- Sua versão refatorada ---');
  const service = new PedidoService(
    new ValidadorPedido(),
    new CalculadoraDeTotal(),
    new PedidoRepository(),
    new NotificacaoService()
  );
  console.log(service.processar(itens, 'ana@email.com'));
}

if (require.main === module) {
  main();
}
