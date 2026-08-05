# Explique com suas palavras — 6. Segurança Essencial

Sem gabarito de propósito. Responda por escrito antes de checar o README principal.

## 1. Hash de senha com bcrypt

**Explique:** Por que MD5 ou SHA-256 puro são inadequados para hash de senha, mesmo sendo algoritmos criptográficos "fortes" para outros usos? O que significa dizer que bcrypt é "propositalmente lento", e por que isso é uma vantagem de segurança, não um defeito de performance?

**Cenário:** Dois usuários diferentes cadastram a MESMA senha (`"123456"`). Os hashes gerados por bcrypt para os dois são iguais ou diferentes? Por quê? O que isso impede um atacante de fazer, comparado a um hash sem salt?

## 2. JWT: geração, verificação e refresh token

**Explique:** Por que usar dois segredos diferentes (um para access token, outro para refresh token) limita o dano em caso de vazamento? O que um atacante consegue fazer se só o segredo do access token vazar?

**Cenário:** Um access token tem `expiresIn: '15m'` e um refresh token tem `expiresIn: '7d'`. Por que não simplesmente usar um único token de longa duração (7 dias) para tudo, evitando a complexidade de ter dois tokens e um fluxo de refresh?

## 3. SQL Injection: vulnerável vs parametrizada

**Explique:** Por que concatenar uma string de input do usuário diretamente numa query SQL permite que esse input "vire código"? O que uma query parametrizada faz de fundamentalmente diferente ao enviar a query para o banco?

**Cenário:** Um ORM como Prisma protege contra SQL Injection nos métodos padrão (`findMany`, `create`, etc), mas oferece um método de escape hatch (`$queryRawUnsafe`). Um desenvolvedor usa esse método e concatena um filtro vindo do usuário dentro dele. Ele está protegido contra SQL Injection só por estar usando o Prisma? Justifique.
