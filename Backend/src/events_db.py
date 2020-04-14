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


async def create_event(pool, event_dict):
	connection = pool.acquire()

	try:
		result_query = await connection.execute(f"""
			INSERT INTO events
			(name, start_date,category,description,image_url) 
           	VALUES ($1,$2,$3,$4,$5)"""
        )

	except Exception as e: 
		result_query = 0
		logger.error(f"Failed to fetch events from database: {type(e).__name__}")
	finally:
		result_query = 1

	return result_query