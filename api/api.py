from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import libsql_client
import json

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/pokemon/")
def list(name: str):
    client = libsql_client.create_client_sync(
        url="libsql://pokedex-db-balbuenac.turso.io",
        auth_token="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEwLTIzVDAwOjQ2OjUwLjI2OTc5OTNaIiwiaWQiOiI5MTY2ZTFjYi03MTNiLTExZWUtOTRhOC1lNmQ5MDFkNTVjNzgifQ.mqSmvFIazfb1sUvCSaoinrwvx9KdJvDFJXz8yashpbxXtTsCiEbPCSEXjdPVod-UltNXdFDyCfBra3C5JS4JCQ"
    )

    with client:
        pokemon_db = client.execute("select * from pokemons where name = ?", [name.lower()])
        if pokemon_db:
            #print(pokemon_db.rows[0][2])
            return json.loads(pokemon_db.rows[0][2])
        else:
            response = requests.get("https://pokeapi.co/api/v2/pokemon/" + name.lower())

            #print(response)
            if response .status_code == 200:
                data = {'name': name.lower(), 'content': json.dumps(response.json(), separators=(',', ':'))}
                json_data = json.dumps(data)

                headers = {'Content-type': 'application/json'}
                requests.get("https://pokedex-worker.balbuenac.workers.dev", data=json_data, headers=headers)

                return response.json()
    return {}