	create table events(
	    id SERIAL PRIMARY KEY,
	    name TEXT NOT NULL,
	    start_date TIMESTAMP NOT NULL,
	    category TEXT NOT NULL,
	    description TEXT,
	    image_url TEXT
	)