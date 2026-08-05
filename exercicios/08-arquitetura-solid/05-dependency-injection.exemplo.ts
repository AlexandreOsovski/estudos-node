// EXEMPLO — Injeção de Dependência sem framework
// Rode com: npx ts-node 05-dependency-injection.exemplo.ts

export interface Logger {
  log(mensagem: string): void;
}

export class ConsoleLogger implements Logger {
  log(mensagem: string): void {
    console.log(`[LOG] ${mensagem}`);
  }
}

export class PedidoService {
  // Injeção via CONSTRUTOR — a forma mais comum e explícita
  constructor(private logger: Logger) {}

  processar(id: number) {
    this.logger.log(`Processando pedido ${id}`);
  }
}

// Injeção via FACTORY — útil quando a criação do objeto tem lógica condicional
export function criarPedidoService(ambiente: 'producao' | 'teste'): PedidoService {
  const logger: Logger = ambiente === 'producao' ? new ConsoleLogger() : { log: () => {} };
  return new PedidoService(logger);
}

if (require.main === module) {
  const servico = criarPedidoService('producao');
  servico.processar(101);
}

// Você não precisa de um framework de DI (InversifyJS, container do
// NestJS) para praticar injeção de dependência — o princípio é
// simplesmente "não instancie suas dependências dentro da classe, receba
// -as de fora".
