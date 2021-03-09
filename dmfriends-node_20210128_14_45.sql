-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- categories Table Create SQL
CREATE TABLE categories
(
    `id`    INT             NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(100)    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE categories
    ADD CONSTRAINT UC_name UNIQUE (name);


-- categories Table Create SQL
CREATE TABLE subcategories
(
    `id`           INT             NOT NULL    AUTO_INCREMENT, 
    `category_id`  INT             NOT NULL, 
    `name`         VARCHAR(100)    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE subcategories
    ADD CONSTRAINT FK_subcategories_category_id_categories_id FOREIGN KEY (category_id)
        REFERENCES categories (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE subcategories
    ADD CONSTRAINT UC_name UNIQUE (name);


-- categories Table Create SQL
CREATE TABLE users
(
    `id`                INT             NOT NULL    AUTO_INCREMENT, 
    `email`             VARCHAR(100)    NOT NULL, 
    `password`          VARCHAR(100)    NOT NULL, 
    `confirm_password`  VARCHAR(100)    NOT NULL, 
    `username`          VARCHAR(100)    NOT NULL, 
    `created_at`        DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP, 
    `updated_at`        DATETIME        NULL        DEFAULT CURRENT_TIMESTAMP, 
    `deleted_at`        DATETIME        NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE users
    ADD CONSTRAINT UC_email UNIQUE (email);


-- categories Table Create SQL
CREATE TABLE products
(
    `id`              INT             NOT NULL    AUTO_INCREMENT, 
    `name`            VARCHAR(100)    NOT NULL, 
    `price`           INT             NOT NULL, 
    `description`     TEXT            NOT NULL, 
    `product_rate`    DECIMAL(5,1)    NOT NULL, 
    `subcategory_id`  INT             NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE products
    ADD CONSTRAINT FK_products_subcategory_id_subcategories_id FOREIGN KEY (subcategory_id)
        REFERENCES subcategories (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE products
    ADD CONSTRAINT UC_name UNIQUE (name);


-- categories Table Create SQL
CREATE TABLE characters
(
    `id`    INT             NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(100)    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE characters
    ADD CONSTRAINT UC_name UNIQUE (name);


-- categories Table Create SQL
CREATE TABLE feeds
(
    `id`            INT             NOT NULL    AUTO_INCREMENT, 
    `character_id`  INT             NOT NULL, 
    `title`         VARCHAR(100)    NOT NULL, 
    `contents`      TEXT            NOT NULL, 
    `isLiked`       BIT             NOT NULL    DEFAULT 0, 
    `liked_num`     INT             NULL        DEFAULT 0, 
    `created_at`    DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP, 
    `updated_at`    DATETIME        NULL        DEFAULT CURRENT_TIMESTAMP, 
    `deleted_at`    DATETIME        NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE feeds
    ADD CONSTRAINT FK_feeds_character_id_characters_id FOREIGN KEY (character_id)
        REFERENCES characters (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- categories Table Create SQL
CREATE TABLE cart
(
    `id`          INT         NOT NULL    AUTO_INCREMENT, 
    `user_id`     INT         NOT NULL, 
    `product_id`  INT         NOT NULL, 
    `quantity`    INT         NOT NULL, 
    `price`       INT         NOT NULL, 
    `created_at`  DATETIME    NOT NULL    DEFAULT CURRENT_TIMESTAMP, 
    `updated_at`  DATETIME    NULL        DEFAULT CURRENT_TIMESTAMP, 
    `deleted_at`  DATETIME    NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE cart
    ADD CONSTRAINT FK_cart_product_id_products_id FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE cart
    ADD CONSTRAINT FK_cart_user_id_users_id FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- categories Table Create SQL
CREATE TABLE product_image_types
(
    `id`    INT    NOT NULL    AUTO_INCREMENT, 
    `name`  INT    NOT NULL, 
    PRIMARY KEY (id)
);


-- categories Table Create SQL
CREATE TABLE reviews
(
    `id`           INT             NOT NULL    AUTO_INCREMENT, 
    `product_id`   INT             NOT NULL, 
    `user_id`      INT             NOT NULL, 
    `contents`     TEXT            NOT NULL, 
    `review_rate`  DECIMAL(5,1)    NOT NULL, 
    `liked_num`    INT             NULL        DEFAULT 0, 
    `isLiked`      BIT             NOT NULL    DEFAULT 0, 
    `created_at`   DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP, 
    `updated_at`   DATETIME        NULL        DEFAULT CURRENT_TIMESTAMP, 
    `deleted_at`   DATETIME        NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE reviews
    ADD CONSTRAINT FK_reviews_product_id_products_id FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE reviews
    ADD CONSTRAINT FK_reviews_user_id_users_id FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- categories Table Create SQL
CREATE TABLE product_images
(
    `id`                     INT              NOT NULL    AUTO_INCREMENT, 
    `product_id`             INT              NOT NULL, 
    `cart_id`                INT              NOT NULL, 
    `image_url`              VARCHAR(2000)    NOT NULL, 
    `product_image_type_id`  INT              NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE product_images
    ADD CONSTRAINT FK_product_images_product_image_type_id_product_image_types_id FOREIGN KEY (product_image_type_id)
        REFERENCES product_image_types (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE product_images
    ADD CONSTRAINT FK_product_images_cart_id_cart_id FOREIGN KEY (cart_id)
        REFERENCES cart (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE product_images
    ADD CONSTRAINT FK_product_images_product_id_products_id FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- categories Table Create SQL
CREATE TABLE feed_comments
(
    `id`          INT         NOT NULL    AUTO_INCREMENT, 
    `user_id`     INT         NOT NULL, 
    `feed_id`     INT         NOT NULL, 
    `contents`    TEXT        NOT NULL, 
    `created_at`  DATETIME    NOT NULL    DEFAULT CURRENT_TIMESTAMP, 
    `updated_at`  DATETIME    NULL        DEFAULT CURRENT_TIMESTAMP, 
    `deleted_at`  DATETIME    NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE feed_comments
    ADD CONSTRAINT FK_feed_comments_feed_id_feeds_id FOREIGN KEY (feed_id)
        REFERENCES feeds (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE feed_comments
    ADD CONSTRAINT FK_feed_comments_user_id_users_id FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- categories Table Create SQL
CREATE TABLE feed_images
(
    `id`         INT              NOT NULL    AUTO_INCREMENT, 
    `feed_id`    INT              NOT NULL, 
    `image_url`  VARCHAR(2000)    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE feed_images
    ADD CONSTRAINT FK_feed_images_feed_id_feeds_id FOREIGN KEY (feed_id)
        REFERENCES feeds (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- categories Table Create SQL
CREATE TABLE feed_products
(
    `id`          INT    NOT NULL    AUTO_INCREMENT, 
    `feed_id`     INT    NOT NULL, 
    `product_id`  INT    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE feed_products
    ADD CONSTRAINT FK_feed_products_feed_id_feeds_id FOREIGN KEY (feed_id)
        REFERENCES feeds (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE feed_products
    ADD CONSTRAINT FK_feed_products_product_id_products_id FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- categories Table Create SQL
CREATE TABLE recent_views
(
    `id`          INT         NOT NULL    AUTO_INCREMENT, 
    `user_id`     INT         NOT NULL, 
    `product_id`  INT         NOT NULL, 
    `viewed_at`   DATETIME    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE recent_views
    ADD CONSTRAINT FK_recent_views_product_id_products_id FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE recent_views
    ADD CONSTRAINT FK_recent_views_user_id_users_id FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- categories Table Create SQL
CREATE TABLE likes
(
    `id`       INT    NOT NULL    AUTO_INCREMENT, 
    `user_id`  INT    NOT NULL, 
    `feed_id`  INT    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE likes
    ADD CONSTRAINT FK_likes_user_id_users_id FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE likes
    ADD CONSTRAINT FK_likes_feed_id_feeds_id FOREIGN KEY (feed_id)
        REFERENCES feeds (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


