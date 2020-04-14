create table events(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
);