/*
DESAFIO — Clean Architecture

Implemente, respeitando a regra de dependência (as setas sempre apontam
para dentro — a entidade não conhece nada das camadas externas):

  1. ENTIDADE `Assinatura`: regra de negócio pura — método
     `ativar(mesesPagos: number)` que lança erro se mesesPagos <= 0, e
     `estaAtiva(): boolean` (true se pelo menos 1 mês foi pago). ZERO
     dependência de infraestrutura.
  2. Porta `AssinaturaRepositoryPort` com `salvar(assinatura: Assinatura): Promise<void>`.
  3. Caso de uso `AtivarAssinaturaUseCase`, que recebe a porta via
     construtor e tem `executar(mesesPagos: number): Promise<boolean>`
     (cria a entidade, ativa, salva, e retorna se está ativa).
  4. Adaptador `AssinaturaRepositoryEmMemoria implements AssinaturaRepositoryPort`.
  5. Uma função `controllerHttpSimulado()` que simula uma camada HTTP
     chamando o caso de uso e logando
     "[HTTP] Resposta 201 — ativa: <bool>".

Rode com: npx ts-node 04-clean-architecture.desafio.ts
*/

// TODO 1: ENTIDADE
export class Assinatura {
  ativar(mesesPagos: number): void {
    // TODO
  }

  estaAtiva(): boolean {
    // TODO
    return false;
  }
}

// TODO 2: PORTA
export interface AssinaturaRepositoryPort {
  salvar(assinatura: Assinatura): Promise<void>;
}

// TODO 3: CASO DE USO
export class AtivarAssinaturaUseCase {
  constructor(private repo: AssinaturaRepositoryPort) {}

  async executar(mesesPagos: number): Promise<boolean> {
    // TODO
    throw new Error('não implementado');
  }
}

// TODO 4: ADAPTADOR
export class AssinaturaRepositoryEmMemoria implements AssinaturaRepositoryPort {
  async salvar(assinatura: Assinatura): Promise<void> {
    // TODO
  }
}

// TODO 5: CONTROLLER SIMULADO
export async function controllerHttpSimulado() {
  const useCase = new AtivarAssinaturaUseCase(new AssinaturaRepositoryEmMemoria());
  // TODO: chame useCase.executar com algum número de meses pagos e logue
  // "[HTTP] Resposta 201 — ativa: <bool>"
}

if (require.main === module) {
  controllerHttpSimulado();
}
