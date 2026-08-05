import { expect } from '@aleosovski/muitto';

// muitto.toThrow() só captura throws SÍNCRONOS (chama a função e faz
// try/catch na hora). Para validar que uma Promise REJEITA, precisamos
// aguardá-la manualmente — senão a rejeição fica "solta" (unhandled
// rejection) e derruba o processo do test runner.
export async function expectRejects(promise: Promise<unknown>, match?: string | RegExp): Promise<Error> {
  let erro: unknown;
  let rejeitou = false;

  try {
    await promise;
  } catch (e) {
    rejeitou = true;
    erro = e;
  }

  expect(rejeitou).toBeTruthy();

  if (match !== undefined) {
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    expect(mensagem).toMatch(match);
  }

  return erro as Error;
}
