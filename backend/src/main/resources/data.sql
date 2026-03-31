INSERT INTO canteen (name, location) VALUES ('Main Canteen', 'Block A') ON CONFLICT DO NOTHING;

INSERT INTO users (email, password, full_name, role) VALUES ('student@foodnow.com', '123', 'Jane Student', 'STUDENT') ON CONFLICT DO NOTHING;

INSERT INTO item (name, price, quantity_available, is_active, canteen_id) VALUES 
('Deluxe Thali', 60.00, 50, true, 1), 
('Masala Chai', 12.00, 100, true, 1), 
('Crispy Samosa', 20.00, 60, true, 1), 
('Chocolate Cake', 45.00, 25, true, 1) 
ON CONFLICT DO NOTHING;