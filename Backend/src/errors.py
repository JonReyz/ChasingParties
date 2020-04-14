
def field_not_found(field):
	return{ "message":"Necessary field " + field + "is missing"}

def database_error():
	return{ "message":"Something wrong with the query"}