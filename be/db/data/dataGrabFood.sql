-- ==============================================
-- 1) DROP TABLES (theo đúng thứ tự tránh lỗi FK)
-- ==============================================
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS merchants;
DROP TABLE IF EXISTS users;

-- ==============================================
-- 2) USERS
-- ==============================================
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(150),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================================
-- 3) MERCHANTS
-- ==============================================
CREATE TABLE merchants (
  merchant_id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  rating NUMERIC(3,2) DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================================
-- 4) CATEGORIES
-- ==============================================
CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

-- ==============================================
-- 5) FOODS
-- ==============================================
CREATE TABLE foods (
  food_id SERIAL PRIMARY KEY,
  merchant_id INT REFERENCES merchants(merchant_id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(category_id),
  name VARCHAR(150),
  price NUMERIC,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================================
-- 6) CART ITEMS
-- ==============================================
CREATE TABLE cart_items (
  cart_item_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  food_id INT REFERENCES foods(food_id) ON DELETE CASCADE,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================================
-- 7) ORDERS
-- ==============================================
CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  merchant_id INT REFERENCES merchants(merchant_id),
  total_price NUMERIC DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================================
-- 8) ORDER ITEMS
-- ==============================================
CREATE TABLE order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
  food_id INT REFERENCES foods(food_id),
  quantity INT NOT NULL,
  sub_total NUMERIC DEFAULT 0
);

-- ==============================================
-- 9) RATINGS
-- ==============================================
CREATE TABLE ratings (
  rating_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  merchant_id INT REFERENCES merchants(merchant_id),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==============================================
-- 11) INSERT SAMPLE DATA (đúng nguyên bản bạn gửi)
-- ==============================================

-- USERS
INSERT INTO users(full_name, phone, email, address) VALUES ('Nguyễn Văn A', '0905123456', 'nvA@example.com', '12 Lý Thường Kiệt, Q.10, TP.HCM');
INSERT INTO users(full_name, phone, email, address) VALUES ('Trần Thị B', '0938456123', 'ttB@example.com', '45 Nguyễn Trãi, Q.5, TP.HCM');
INSERT INTO users(full_name, phone, email, address) VALUES ('Lê Hoàng C', '0972345678', 'lhC@example.com', '221 CMT8, Q.3, TP.HCM');
INSERT INTO users(full_name, phone, email, address) VALUES ('Phạm Quỳnh D', '0889123456', 'pqD@example.com', '60 Trần Hưng Đạo, Q.1, TP.HCM');
INSERT INTO users(full_name, phone, email, address) VALUES ('Võ Thành E', '0918123456', 'vtE@example.com', '101 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM');
INSERT INTO users(full_name, phone, email, address) VALUES ('Nguyễn Thị F', '0947123000', 'ntF@example.com', '8 Huỳnh Thúc Kháng, Q.1, TP.HCM');

-- CATEGORIES
INSERT INTO categories(name) VALUES ('Cơm');
INSERT INTO categories(name) VALUES ('Phở & Bún');
INSERT INTO categories(name) VALUES ('Bánh mì & Ăn nhanh');
INSERT INTO categories(name) VALUES ('Gà rán & Fastfood');
INSERT INTO categories(name) VALUES ('Trà sữa & Đồ uống');
INSERT INTO categories(name) VALUES ('Đồ ăn vặt');

-- MERCHANTS
INSERT INTO merchants(name, address, phone, image_url) VALUES ('Cơm Tấm Ba Ghiền', '84 Đặng Văn Ngữ, Phú Nhuận', '0283999123', '');
INSERT INTO merchants(name, address, phone, image_url) VALUES ('Phở Hòa Pasteur', '260C Pasteur, Q.3', '0283999001', '');
INSERT INTO merchants(name, address, phone, image_url) VALUES ('Bún Đậu Một Mẹt', '239/14 Võ Văn Tần, Q.3', '0283999002', '');
INSERT INTO merchants(name, address, phone, image_url) VALUES ('Gà Rán Five Star', '20 Nguyễn Kiệm, Phú Nhuận', '0283999003', '');
INSERT INTO merchants(name, address, phone, image_url) VALUES ('Bánh Mì Huỳnh Hoa', '26 Lê Thị Riêng, Q.1', '0283999004', '');
INSERT INTO merchants(name, address, phone, image_url) VALUES ('Pizza Hub', '180 Lê Văn Sỹ, Q.3', '0283999005', '');
INSERT INTO merchants(name, address, phone, image_url) VALUES ('Trà Sữa House', '55 Nguyễn Trãi, Q.1', '0283999006', '');
INSERT INTO merchants(name, address, phone, image_url) VALUES ('Sushi Corner', '12 Hàn Thuyên, Q.1', '0283999007', '');

-- FOODS (tất cả như bạn đưa)
INSERT INTO foods(merchant_id, category_id, name, price, description) VALUES
(1, 1, 'Cơm tấm sườn bì chả', 45000, 'Cơm tấm sườn, bì, chả, nước mắm đặc trưng'),
(1, 1, 'Cơm tấm sườn que nướng', 55000, 'Sườn que nướng thơm lừng'),
(1, 6, 'Trà đá', 5000, 'Trà đá mát lạnh'),

(2, 2, 'Phở tái', 65000, 'Phở bò tái, nước dùng trong và ngọt'),
(2, 2, 'Phở gà', 60000, 'Phở gà thơm, nước dùng thanh'),

(3, 2, 'Bún đậu mắm tôm thập cẩm', 55000, 'Bún đậu nhiều topping'),
(3, 6, 'Nem chua rán', 30000, 'Ăn vặt giòn rụm'),

(4, 4, 'Gà rán 2 miếng', 99000, 'Gà rán giòn rụm'),
(4, 4, 'Gà rán 1 miếng', 49000, 'Phần nhỏ'),

(5, 3, 'Bánh mì đặc biệt', 45000, 'Đầy nhân'),
(5, 3, 'Bánh mì chả lụa', 30000, 'Truyền thống'),

(6, 4, 'Pizza pepperoni', 180000, 'Pizza size vừa'),
(6, 4, 'Pizza hải sản', 210000, 'Hải sản'),

(7, 5, 'Trà sữa trân châu đường đen', 60000, 'Trân châu mềm'),
(7, 5, 'Trà sữa matcha', 65000, 'Matcha chuẩn'),

(8, 4, 'Sushi set 8 miếng', 220000, 'Sushi tươi'),
(8, 4, 'Sashimi cá hồi', 260000, 'Cá hồi tươi');

-- CART ITEMS
INSERT INTO cart_items(user_id, food_id, quantity) VALUES (1, 1, 1);
INSERT INTO cart_items(user_id, food_id, quantity) VALUES (1, 3, 2);
INSERT INTO cart_items(user_id, food_id, quantity) VALUES (2, 7, 1);

-- ORDERS
INSERT INTO orders(user_id, merchant_id, total_price, status) VALUES (2, 3, 55000, 'completed');
INSERT INTO orders(user_id, merchant_id, total_price, status) VALUES (3, 2, 65000, 'completed');

-- ORDER ITEMS
INSERT INTO order_items(order_id, food_id, quantity, sub_total) VALUES (1, 5, 1, 55000);
INSERT INTO order_items(order_id, food_id, quantity, sub_total) VALUES (2, 3, 1, 65000);

-- RATINGS
INSERT INTO ratings(user_id, merchant_id, rating, comment) VALUES (1, 1, 5, 'Ngon, nhanh');
INSERT INTO ratings(user_id, merchant_id, rating, comment) VALUES (2, 1, 4, 'Hơi mặn');
INSERT INTO ratings(user_id, merchant_id, rating, comment) VALUES (3, 2, 5, 'Phở ngon');
INSERT INTO ratings(user_id, merchant_id, rating, comment) VALUES (4, 5, 5, 'Bánh mì xuất sắc');
INSERT INTO ratings(user_id, merchant_id, rating, comment) VALUES (5, 6, 4, 'Pizza ổn');
INSERT INTO ratings(user_id, merchant_id, rating, comment) VALUES (6, 7, 5, 'Trà sữa rất vừa miệng');
INSERT INTO ratings(user_id, merchant_id, rating, comment) VALUES (1, 3, 4, 'Bún đậu ngon');
INSERT INTO ratings(user_id, merchant_id, rating, comment) VALUES (2, 4, 3, 'Gà rán hơi nhạt');
INSERT INTO ratings(user_id, merchant_id, rating, comment) VALUES (3, 8, 5, 'Sushi tươi');
INSERT INTO ratings(user_id, merchant_id, rating, comment) VALUES (4, 6, 5, 'Pizza cực ngon');

-- ==============================================
-- 10) FUNCTIONS (KHÔNG TRIGGERS)
-- ==============================================

-- 10.1 Add to cart
CREATE OR REPLACE FUNCTION add_to_cart(p_user INT, p_food INT, p_qty INT)
RETURNS VOID AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM cart_items WHERE user_id=p_user AND food_id=p_food) THEN
    UPDATE cart_items
    SET quantity = quantity + p_qty
    WHERE user_id=p_user AND food_id=p_food;
  ELSE
    INSERT INTO cart_items(user_id, food_id, quantity)
    VALUES (p_user, p_food, p_qty);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 10.2 Update cart item
CREATE OR REPLACE FUNCTION update_cart_item(p_cart_item_id INT, p_new_qty INT)
RETURNS VOID AS $$
BEGIN
  IF p_new_qty <= 0 THEN
    DELETE FROM cart_items WHERE cart_item_id=p_cart_item_id;
  ELSE
    UPDATE cart_items
    SET quantity = p_new_qty
    WHERE cart_item_id=p_cart_item_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 10.3 Clear cart
CREATE OR REPLACE FUNCTION clear_cart(p_user INT)
RETURNS VOID AS $$
BEGIN
  DELETE FROM cart_items WHERE user_id=p_user;
END;
$$ LANGUAGE plpgsql;

-- 10.4 recalc order total (version NUMERIC)
CREATE OR REPLACE FUNCTION recalc_order_total(p_order_id INT)
RETURNS NUMERIC AS $$
DECLARE
  v_total NUMERIC := 0;
BEGIN
  SELECT COALESCE(SUM(sub_total),0)
  INTO v_total
  FROM order_items
  WHERE order_id = p_order_id;

  UPDATE orders
  SET total_price = v_total
  WHERE order_id = p_order_id;

  RETURN v_total;
END;
$$ LANGUAGE plpgsql;

-- 10.6 recalc merchant rating
CREATE OR REPLACE FUNCTION recalc_merchant_rating(p_merchant_id INT)
RETURNS NUMERIC AS $$
DECLARE v_avg NUMERIC;
BEGIN
  SELECT ROUND(AVG(rating)::numeric,2)
  INTO v_avg
  FROM ratings
  WHERE merchant_id = p_merchant_id;

  IF v_avg IS NULL THEN
    v_avg := 0;
  END IF;

  UPDATE merchants SET rating = v_avg WHERE merchant_id=p_merchant_id;

  RETURN v_avg;
END;
$$ LANGUAGE plpgsql;

-- 10.7 create order from cart (gộp item theo từng merchant)
CREATE OR REPLACE FUNCTION create_order_from_cart(p_user_id INT, p_merchant_id INT)
RETURNS INT AS $$
DECLARE
  v_order_id INT;
  v_price NUMERIC;
  r RECORD;
BEGIN
  INSERT INTO orders(user_id, merchant_id, status, total_price)
  VALUES (p_user_id, p_merchant_id, 'pending', 0)
  RETURNING order_id INTO v_order_id;

  FOR r IN
    SELECT ci.cart_item_id, ci.food_id, ci.quantity, f.price
    FROM cart_items ci
    JOIN foods f ON ci.food_id = f.food_id
    WHERE ci.user_id = p_user_id AND f.merchant_id = p_merchant_id
  LOOP
    v_price := r.price * r.quantity;

    INSERT INTO order_items(order_id, food_id, quantity, sub_total)
    VALUES (v_order_id, r.food_id, r.quantity, v_price);

    DELETE FROM cart_items WHERE cart_item_id=r.cart_item_id;
  END LOOP;

  PERFORM recalc_order_total(v_order_id);

  RETURN v_order_id;
END;
$$ LANGUAGE plpgsql;

-- Recalculate merchant ratings
SELECT recalc_merchant_rating(merchant_id) FROM merchants;

-- END SQL
