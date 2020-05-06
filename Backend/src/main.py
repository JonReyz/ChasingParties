from sanic import Sanic
from sanic.response import json
from sanic.request import RequestParameters
from errors import field_not_found, database_error
from events_db import create_new_event, get_all_events, delete_event, update_event
from os import environ
from asyncpg import connect, create_pool

app = Sanic()

@app.listener('before_server_start')
async def start(app, loop):
    # Create a database connection pool
    conn = "postgres://{user}:{password}@{host}:{port}/{database}".format(
        user=environ.get("USER"), 
        password=environ.get("PASSWORD"), 
        host=environ.get("HOST"),
        port=5432, 
        database=environ.get("DATABASE")
    )

    app.pool = await create_pool(
        dsn=conn,
        min_size=1,
        max_size=10, 
        max_queries=50000,
        max_inactive_connection_lifetime=300,
        loop=loop
    )

#Verificar 
@app.listener('after_server_stop')
async def close_connection(app, loop):
    pool = app.pool
    async with pool.acquire() as conn:
        await conn.close()

@app.route("/")
async def test(request):
	return json({"hello": "world"})

## Em todo endpoint eu tenho que:
#  	- verificar quais informações chegam pra ele
#	- ver se as informacões são válidas
#   - mandar pro banco
#   - receber e verificar a resposta do banco
# 	- tratamento de erros
# 	- retornar mensagem


@app.route("/events", methods=["POST"])
async def create_event(request):
	pool = request.app.pool
	event_dict = {}
	event_dict["name"]  = request.json.get("name")
	event_dict["start_date"]  = request.json.get("start_date") 
	event_dict["category"]  = request.json.get("category")
	event_dict["description"]  = request.json.get("description")
	event_dict["image_url"]  = request.json.get("image_url")


	if not event_dict["name"]:
		return field_not_found("name")

	if not event_dict["start_date"]:
		return field_not_found("start_date")

	if not event_dict["category"]:
		return field_not_found("category")

	result_of_query = await create_new_event(pool, event_dict)

	print("Nome do maluco", pool)
	if result_of_query == 0: 
		return database_error()

	return json({"message": "suceffuly created event", "name": "Helrou"})
		


@app.route("/events", methods=["GET"])
async def get_events(request):
	pool = request.app.pool
	list_of_events = await get_all_events(pool)
	if not list_of_events: 
		return database_error()
	return json(list_of_events)



@app.route("/events", methods=["DELETE"])
async def create_event(request):
	pool = request.app.pool
	event_dict = {}
	event_dict["id"]  = request.json.get("id")

	if not event_dict["id"]:
		return field_not_found("id")

	result_of_query = await delete_event(pool, event_dict["id"])

	if result_of_query == 0: 
		return database_error()

	return json({"message": "suceffuly deleted event"})


@app.route("/events", methods=["PUT"])
async def create_event(request):
	pool = request.app.pool
	event_dict = {}
	event_dict["id"]  = request.json.get("id")
	event_dict["name"]  = request.json.get("name")
	event_dict["start_date"]  = request.json.get("start_date") 
	event_dict["category"]  = request.json.get("category")
	event_dict["description"]  = request.json.get("description")
	event_dict["image_url"]  = request.json.get("image_url")



	if not event_dict["id"]:
		return field_not_found("id")

	if not event_dict["name"]:
		return field_not_found("name")

	if not event_dict["start_date"]:
		return field_not_found("start_date")

	if not event_dict["category"]:
		return field_not_found("category")

	result_of_query = await update_event(pool, event_dict)

	if result_of_query == 0: 
		return database_error()

	return json({"message": "suceffuly updated event"})


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8000)