from sanic import Sanic
from sanic.response import json


def field_not_found(field):
	return json({ "message":"Necessary field " + field + "is missing"})

def database_error():
	print("hey")
	return json({ "message":"Something wrong with the query"})