CREATE EXTENSION "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_table (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    account VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    hashed_password VARCHAR(128) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS group_table (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS group_role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO group_role (name) VALUES
('moderator'),
('admin'),
('general');

CREATE TABLE IF NOT EXISTS group_user_relation (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    group_id uuid NOT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_table(id),
    CONSTRAINT fk_group_id FOREIGN KEY (group_id) REFERENCES group_table(id),
    CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES group_role(id)
);

CREATE TABLE IF NOT EXISTS friend_relation (
    user_id uuid NOT NULL,
    friend_id uuid NOT NULL,
    CONSTRAINT pk_user_id FOREIGN KEY (user_id) REFERENCES user_table(id),
    CONSTRAINT pk_friend_id FOREIGN KEY (friend_id) REFERENCES user_table(id),
    CONSTRAINT unique_friend_relation UNIQUE(user_id, friend_id)
);

CREATE TABLE IF NOT EXISTS post (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    user_id uuid NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_table(id)
);

CREATE TABLE IF NOT EXISTS comment (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    post_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES post(id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_table(id)
);

CREATE TABLE IF NOT EXISTS comment_like (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    comment_id uuid NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT fk_comment_id FOREIGN KEY (comment_id) REFERENCES comment(id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_table(id)
);

CREATE TABLE IF NOT EXISTS post_like (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id uuid NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES post(id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_table(id)
);
