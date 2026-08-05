// EXEMPLO — Single Responsibility Principle
// Rode com: npx ts-node 01-solid-srp.exemplo.ts

export class ValidadorEmail {
  validar(email: string): void {
    if (!email.includes('@')) throw new Error('Email inválido');
  }
}

export class UsuarioRepository {
  async salvar(nome: string, email: string): Promise<void> {
    console.log(`[DB] Salvando usuário: ${nome}, ${email}`);
  }
}

export class EmailService {
  async enviarBoasVindas(email: string): Promise<void> {
    console.log(`[EMAIL] Enviando boas-vindas para ${email}`);
  }
}

export class UsuarioServicePleno {
  constructor(
    private validador: ValidadorEmail,
    private repo: UsuarioRepository,
    private emailService: EmailService
  ) {}

  async registrar(nome: string, email: string): Promise<void> {
    this.validador.validar(email);
    await this.repo.salvar(nome, email);
    await this.emailService.enviarBoasVindas(email);
  }
}

async function main() {
  const service = new UsuarioServicePleno(new ValidadorEmail(), new UsuarioRepository(), new EmailService());
  await service.registrar('Alexandre', 'alexandre@email.com');
}

if (require.main === module) {
  main();
}

// Cada classe tem UM único motivo para mudar. Se a regra de validação
// mudar, você mexe só em ValidadorEmail — sem risco de quebrar a lógica
// de persistência ou envio de email.
