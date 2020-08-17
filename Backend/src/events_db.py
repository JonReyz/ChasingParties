from sanic.log import logger
# async with app.pool.acquire() as connection:
#     await connection.execute('DROP TABLE IF EXISTS sanic_post')
#     await connection.execute("""CREATE TABLE sanic_post (
#                             id serial primary key,
#                             content varchar(50),
#                             post_date timestamp
#                         );""")
#     for i in range(0, 1000):
#         await connection.execute(f"""INSERT INTO sanic_post
#             (id, content, post_date) VALUES ({i}, {i}, now())""")

async def create_new_event(pool, event_dict):
    connection = await pool.acquire()
    is_working = 0
    query = f"""
        INSERT INTO events (name, start_date,category,description,image_url) 
        VALUES ( '{event_dict["name"]}','{event_dict["start_date"]}','{event_dict["category"]}','{event_dict["description"]}','{event_dict["image_url"]}')"""
    try:
        result_query = await connection.execute(query)
        is_working = 1

    except Exception as e:
        logger.error(f"Failed to fetch events from database: {type(e).__name__}")
    finally:
        await connection.close()
    
    return is_working

#dar o release, usando finally
async def get_all_events(pool):
    connection = await pool.acquire()
    data = {}
    query = "select * from events"
    try:
        result_query = await connection.fetch(query)
    except Exception as e:
        logger.error(f"Failed to fetch events from database: {type(e).__name__}")
        return data 
    finally:
        await connection.close()
    
    data = events_to_dict(result_query)
    

    return data

async def delete_event(pool, id):
    connection = await pool.acquire()
    query =f"""delete from events where id = {id}"""
    print(query)
    is_working = 0
    try:
        result_query = await connection.execute(query)
        is_working = 1
    except Exception as e:
        logger.error(f"Failed to fetch events from database: {type(e).__name__}")
        return is_working

    finally:
        await connection.close()

    return is_working


async def update_event(pool, event_dict):
    connection = await pool.acquire()
    is_working = 0
    query = f"""
        UPDATE events 
        SET name = '{event_dict["name"]}', start_date = '{event_dict["start_date"]}', category = '{event_dict["category"]}', description = '{event_dict["description"]}', image_url = '{event_dict["image_url"]}' 
        WHERE id = {event_dict["id"]}
    """
    print(query)
    try:
        result_query = await connection.execute(query)
        is_working = 1

    except Exception as e:
        logger.error(f"Failed to fetch events from database: {type(e).__name__}")

    finally:
        await connection.close()

    return is_working



async def get_events_filter(pool, category, start_date):
    connection = await pool.acquire()
    alreadyOne = False
    result_query = {}
    query  = "select * from events where "
    queryAND = "AND"
    if category != None:
        query = query + f"category = '{category}' "
        alreadyOne = True
    if start_date !=None:
        if alreadyOne:
            query = query + "AND "
        query = query + f"start_date >= '{start_date}' "

    try:
        print(query)
        result_query = await connection.fetch(query)
        
    except Exception as e:
        logger.error(f"Failed to fetch events from database: {type(e).__name__}")
        return {}
    finally:
        await connection.close()

    result_query = events_to_dict(result_query)
    
    return result_query


def events_to_dict(result):
    list_of_record = []
    for record in result:
        dicto = {
            "id" : record["id"],
            "name" : record["name"],
            "start_date": str(record["start_date"]),
            "category": record["category"],
            "description": record["description"],
            "image_url": record["image_url"]
        }
        list_of_record.append(dicto)
    return list_of_record