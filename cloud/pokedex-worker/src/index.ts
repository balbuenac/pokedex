import { Client as LibsqlClient, createClient } from "@libsql/client/web";

export interface Env {
  TURSO_URL?: string;
  TURSO_AUTH_TOKEN?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    const data = await request.json();
    //console.log(data.name);
    const client = buildLibsqlClient(env);
    const pokemon_name = data.name;
    const pokemon_json = data.content;

    try {
      const res = await client.execute({sql: "select content from pokemons where name = ?" , args: [pokemon_name]});
      if (res && res.rows && res.rows.length > 0) {
        return new Response(JSON.stringify(res), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      else {
        await client.execute({sql: "insert into pokemons (id, name, content) values (?, ?,? )" , args: [pokemon_name, pokemon_name, pokemon_json]});
        return new Response('Success');
      }
        
    } catch (error) {
      console.error('Error executing SQL query:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500
      });
    }
  },
};

function buildLibsqlClient(env: Env): LibsqlClient {
  const url = env.TURSO_URL?.trim();
  if (url === undefined) {
    throw new Error("TURSO_URL env var is not defined");
  } 

  const authToken = env.TURSO_AUTH_TOKEN?.trim();
  if (authToken == undefined) {
    throw new Error("TURSO_AUTH_TOKEN env var is not defined");
  }

  return createClient({ url, authToken })
}