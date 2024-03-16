CREATE TABLE IF NOT EXISTS user_table (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    account VARCHAR(50) NOT NULL,
    hashed_password VARCHAR(128) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS group_table (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS group_user_relation (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    group_id uuid NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_table(id),
    CONSTRAINT fk_group_id FOREIGN KEY (group_id) REFERENCES group_table(id)
);

CREATE TABLE IF NOT EXISTS friend_relation (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    friend_id uuid NOT NULL,
    CONSTRAINT pk_user_id FOREIGN KEY (user_id) REFERENCES user_table(id),
    CONSTRAINT pk_friend_id FOREIGN KEY (friend_id) REFERENCES user_table(id)
);